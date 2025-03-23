
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Same events data from EventList component
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
    attendees: 45,
    longDescription: "Join us for a special evening dedicated to prayer and worship. We'll spend time in extended worship, focused prayer for our community and world, and seeking God's presence together. This is a powerful opportunity to connect with God and other believers. All are welcome, regardless of where you are in your faith journey."
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
    attendees: 28,
    longDescription: "Our annual youth summer retreat is a highlight of the year! Students in grades 7-12 will spend three days at beautiful Mountain View Camp for a time of spiritual growth, fun activities, and building lasting friendships. The retreat includes worship sessions, small group discussions, outdoor activities, games, and more. Registration fee includes transportation, lodging, and all meals."
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
    attendees: 35,
    longDescription: "Community Outreach Day is our opportunity to be the hands and feet of Jesus to our local community. We'll be setting up at City Park with free food, family games, school supply giveaways, and opportunities to pray with and encourage our neighbors. We need volunteers to help with setup, food service, games, and cleanup. This is a great way to connect with people in our community and show God's love in practical ways."
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
    attendees: 18,
    longDescription: "Our women's Bible study meets weekly to explore scripture together and support one another in our faith journeys. This season, we're studying influential women in the Bible and discovering how their stories connect to our modern lives. Each session includes teaching, small group discussion, and prayer time. Women of all ages and stages of faith are welcome. Childcare is provided for children under 5 years of age."
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
    attendees: 22,
    longDescription: "The Men's Breakfast Fellowship is a monthly opportunity for men to gather for a hearty breakfast, genuine fellowship, and meaningful conversation about faith and life. Each month features a different speaker or topic for discussion, designed to encourage men in their daily walk with God. This is a casual, welcoming environment where men can build relationships and grow together. No registration required, just show up hungry!"
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
    attendees: 60,
    longDescription: "Bring the whole family for a fun movie night at the Community Center! We'll be showing an inspiring, family-friendly film on our big screen, with comfortable seating and free popcorn and drinks for everyone. This is a great opportunity to invite friends and neighbors for a relaxed evening of entertainment and fellowship. Doors open at 6:30 PM, and the movie starts at 7:00 PM. Feel free to bring blankets or cushions for extra comfort!"
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
    attendees: 15,
    longDescription: "Join us as we serve at the Hope Community Shelter, providing meals and companionship to those experiencing homelessness in our community. Volunteers will help prepare and serve a hot meal, engage in conversation with shelter residents, and assist with cleanup afterward. This is a powerful way to show Christ's love to some of the most vulnerable members of our community. No special skills are required, just a willing heart to serve. Space is limited to 15 volunteers, so please sign up early."
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
    attendees: 25,
    longDescription: "If you have a heart for worship and want to grow in your musical abilities, join our worship team for this special workshop! We'll be learning new worship songs, exploring vocal and instrumental techniques, and discussing the theology behind worship. This is open to current worship team members as well as anyone interested in potentially joining the team in the future. Musicians of all skill levels are welcome. Bring your instrument if you play one, or just come ready to sing and learn together."
  }
];

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Find the event with the matching id
  const event = events.find(e => e.id === Number(id));
  
  if (!event) {
    return (
      <Layout>
        <div className="container py-16 px-4 md:px-6 text-center">
          <h2 className="text-2xl font-medium mb-4">Event Not Found</h2>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      toast.success("You've successfully registered for this event!");
    }, 1500);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          {/* Back Link */}
          <Link 
            to="/events" 
            className="inline-flex items-center gap-1 text-faith-700 hover:text-faith-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Event Image */}
            <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-auto md:h-full">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Event Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-faith-900 mb-4">
                {event.title}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-faith-700">
                  <Calendar className="h-5 w-5 text-faith-600" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-faith-700">
                  <Clock className="h-5 w-5 text-faith-600" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-faith-700">
                  <MapPin className="h-5 w-5 text-faith-600" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-faith-700">
                  <Users className="h-5 w-5 text-faith-600" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              
              <div className="prose prose-faith max-w-none mb-8">
                <p className="text-faith-700 mb-4 text-lg">{event.description}</p>
                <p className="text-faith-600">{event.longDescription}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-faith-700 hover:bg-faith-800 text-white"
                  onClick={handleRegister}
                  disabled={isRegistering}
                >
                  {isRegistering ? "Registering..." : "Register Now"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-faith-200"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
