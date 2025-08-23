import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPackageSchema, insertMessageSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Check credentials (hardcoded as per requirements)
      if (username === "kitio123" && password === "kitio000") {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get all packages (admin only)
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  // Get package by ID (public)
  app.get("/api/packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const pkg = await storage.getPackage(id);
      
      if (!pkg) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Create new package (admin only)
  app.post("/api/packages", async (req, res) => {
    try {
      // Parse and convert dates from strings to Date objects
      const requestData = {
        ...req.body,
        shipDate: req.body.shipDate ? new Date(req.body.shipDate) : new Date(),
        expectedDelivery: req.body.expectedDelivery ? new Date(req.body.expectedDelivery) : new Date(),
        weight: req.body.weight ? req.body.weight.toString() : "0",
      };
      
      const packageData = insertPackageSchema.parse(requestData);
      
      // Check if package ID already exists
      const existing = await storage.getPackage(packageData.id);
      if (existing) {
        res.status(409).json({ message: "Package ID already exists" });
        return;
      }

      const newPackage = await storage.createPackage(packageData);
      res.status(201).json(newPackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid package data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create package" });
      }
    }
  });

  // Update package (admin only)
  app.put("/api/packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Parse and convert dates from strings to Date objects if they exist
      const requestData = { ...req.body };
      if (requestData.shipDate) {
        requestData.shipDate = new Date(requestData.shipDate);
      }
      if (requestData.expectedDelivery) {
        requestData.expectedDelivery = new Date(requestData.expectedDelivery);
      }
      if (requestData.weight) {
        requestData.weight = requestData.weight.toString();
      }
      
      const updateData = insertPackageSchema.partial().parse(requestData);
      
      const updatedPackage = await storage.updatePackage(id, updateData);
      
      if (!updatedPackage) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      
      res.json(updatedPackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid update data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update package" });
      }
    }
  });

  // Delete package (admin only)
  app.delete("/api/packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePackage(id);
      
      if (!success) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      
      res.json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete package" });
    }
  });

  // Get all messages (admin only)
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Create new message
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  // Delete message (admin only)
  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteMessage(id);
      
      if (!success) {
        res.status(404).json({ message: "Message not found" });
        return;
      }
      
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
