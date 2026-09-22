export interface Package {
  id: string;
  status: string;
  senderName: string;
  recipientName: string;
  senderAddress: string;
  recipientAddress: string;
  weight: string;
  shipDate: Date;
  expectedDelivery: Date;
  description: string;
  notes: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  fullName: string;
  email: string;
  packageId: string | null;
  message: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  password: string;
}
