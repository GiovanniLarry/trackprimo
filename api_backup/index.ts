import { createServer } from "http";
import { storage } from "../server/storage";
import { insertPackageSchema, insertMessageSchema, loginSchema } from "../shared/schema";
import { z } from "zod";

export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (path === '/api/admin/login' && req.method === 'POST') {
      const { username, password } = loginSchema.parse(req.body);
      if (username === "kitio123" && password === "kitio000") {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
    else if (path === '/api/packages' && req.method === 'GET') {
      const packages = await storage.getAllPackages();
      res.json(packages);
    }
    else if (path.startsWith('/api/packages/') && req.method === 'GET') {
      const id = path.split('/').pop();
      if (!id) {
        res.status(400).json({ message: "Invalid package ID" });
        return;
      }
      const pkg = await storage.getPackage(id);
      if (!pkg) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      res.json(pkg);
    }
    else if (path === '/api/packages' && req.method === 'POST') {
      const requestData = {
        ...req.body,
        shipDate: req.body.shipDate ? new Date(req.body.shipDate) : new Date(),
        expectedDelivery: req.body.expectedDelivery ? new Date(req.body.expectedDelivery) : new Date(),
        weight: req.body.weight ? req.body.weight.toString() : "0",
      };
      const packageData = insertPackageSchema.parse(requestData);
      const existing = await storage.getPackage(packageData.id);
      if (existing) {
        res.status(409).json({ message: "Package ID already exists" });
        return;
      }
      const newPackage = await storage.createPackage(packageData);
      res.status(201).json(newPackage);
    }
    else if (path.startsWith('/api/packages/') && req.method === 'PUT') {
      const id = path.split('/').pop();
      if (!id) {
        res.status(400).json({ message: "Invalid package ID" });
        return;
      }
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
    }
    else if (path.startsWith('/api/packages/') && req.method === 'DELETE') {
      const id = path.split('/').pop();
      if (!id) {
        res.status(400).json({ message: "Invalid package ID" });
        return;
      }
      const success = await storage.deletePackage(id);
      if (!success) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      res.json({ message: "Package deleted successfully" });
    }
    else if (path === '/api/messages' && req.method === 'GET') {
      const messages = await storage.getAllMessages();
      res.json(messages);
    }
    else if (path === '/api/messages' && req.method === 'POST') {
      const messageData = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(messageData);
      res.status(201).json(newMessage);
    }
    else if (path.startsWith('/api/messages/') && req.method === 'DELETE') {
      const id = path.split('/').pop();
      if (!id) {
        res.status(400).json({ message: "Invalid message ID" });
        return;
      }
      const success = await storage.deleteMessage(id);
      if (!success) {
        res.status(404).json({ message: "Message not found" });
        return;
      }
      res.json({ message: "Message deleted successfully" });
    }
    else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request data", errors: error.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
