import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Truck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/package-tracking", label: "Package Tracking" },
    { path: "/express-shipping", label: "Express Shipping" },
    { path: "/international-delivery", label: "International Delivery" },
    { path: "/freight-services", label: "Freight Services" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="bg-fedex-purple shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="bg-fedex-orange p-2 rounded-lg">
              <Truck className="text-white text-xl" />
            </div>
            <h1 className="text-white text-2xl font-bold">TrackPrimo</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`text-white hover:text-fedex-orange transition-colors duration-200 font-medium ${
                  location === item.path ? 'text-fedex-orange' : ''
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-fedex-orange"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-fedex-purple-light" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`block text-white hover:text-fedex-orange px-3 py-2 font-medium w-full text-left ${
                    location === item.path ? 'text-fedex-orange' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
