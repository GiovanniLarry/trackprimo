import { useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "@/components/whatsapp-button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    packageId: "",
    message: "",
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon!",
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          packageId: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600" data-testid="contact-subtitle">
            Get in touch with our customer support team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-fedex-purple rounded-2xl text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6" data-testid="contact-info-title">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4" data-testid="contact-phone">
                    <div className="bg-fedex-orange p-3 rounded-full">
                      <Phone className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-purple-100">+1 931-227-9175</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="bg-fedex-orange p-3 rounded-full">
                      <Mail className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-purple-100">fedexPackShipping@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4" data-testid="contact-whatsapp">
                    <WhatsAppButton
                      phoneNumber="+12723638722"
                      className="p-3 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-purple-100">+1 272-363-8722</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4" data-testid="business-hours-title">
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <p data-testid="hours-weekdays">
                      <span className="font-medium">Monday - Friday:</span> 8:00 AM - 8:00 PM
                    </p>
                  </div>
                  <p className="ml-6" data-testid="hours-saturday">
                    <span className="font-medium">Saturday:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p className="ml-6" data-testid="hours-sunday">
                    <span className="font-medium">Sunday:</span> 10:00 AM - 4:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="contact-form-title">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    data-testid="input-fullname"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label htmlFor="packageId" className="block text-sm font-medium text-gray-700 mb-2">
                    Package ID (if applicable)
                  </label>
                  <Input
                    type="text"
                    id="packageId"
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleInputChange}
                    className="w-full"
                    data-testid="input-package-id"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-fedex-orange text-white py-3 hover:bg-fedex-orange-light transition-colors duration-200 font-semibold"
                  data-testid="button-send-message"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
