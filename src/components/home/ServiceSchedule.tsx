
import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { useState } from "react";

const services = [
  {
    id: 1,
    name: "Sunday Morning Service",
    time: "9:00 AM - 10:30 AM",
    location: "Main Sanctuary",
    description:
      "Join us for worship, prayer, and an inspiring message from our pastor.",
    image: "/images/church-interior.jpg",
  },
  {
    id: 2,
    name: "Sunday Evening Service",
    time: "6:00 PM - 7:30 PM",
    location: "Main Sanctuary",
    description:
      "A more intimate gathering focused on deep worship and Bible study.",
    image: "/images/sermon-2.jpg",
  },
  {
    id: 3,
    name: "Wednesday Prayer Meeting",
    time: "7:00 PM - 8:30 PM",
    location: "Prayer Chapel",
    description:
      "A midweek spiritual refreshment with focused prayer and short teaching.",
    image: "/images/event-worship.jpg",
  },
  {
    id: 4,
    name: "Friday Youth Service",
    time: "6:30 PM - 8:30 PM",
    location: "Youth Hall",
    description:
      "For teenagers and young adults with worship, games, and relevant teaching.",
    image: "/images/event-youth.jpg",
  },
];

export default function ServiceSchedule() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-faith-50">
      <div className="container px-4 md:px-6">
        <SectionHeading
          subtitle="Join Us"
          title="Service Schedule"
          description="We invite you to join us in worshipping together and growing in faith at our regular services."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm border border-faith-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-faith-200 group"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredService === index ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-medium text-white">
                  {service.name}
                </h3>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center text-faith-700 gap-2 text-sm">
                  <Clock className="h-4 w-4 text-faith-500 flex-shrink-0" />
                  <span>{service.time}</span>
                </div>
                <div className="flex items-center text-faith-700 gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-faith-500 flex-shrink-0" />
                  <span>{service.location}</span>
                </div>
                <p className="text-faith-600 text-sm pt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-faith-700 hover:bg-faith-800">
            <Link to={"/calendar"} className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Full Calendar
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="border-faith-200 text-faith-700 hover:bg-faith-50">
            <Link to={"/contact"} className="flex items-center gap-2">
              Get Directions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
