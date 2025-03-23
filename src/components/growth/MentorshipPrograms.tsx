
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageSquare, Calendar } from "lucide-react";

const mentorshipPrograms = [
  {
    id: "new-believers",
    title: "New Believers Mentorship",
    description: "A six-month program designed to help new Christians establish a strong foundation of faith.",
    mentors: [
      { name: "David Wilson", role: "Lead Pastor", image: "" },
      { name: "Sarah Chen", role: "Discipleship Director", image: "" },
    ],
    commitment: "1 hour weekly",
    duration: "6 months",
    nextStart: "January 15, 2024"
  },
  {
    id: "leadership",
    title: "Leadership Development",
    description: "Focused mentoring for those looking to grow in their leadership skills within the church and beyond.",
    mentors: [
      { name: "Michael Thompson", role: "Executive Pastor", image: "" },
      { name: "Rebecca Davis", role: "Leadership Coach", image: "" },
    ],
    commitment: "2 hours bi-weekly",
    duration: "12 months",
    nextStart: "February 1, 2024"
  },
  {
    id: "marriage",
    title: "Marriage Mentoring",
    description: "Guidance for couples at any stage looking to strengthen their marriage with Biblical principles.",
    mentors: [
      { name: "James & Lisa Brown", role: "Marriage Ministry Leaders", image: "" },
    ],
    commitment: "1.5 hours monthly",
    duration: "8 months",
    nextStart: "March 10, 2024"
  }
];

export default function MentorshipPrograms() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mentorshipPrograms.map((program) => (
          <Card key={program.id} className="border-faith-200 hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-medium mb-3 text-faith-900">{program.title}</h3>
              <p className="text-faith-600 text-sm mb-4">{program.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-faith-700 mb-2">Program Mentors:</h4>
                <div className="flex flex-col gap-3">
                  {program.mentors.map((mentor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-faith-200">
                        <AvatarImage src={mentor.image} />
                        <AvatarFallback className="bg-faith-100 text-faith-700">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-faith-800">{mentor.name}</div>
                        <div className="text-xs text-faith-500">{mentor.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-sm text-faith-600 mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-faith-500" />
                  <span>{program.commitment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-faith-500" />
                  <span>Next start: {program.nextStart}</span>
                </div>
              </div>
              
              <Button className="w-full bg-faith-700 hover:bg-faith-800">
                Apply for Mentorship
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" className="border-faith-300">
          Explore All Programs
        </Button>
      </div>
    </div>
  );
}
