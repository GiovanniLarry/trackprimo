import { z } from "zod";

export const insertPackageSchema = z.object({
  id: z.string().min(1, "Package ID is required"),
  status: z.string().min(1, "Status is required"),
  senderName: z.string().min(1, "Sender name is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  senderAddress: z.string().min(1, "Sender address is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  weight: z.string().min(1, "Weight is required"),
  shipDate: z.date(),
  expectedDelivery: z.date(),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional(),
});
