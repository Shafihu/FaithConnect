
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Church, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserProfileMenu from "@/components/auth/UserProfileMenu";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Sermons", path: "/sermons" },
  { name: "Events", path: "/events" },
  { name: "Growth", path: "/growth" },
  { name: "Contact", path: "/contact" },
  { name: "Posts", path: "/posts" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform hover:scale-[1.02] duration-300"
        >
          <Church className="h-6 w-6 text-faith-700" />
          <span className="text-xl font-serif font-medium">
            Faith<span className="text-faith-700">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover-underline",
                location.pathname === link.path
                  ? "text-faith-700"
                  : "text-faith-800 hover:text-faith-700"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <UserProfileMenu />
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Button
                asChild
                variant="outline"
                className="border-faith-300 hover:border-faith-400"
                size="sm"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-faith-700 hover:bg-faith-800 text-white"
                size="sm"
              >
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-faith-800" />
          ) : (
            <Menu className="h-6 w-6 text-faith-800" />
          )}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <Link to="/" className="flex items-center gap-2">
                <Church className="h-6 w-6 text-faith-700" />
                <span className="text-xl font-serif font-medium">
                  Faith<span className="text-faith-700">Connect</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-faith-800" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-8">
              {links.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-lg font-medium transition-colors animate-fade-in",
                    location.pathname === link.path
                      ? "text-faith-700"
                      : "text-faith-800 hover:text-faith-700"
                  )}
                  style={{ animationDelay: `${100 + index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div 
                  className="animate-fade-in"
                  style={{ animationDelay: `${100 + links.length * 50}ms` }}
                >
                  <Link to="/profile" className="text-lg font-medium text-faith-800 hover:text-faith-700">
                    My Profile
                  </Link>
                  <Button
                    onClick={() => {
                      const { logout } = useAuth();
                      logout();
                      setIsOpen(false);
                    }}
                    variant="ghost"
                    className="mt-4 text-lg font-medium text-faith-800 hover:text-faith-700 p-0"
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 mt-4 animate-fade-in" style={{ animationDelay: `${100 + links.length * 50}ms` }}>
                  <Button
                    asChild
                    className="w-full bg-faith-700 hover:bg-faith-800 text-white"
                  >
                    <Link to="/signup">Create Account</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-faith-300 hover:border-faith-400"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
