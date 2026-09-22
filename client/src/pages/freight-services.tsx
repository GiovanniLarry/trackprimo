import { Truck, Ship, PackageSearch, Boxes, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FreightServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-blue-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Freight Services</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            End-to-end freight solutions across road, air, and ocean with real-time visibility and expert handling.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-8 h-8 mx-auto text-fedex-orange mb-3" />
                <div className="font-semibold text-lg">LTL & FTL</div>
                <p className="text-gray-600 text-sm mt-2">Less-than-truckload and full-truckload with flexible scheduling.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Ship className="w-8 h-8 mx-auto text-fedex-purple mb-3" />
                <div className="font-semibold text-lg">Ocean Freight</div>
                <p className="text-gray-600 text-sm mt-2">FCL and LCL services with customs brokerage options.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <ShieldCheck className="w-8 h-8 mx-auto text-fedex-purple-light mb-3" />
                <div className="font-semibold text-lg">Secure & Insured</div>
                <p className="text-gray-600 text-sm mt-2">Cargo insurance and secure chain-of-custody handling.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Boxes className="w-6 h-6 text-fedex-orange" />
                  <div className="font-semibold">Warehousing & Distribution</div>
                </div>
                <p className="text-gray-600 text-sm">Strategic inventory positioning, cross-docking, and last-mile integrations.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <PackageSearch className="w-6 h-6 text-fedex-purple" />
                  <div className="font-semibold">Visibility & Tracking</div>
                </div>
                <p className="text-gray-600 text-sm">IoT-enabled status, milestone alerts, and detailed proof-of-delivery.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
