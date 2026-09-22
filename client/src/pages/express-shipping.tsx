import { Zap, Clock, Shield, Plane, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ExpressShippingPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-fedex-orange to-fedex-orange-light text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Express Shipping</h1>
          <p className="text-orange-100 text-lg max-w-3xl">
            Next-day and time-definite delivery with priority handling for your most urgent shipments.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto text-fedex-orange mb-3" />
                <div className="font-semibold text-lg">Fastest Delivery Options</div>
                <p className="text-gray-600 text-sm mt-2">Overnight, same-day (selected lanes), and early AM deliveries.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto text-fedex-purple mb-3" />
                <div className="font-semibold text-lg">Time-Definite</div>
                <p className="text-gray-600 text-sm mt-2">Choose delivery windows that match your business commitments.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 mx-auto text-fedex-purple-light mb-3" />
                <div className="font-semibold text-lg">Priority Handling</div>
                <p className="text-gray-600 text-sm mt-2">Dedicated workflows and tracking for critical items.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Plane className="w-6 h-6 text-fedex-purple" />
                  <div className="font-semibold">Air Express</div>
                </div>
                <p className="text-gray-600 text-sm">Long-haul express via our global air network for fastest international service.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-6 h-6 text-fedex-orange" />
                  <div className="font-semibold">Ground Express</div>
                </div>
                <p className="text-gray-600 text-sm">Expedited road service for regional next-day and same-day lanes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
