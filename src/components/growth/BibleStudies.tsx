
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users } from "lucide-react";

const bibleStudies = [
  {
    id: "gospel-of-john",
    title: "The Gospel of John",
    description: "Explore the Gospel of John verse by verse, uncovering its rich theological themes and practical applications.",
    duration: "8 weeks",
    schedule: "Tuesdays at 7:00 PM",
    level: "Beginner",
    participants: 24,
    location: "Fellowship Hall",
    image: "/images/bible-john.jpg"
  },
  {
    id: "psalms-worship",
    title: "Psalms: The Language of Worship",
    description: "Dive into the book of Psalms and discover how these ancient prayers can transform your worship experience.",
    duration: "10 weeks",
    schedule: "Wednesdays at 6:30 PM",
    level: "Intermediate",
    participants: 18,
    location: "Room 201",
    image: "/images/bible-psalms.jpg"
  },
  {
    id: "romans-doctrine",
    title: "Romans: Core Christian Doctrine",
    description: "Study Paul's most comprehensive explanation of Christian theology and its implications for our lives.",
    duration: "12 weeks",
    schedule: "Thursdays at 7:00 PM",
    level: "Advanced",
    participants: 15,
    location: "Online via Zoom",
    image: "/images/bible-romans.jpg"
  }
];

export default function BibleStudies() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bibleStudies.map((study) => (
          <Card key={study.id} className="border-faith-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="aspect-video bg-faith-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-faith-900/20"></div>
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` 
                }}
              ></div>
              <Badge className="absolute top-3 right-3 bg-faith-700">
                {study.level}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-medium mb-2 text-faith-900">{study.title}</h3>
              <p className="text-faith-600 text-sm mb-4">{study.description}</p>
              
              <div className="flex flex-col gap-2 text-sm text-faith-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-faith-500" />
                  <span>{study.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-faith-500" />
                  <span>{study.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-faith-500" />
                  <span>{study.participants} participants</span>
                </div>
              </div>
              
              <Button className="w-full bg-faith-700 hover:bg-faith-800">
                Join Study
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" className="border-faith-300">
          View All Bible Studies
        </Button>
      </div>
    </div>
  );
}
