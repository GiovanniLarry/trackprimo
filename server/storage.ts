import { type User, type InsertUser, type Package, type InsertPackage, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPackage(id: string): Promise<Package | undefined>;
  getAllPackages(): Promise<Package[]>;
  createPackage(packageData: InsertPackage): Promise<Package>;
  updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package | undefined>;
  deletePackage(id: string): Promise<boolean>;

  getMessage(id: string): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  createMessage(messageData: InsertMessage): Promise<Message>;
  deleteMessage(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private packages: Map<string, Package>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.messages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createPackage(packageData: InsertPackage): Promise<Package> {
    const pkg: Package = {
      ...packageData,
      notes: packageData.notes || "",
      createdAt: new Date(),
    };
    this.packages.set(pkg.id, pkg);
    return pkg;
  }

  async updatePackage(id: string, packageData: Partial<InsertPackage>): Promise<Package | undefined> {
    const existing = this.packages.get(id);
    if (!existing) return undefined;

    const updated: Package = {
      ...existing,
      ...packageData,
    };
    this.packages.set(id, updated);
    return updated;
  }

  async deletePackage(id: string): Promise<boolean> {
    return this.packages.delete(id);
  }

  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...messageData,
      packageId: messageData.packageId || null,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
