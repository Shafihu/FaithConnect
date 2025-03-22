
import { Heart, Calendar, Music, Video, Mail, Book } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  {
    title: "Our Beliefs",
    description: "Learn about our core values and theology",
    icon: Heart,
    path: "/about",
    color: "bg-red-50 text-red-600",
    hoverColor: "hover:bg-red-100"
  },
  {
    title: "Upcoming Events",
    description: "View our calendar of events",
    icon: Calendar,
    path: "/events",
    color: "bg-blue-50 text-blue-600",
    hoverColor: "hover:bg-blue-100"
  },
  {
    title: "Worship",
    description: "Listen to our worship music",
    icon: Music,
    path: "/sermons",
    color: "bg-purple-50 text-purple-600",
    hoverColor: "hover:bg-purple-100"
  },
  {
    title: "Sermons",
    description: "Watch or listen to past sermons",
    icon: Video,
    path: "/sermons",
    color: "bg-green-50 text-green-600",
    hoverColor: "hover:bg-green-100"
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team",
    icon: Mail,
    path: "/contact",
    color: "bg-amber-50 text-amber-600",
    hoverColor: "hover:bg-amber-100"
  },
  {
    title: "Bible Study",
    description: "Join our weekly Bible studies",
    icon: Book,
    path: "/growth",
    color: "bg-teal-50 text-teal-600",
    hoverColor: "hover:bg-teal-100"
  }
];

export default function QuickLinks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-faith-900 mb-4">
            Quick Links
          </h2>
          <p className="text-faith-600 max-w-2xl mx-auto">
            Find what you're looking for quickly and easily
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Link 
              key={index}
              to={link.path}
              className={`p-6 rounded-lg border ${link.color} ${link.hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex gap-4 items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <link.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-faith-900">
                    {link.title}
                  </h3>
                  <p className="text-faith-600 text-sm">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
