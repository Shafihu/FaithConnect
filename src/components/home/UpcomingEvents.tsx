import { Calendar, ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const upcomingEvents = [
  {
    id: 1,
    title: "Prayer & Worship Night",
    date: "August 5, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    image: "/images/event-worship.jpg",
    description: "An evening of extended worship and prayer for our community.",
  },
  {
    id: 2,
    title: "Youth Summer Retreat",
    date: "August 12-14, 2023",
    time: "Departs 9:00 AM",
    location: "Mountain View Camp",
    image: "/images/event-youth.jpg",
    description:
      "Three days of fellowship, fun, and spiritual growth for teens.",
  },
  {
    id: 3,
    title: "Community Outreach Day",
    date: "August 20, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "City Park",
    image: "/images/event-outreach.jpg",
    description:
      "Serving our local community with food, games, and sharing God's love.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <SectionHeading
            subtitle="Mark Your Calendar"
            title="Upcoming Events"
            description="Stay connected with what's happening in our community."
            align="left"
            className="md:mb-0"
          />

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-faith-700 hover:text-faith-800 font-medium transition-colors"
          >
            View Full Calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-faith-100 hover:shadow-md transition-all hover:border-faith-200 group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-faith-600 mb-3 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>

                <h3 className="text-xl font-medium text-faith-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-faith-600 mb-4 text-sm">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-faith-600 text-sm">
                    <Clock className="h-4 w-4 text-faith-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-faith-600 text-sm">
                    <MapPin className="h-4 w-4 text-faith-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-faith-200 text-faith-700 hover:bg-faith-50"
                >
                  <Link to={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
