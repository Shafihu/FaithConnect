import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Sunday Morning Service",
    time: "9:00 AM - 10:30 AM",
    location: "Main Sanctuary",
    description:
      "Join us for worship, prayer, and an inspiring message from our pastor.",
  },
  {
    id: 2,
    name: "Sunday Evening Service",
    time: "6:00 PM - 7:30 PM",
    location: "Main Sanctuary",
    description:
      "A more intimate gathering focused on deep worship and Bible study.",
  },
  {
    id: 3,
    name: "Wednesday Prayer Meeting",
    time: "7:00 PM - 8:30 PM",
    location: "Prayer Chapel",
    description:
      "A midweek spiritual refreshment with focused prayer and short teaching.",
  },
  {
    id: 4,
    name: "Friday Youth Service",
    time: "6:30 PM - 8:30 PM",
    location: "Youth Hall",
    description:
      "For teenagers and young adults with worship, games, and relevant teaching.",
  },
];

export default function ServiceSchedule() {
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
              className="bg-white rounded-lg shadow-sm border border-faith-100 p-6 hover:shadow-md transition-shadow duration-300 hover:border-faith-200"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-faith-900">
                  {service.name}
                </h3>
                <div className="flex items-center text-faith-700 gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{service.time}</span>
                </div>
                <div className="flex items-center text-faith-700 gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{service.location}</span>
                </div>
                <p className="text-faith-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-faith-700 hover:bg-faith-800">
            <Link to={"/calendar"}>View Full Calendar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
