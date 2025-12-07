import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Landing } from "./pages/Landing";
import { RoleSelect } from "./pages/RoleSelect";
import { Login } from "./pages/Login";
import { Menu } from "./pages/Menu";
import { WaiterDashboard } from "./pages/WaiterDashboard";
import { OwnerDashboard } from "./pages/OwnerDashboard";
import { RiderDashboard } from "./pages/RiderDashboard";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { RiderSignup } from "./pages/RiderSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dashboard/waiter" element={<WaiterDashboard />} />
          <Route path="/dashboard/owner" element={<OwnerDashboard />} />
          <Route path="/dashboard/rider" element={<RiderDashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/rider" element={<RiderSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ThemeToggle />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
