import { useState } from "react";
import { Search, Package, Clock, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Package as PackageType } from "@shared/schema";

export default function PackageTrackingPage() {
  const [packageId, setPackageId] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading, error } = useQuery<PackageType>({
    queryKey: ["/api/packages", packageId],
    enabled: enabled && packageId.length > 0,
  });

  const handleTrack = () => {
    if (!packageId.trim()) return;
    setEnabled(true);
  };

  const statusColor = (status: string) => {
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

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-fedex-purple to-fedex-purple-light text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Package Tracking</h1>
          <p className="text-purple-100 text-lg">
            Track shipments in real-time with detailed milestones and proactive alerts.
          </p>
        </div>
      </section>

      {/* Tracker */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="rounded-2xl shadow-xl border border-gray-100">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter tracking ID (e.g. FX123456789)"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTrack} disabled={isLoading} className="bg-fedex-orange hover:bg-fedex-orange-light">
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Searching..." : "Track"}
                </Button>
              </div>

              {/* Result */}
              {enabled && (
                <div className="mt-6">
                  {error ? (
                    <div className="flex items-center text-red-600 gap-2">
                      <Package className="w-5 h-5" /> Unable to find a package with that ID.
                    </div>
                  ) : data ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{data.id}</div>
                        <Badge className={statusColor(data.status)}>{data.status}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="font-medium mb-1">Origin</div>
                          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{data.senderAddress}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="font-medium mb-1">Destination</div>
                          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{data.recipientAddress}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="font-medium mb-1">ETA</div>
                          <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{new Date(data.expectedDelivery).toLocaleString()}</div>
                        </div>
                      </div>
                      {data.notes && (
                        <div className
="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">{data.notes}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm mt-4">Enter a valid ID to see tracking information.</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proactive alerts */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Bell className="w-6 h-6 mx-auto text-fedex-orange mb-2" />
                SMS & Email Alerts
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-6 h-6 mx-auto text-fedex-purple mb-2" />
                Milestone Updates
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-6 h-6 mx-auto text-fedex-purple-light mb-2" />
                Accurate ETAs
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
