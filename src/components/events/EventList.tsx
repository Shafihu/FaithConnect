
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Prayer & Worship Night",
    date: "August 5, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    image: "/images/event-worship.jpg",
    description: "An evening of extended worship and prayer for our community.",
    category: "worship",
    attendees: 45
  },
  {
    id: 2,
    title: "Youth Summer Retreat",
    date: "August 12-14, 2023",
    time: "Departs 9:00 AM",
    location: "Mountain View Camp",
    image: "/images/event-youth.jpg",
    description: "Three days of fellowship, fun, and spiritual growth for teens.",
    category: "youth",
    attendees: 28
  },
  {
    id: 3,
    title: "Community Outreach Day",
    date: "August 20, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "City Park",
    image: "/images/event-outreach.jpg",
    description: "Serving our local community with food, games, and sharing God's love.",
    category: "outreach",
    attendees: 35
  },
  {
    id: 4,
    title: "Women's Bible Study",
    date: "Every Tuesday",
    time: "10:00 AM - 11:30 AM",
    location: "Fellowship Hall",
    image: "/images/event-women-study.jpg",
    description: "A weekly study focusing on women in the Bible and applying scripture to daily life.",
    category: "study",
    attendees: 18
  },
  {
    id: 5,
    title: "Men's Breakfast Fellowship",
    date: "First Saturday Monthly",
    time: "8:00 AM - 9:30 AM",
    location: "Church Dining Hall",
    image: "/images/event-mens-breakfast.jpg",
    description: "Monthly gathering for men to enjoy breakfast, fellowship, and spiritual discussion.",
    category: "fellowship",
    attendees: 22
  },
  {
    id: 6,
    title: "Family Movie Night",
    date: "August 28, 2023",
    time: "6:30 PM - 9:00 PM",
    location: "Community Center",
    image: "/images/event-movie-night.jpg",
    description: "A fun-filled evening watching a family-friendly Christian film with popcorn and refreshments.",
    category: "fellowship",
    attendees: 60
  },
  {
    id: 7,
    title: "Homeless Shelter Volunteer Day",
    date: "September 4, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Hope Community Shelter",
    image: "/images/event-volunteer.jpg",
    description: "Serving meals and providing companionship at our local homeless shelter.",
    category: "outreach",
    attendees: 15
  },
  {
    id: 8,
    title: "Praise & Worship Workshop",
    date: "September 10, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Music Room",
    image: "/images/event-worship-workshop.jpg",
    description: "Learn new worship songs and techniques with our worship team.",
    category: "worship",
    attendees: 25
  }
];

interface EventListProps {
  searchQuery: string;
  categoryFilter: string;
}

export default function EventList({ searchQuery, categoryFilter }: EventListProps) {
  // Filter events based on search query and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl text-faith-800 mb-2">No events found</h3>
        <p className="text-faith-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <Card 
          key={event.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-md border-faith-100 hover:border-faith-300"
        >
          <div className="aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-faith-600 mb-3 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            
            <h3 className="text-xl font-medium text-faith-900 mb-2">
              {event.title}
            </h3>
            
            <p className="text-faith-600 mb-4 text-sm line-clamp-2">
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
              <div className="flex items-center gap-2 text-faith-600 text-sm">
                <Users className="h-4 w-4 text-faith-500" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            
            <Button 
              asChild
              variant="outline"
              className="w-full border-faith-200 text-faith-700 hover:bg-faith-50"
            >
              <Link to={`/events/${event.id}`}>
                View Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
