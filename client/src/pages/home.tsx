import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Shield, Clock, Zap, Globe, Truck, Star, CheckCircle, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WhatsAppButton from "@/components/whatsapp-button";
import type { Package as PackageType } from "@/types";

export default function Home() {
  const [packageId, setPackageId] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: packageData, isLoading, error } = useQuery<PackageType>({
    queryKey: ["/api/packages", packageId],
    enabled: searchTriggered && packageId.length > 0,
  });

  const handleSearch = () => {
    if (!packageId.trim()) {
      return;
    }
    setSearchTriggered(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fedex-purple to-fedex-purple-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Track Your Package
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100" data-testid="hero-subtitle">
            Fast, reliable, and secure package tracking worldwide
          </p>
          

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-fedex-orange mb-2" data-testid="stat-packages">10M+</div>
              <p className="text-purple-100">Packages Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-fedex-orange mb-2" data-testid="stat-countries">190+</div>
              <p className="text-purple-100">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-fedex-orange mb-2" data-testid="stat-satisfaction">99.8%</div>
              <p className="text-purple-100">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Tracking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8" data-testid="tracking-title">
                Track Your Package
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="package-id" className="block text-lg font-medium text-gray-700 mb-3">
                    Enter Package ID
                  </label>
                  <div className="flex space-x-4">
                    <Input
                      id="package-id"
                      placeholder="Enter your package ID..."
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 text-lg"
                      data-testid="input-package-id"
                    />
                    <Button
                      onClick={handleSearch}
                      className="bg-fedex-orange text-white px-8 py-3 hover:bg-fedex-orange-light transition-colors duration-200 font-semibold"
                      disabled={isLoading}
                      data-testid="button-track"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      {isLoading ? "Searching..." : "Track"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {searchTriggered && packageData && (
            <Card className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100" data-testid="tracking-results">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" data-testid="package-details-title">
                  Package Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Package Information</h4>
                      <div className="space-y-2">
                        <p data-testid="package-id-display">
                          <span className="font-medium">ID:</span> {packageData.id}
                        </p>
                        <p data-testid="package-status-display">
                          <span className="font-medium">Status:</span>{" "}
                          <Badge className={getStatusColor(packageData.status)}>
                            {packageData.status}
                          </Badge>
                        </p>
                        <p data-testid="package-weight-display">
                          <span className="font-medium">Weight:</span> {packageData.weight} kg
                        </p>
                        <p data-testid="package-description-display">
                          <span className="font-medium">Description:</span> {packageData.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sender</h4>
                      <p className="font-medium" data-testid="sender-name-display">{packageData.senderName}</p>
                      <p className="text-gray-600 text-sm" data-testid="sender-address-display">{packageData.senderAddress}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Shipping Dates</h4>
                      <div className="space-y-2">
                        <p data-testid="ship-date-display">
                          <span className="font-medium">Ship Date:</span> {formatDate(packageData.shipDate)}
                        </p>
                        <p data-testid="expected-delivery-display">
                          <span className="font-medium">Expected Delivery:</span> {formatDate(packageData.expectedDelivery)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Recipient</h4>
                      <p className="font-medium" data-testid="recipient-name-display">{packageData.recipientName}</p>
                      <p className="text-gray-600 text-sm" data-testid="recipient-address-display">{packageData.recipientAddress}</p>
                    </div>
                    
                    {packageData.notes && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                        <p className="text-gray-600 text-sm" data-testid="package-notes-display">{packageData.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {searchTriggered && error && (
            <Card className="mt-8 bg-red-50 rounded-2xl border border-red-200" data-testid="no-results">
              <CardContent className="p-8">
                <div className="text-center">
                  <Package className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2" data-testid="error-title">
                    Package Not Found
                  </h3>
                  <p className="text-red-600" data-testid="error-message">
                    The package ID you entered could not be found. Please check the ID and try again.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" data-testid="features-title">
            Why Choose TrackPrimo?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-fedex-purple p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="feature-fast-title">Fast Delivery</h3>
                <p className="text-gray-600" data-testid="feature-fast-description">
                  Lightning-fast package delivery to destinations worldwide
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-fedex-orange p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="feature-secure-title">Secure Tracking</h3>
                <p className="text-gray-600" data-testid="feature-secure-description">
                  Advanced security measures to protect your package information
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-fedex-purple-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="feature-realtime-title">Real-time Updates</h3>
                <p className="text-gray-600" data-testid="feature-realtime-description">
                  Get instant notifications about your package status
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" data-testid="services-title">
            Our Global Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-fedex-purple to-fedex-purple-light text-white p-6 rounded-xl">
              <CardContent className="p-0 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-fedex-orange" />
                <h3 className="text-lg font-semibold mb-2">International</h3>
                <p className="text-purple-100 text-sm">Worldwide shipping to 190+ countries</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-fedex-orange to-fedex-orange-light text-white p-6 rounded-xl">
              <CardContent className="p-0 text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Express</h3>
                <p className="text-orange-100 text-sm">Next-day delivery available</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <CardContent className="p-0 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Guaranteed</h3>
                <p className="text-green-100 text-sm">100% delivery guarantee</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <CardContent className="p-0 text-center">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium</h3>
                <p className="text-blue-100 text-sm">VIP handling & support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" data-testid="testimonials-title">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 rounded-xl shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-fedex-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "TrackPrimo has revolutionized our business shipping. Fast, reliable, and excellent customer service!"
                </p>
                <div className="flex items-center">
                  <div className="bg-fedex-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Business Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white p-8 rounded-xl shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-fedex-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The tracking system is amazing! I always know exactly where my packages are. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="bg-fedex-orange text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-gray-500">Online Seller</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white p-8 rounded-xl shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex text-fedex-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "International shipping made easy! My packages arrive on time every single time."
                </p>
                <div className="flex items-center">
                  <div className="bg-fedex-purple-light text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Anna Rodriguez</p>
                    <p className="text-sm text-gray-500">Import/Export</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-fedex-purple to-fedex-purple-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="cta-title">
            Ready to Ship with Confidence?
          </h2>
          <p className="text-xl mb-8 text-purple-100" data-testid="cta-subtitle">
            Join millions of satisfied customers who trust TrackPrimo for their shipping needs
          </p>
          <div className="flex justify-center">
            <Button 
              className="bg-fedex-orange text-white px-8 py-4 text-lg hover:bg-fedex-orange-light transition-colors duration-200 font-semibold"
              data-testid="button-get-quote"
            >
              Get Shipping Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton phoneNumber="+12723638722" floating={true} />
    </div>
  );
}
