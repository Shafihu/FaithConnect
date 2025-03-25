
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Calendar, BookOpen, ListPlus, MessageSquare, LayoutDashboard, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Events", path: "/admin/events", icon: Calendar },
  { name: "Sermons", path: "/admin/sermons", icon: BookOpen },
  { name: "Posts", path: "/admin/posts", icon: MessageSquare },
  { name: "Quizzes", path: "/admin/quizzes", icon: BookText },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-20">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-xl font-serif font-medium">
                Faith<span className="text-faith-700">Connect</span>
              </span>
            </Link>
            <div className="py-2 px-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-faith-50 text-faith-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-faith-700"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 mt-auto">
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Site</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
