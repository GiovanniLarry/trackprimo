import { Globe, Shield, Plane, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InternationalDeliveryPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-fedex-purple to-fedex-purple-light text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">International Delivery</h1>
          <p className="text-purple-100 text-lg max-w-3xl">
            Reliable cross-border shipping to 190+ countries with customs expertise and end-to-end visibility.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="w-8 h-8 mx-auto text-fedex-orange mb-3" />
                <div className="font-semibold text-lg">Global Coverage</div>
                <p className="text-gray-600 text-sm mt-2">Door-to-door service in major markets worldwide.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto text-fedex-purple mb-3" />
                <div className="font-semibold text-lg">Customs Expertise</div>
                <p className="text-gray-600 text-sm mt-2">Automated documentation and brokerage options.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BadgeCheck className="w-8 h-8 mx-auto text-fedex-purple-light mb-3" />
                <div className="font-semibold text-lg">Compliance Ready</div>
                <p className="text-gray-600 text-sm mt-2">Sanctions screening and HS code assistance.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Plane className="w-6 h-6 text-fedex-purple" />
                  <div className="font-semibold">Priority International</div>
                </div>
                <p className="text-gray-600 text-sm">Time-definite air service with end-to-end tracking and delivery duty paid options.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-fedex-orange" />
                  <div className="font-semibold">Economy International</div>
                </div>
                <p className="text-gray-600 text-sm">Cost-effective delivery for less time-sensitive shipments with robust visibility.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
