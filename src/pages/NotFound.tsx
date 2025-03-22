
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Church, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-6 flex justify-center">
            <Church className="h-16 w-16 text-faith-700" />
          </div>
          <h1 className="text-5xl font-serif font-medium mb-4 text-faith-900">404</h1>
          <p className="text-xl text-faith-800 mb-6">Page Not Found</p>
          <p className="text-faith-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button
            asChild
            className="bg-faith-700 hover:bg-faith-800"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
