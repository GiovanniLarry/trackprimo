import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PackageTrackingPage from "@/pages/package-tracking";
import ExpressShippingPage from "@/pages/express-shipping";
import InternationalDeliveryPage from "@/pages/international-delivery";
import FreightServicesPage from "@/pages/freight-services";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/package-tracking" component={PackageTrackingPage} />
      <Route path="/express-shipping" component={ExpressShippingPage} />
      <Route path="/international-delivery" component={InternationalDeliveryPage} />
      <Route path="/freight-services" component={FreightServicesPage} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
