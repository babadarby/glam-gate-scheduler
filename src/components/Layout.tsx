import { Home, Calendar, Info, Phone, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Booking", href: "/booking", icon: Calendar },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-elegant">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-salon-plum">Beauty Bazaar</h1>
              <p className="text-sm text-salon-plum/80 italic hidden sm:block">
                "Where beauty meets experts"
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-salon-cream shadow-soft flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-primary"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="pb-4">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Button
                      asChild
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={`transition-smooth ${
                        isActive(item.href)
                          ? "bg-salon-plum text-white shadow-soft"
                          : "text-salon-plum hover:bg-salon-cream hover:text-salon-plum"
                      }`}
                    >
                      <Link to={item.href} className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.name}</span>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-salon-plum text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Beauty Bazaar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;