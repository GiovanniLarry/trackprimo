import { Truck, Phone, Mail, MapPin, Clock, Globe, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-fedex-orange p-2 rounded-lg">
                <Truck className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold">TrackPrimo</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Professional package tracking and shipping services worldwide. Delivering excellence with every shipment.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs">190+ Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Secure Delivery</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Services</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-gray-300 hover:text-fedex-orange transition-colors duration-200">
                Package Tracking
              </Link>
              <div className="text-gray-300">Express Shipping</div>
              <div className="text-gray-300">International Delivery</div>
              <div className="text-gray-300">Freight Services</div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Support</h4>
            <div className="space-y-2 text-sm">
              <Link href="/contact" className="block text-gray-300 hover:text-fedex-orange transition-colors duration-200">
                Contact Us
              </Link>
              {/* Admin portal intentionally omitted from public footer */}
              <div className="text-gray-300">Help Center</div>
              <div className="text-gray-300">Shipping Guide</div>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-fedex-orange flex-shrink-0" />
                <span className="text-gray-300">+1 931-227-9175</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-fedex-orange flex-shrink-0" />
                <span className="text-gray-300 break-all">fedexPackShipping@gmail.com</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-fedex-orange" />
                  <span className="text-gray-300 font-medium">Business Hours</span>
                </div>
                <div className="text-gray-400 text-xs space-y-1 ml-6">
                  <div>Mon-Fri: 8:00 AM - 8:00 PM</div>
                  <div>Sat: 9:00 AM - 6:00 PM</div>
                  <div>Sun: 10:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 TrackPrimo. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400 text-xs">
              <span className="hover:text-fedex-orange cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-fedex-orange cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-fedex-orange cursor-pointer transition-colors">Shipping Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}