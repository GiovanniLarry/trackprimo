import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LogOut, Package, Plus, Mail, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertPackageSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Package as PackageType, Message as MessageType } from "@shared/schema";
import { z } from "zod";

const packageFormSchema = insertPackageSchema.extend({
  shipDate: z.string(),
  expectedDelivery: z.string(),
});

type PackageFormData = z.infer<typeof packageFormSchema>;

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const form = useForm<PackageFormData>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      id: "",
      status: "",
      senderName: "",
      recipientName: "",
      senderAddress: "",
      recipientAddress: "",
      weight: "",
      shipDate: "",
      expectedDelivery: "",
      description: "",
      notes: "",
    },
  });

  // Fetch packages
  const { data: packages = [], isLoading: packagesLoading } = useQuery<PackageType[]>({
    queryKey: ["/api/packages"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery<MessageType[]>({
    queryKey: ["/api/messages"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Create package mutation
  const createPackageMutation = useMutation({
    mutationFn: async (data: PackageFormData) => {
      // Send dates as strings and let the backend handle conversion
      const packageData = {
        ...data,
        weight: data.weight.toString(),
        shipDate: data.shipDate,
        expectedDelivery: data.expectedDelivery,
      };
      return apiRequest("POST", "/api/packages", packageData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Package Created",
        description: "Package has been successfully created!",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create package",
        variant: "destructive",
      });
    },
  });

  // Delete package mutation
  const deletePackageMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Package Deleted",
        description: "Package has been successfully deleted!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete package",
        variant: "destructive",
      });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Message Deleted",
        description: "Message has been successfully deleted!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete message",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setLocation("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const onSubmit = (data: PackageFormData) => {
    createPackageMutation.mutate(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900" data-testid="dashboard-title">
              Admin Dashboard
            </h1>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="hover:bg-red-600 transition-colors duration-200"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="packages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">Package Management</TabsTrigger>
            <TabsTrigger value="messages">Customer Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <div className="grid lg:grid-cols-2 gap-8">
          {/* Package Creation Form */}
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center" data-testid="create-package-title">
                <Plus className="w-6 h-6 mr-2" />
                Create New Package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="package-creation-form">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter package ID" {...field} data-testid="input-package-id" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Processing">Processing</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter sender name" {...field} data-testid="input-sender-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter recipient name" {...field} data-testid="input-recipient-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="senderAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter sender address" 
                            rows={3} 
                            {...field} 
                            data-testid="textarea-sender-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter recipient address" 
                            rows={3} 
                            {...field} 
                            data-testid="textarea-recipient-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1" 
                              placeholder="0.0" 
                              {...field} 
                              data-testid="input-weight"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shipDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ship Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-ship-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedDelivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Delivery</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-expected-delivery" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter package description" 
                            rows={3} 
                            {...field} 
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter additional notes (optional)" 
                            rows={2} 
                            {...field}
                            value={field.value || ""}
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={createPackageMutation.isPending}
                    className="w-full bg-fedex-orange text-white py-3 hover:bg-fedex-orange-light transition-colors duration-200 font-semibold"
                    data-testid="button-create-package"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {createPackageMutation.isPending ? "Creating Package..." : "Create Package"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Package List */}
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center" data-testid="packages-list-title">
                <Package className="w-6 h-6 mr-2" />
                Recent Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" data-testid="package-list">
                {packagesLoading ? (
                  <div className="text-center text-gray-500 py-8" data-testid="loading-packages">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Loading packages...</p>
                  </div>
                ) : packages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8" data-testid="no-packages">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No packages created yet</p>
                  </div>
                ) : (
                  packages.slice(0, 10).map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className="border border-gray-200 rounded-lg p-4"
                      data-testid={`package-item-${pkg.id}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900" data-testid={`package-id-${pkg.id}`}>
                            {pkg.id}
                          </h3>
                          <p className="text-sm text-gray-600" data-testid={`package-recipient-${pkg.id}`}>
                            {pkg.recipientName}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={getStatusColor(pkg.status)}
                            data-testid={`package-status-${pkg.id}`}
                          >
                            {pkg.status}
                          </Badge>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePackageMutation.mutate(pkg.id)}
                            disabled={deletePackageMutation.isPending}
                            data-testid={`delete-package-${pkg.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p data-testid={`package-created-${pkg.id}`}>
                          <span className="font-medium">Created:</span> {formatDate(pkg.createdAt)}
                        </p>
                        <p data-testid={`package-delivery-${pkg.id}`}>
                          <span className="font-medium">Expected Delivery:</span> {formatDate(pkg.expectedDelivery)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center" data-testid="messages-title">
                  <Mail className="w-6 h-6 mr-2" />
                  Customer Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="message-list">
                  {messagesLoading ? (
                    <div className="text-center text-gray-500 py-8" data-testid="loading-messages">
                      <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8" data-testid="no-messages">
                      <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No messages received yet</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.id} 
                        className="border border-gray-200 rounded-lg p-4"
                        data-testid={`message-item-${message.id}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900" data-testid={`message-name-${message.id}`}>
                              {message.fullName}
                            </h3>
                            <p className="text-sm text-gray-600" data-testid={`message-email-${message.id}`}>
                              {message.email}
                            </p>
                            {message.packageId && (
                              <p className="text-sm text-blue-600" data-testid={`message-package-${message.id}`}>
                                Package ID: {message.packageId}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500" data-testid={`message-date-${message.id}`}>
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteMessageMutation.mutate(message.id)}
                              disabled={deleteMessageMutation.isPending}
                              data-testid={`delete-message-${message.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-gray-700 text-sm" data-testid={`message-content-${message.id}`}>
                            {message.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
