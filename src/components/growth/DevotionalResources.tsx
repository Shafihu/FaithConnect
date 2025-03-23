
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, ExternalLink } from "lucide-react";

const devotionalResources = [
  {
    id: "daily-bread",
    title: "Daily Bread",
    description: "Start your day with scripture readings, reflections, and prayers designed to nourish your spirit.",
    type: "Daily Devotional",
    format: "Mobile App & PDF",
    featured: true,
    image: "/images/devotional-daily.jpg"
  },
  {
    id: "prayer-journal",
    title: "Prayer Journal Guide",
    description: "A structured journal template to help you develop a consistent and meaningful prayer life.",
    type: "Prayer Resource",
    format: "Printable PDF",
    featured: false,
    image: "/images/devotional-prayer.jpg"
  },
  {
    id: "wisdom-proverbs",
    title: "Wisdom from Proverbs",
    description: "A 31-day journey through the Book of Proverbs, with practical applications for daily living.",
    type: "Monthly Devotional",
    format: "E-book & Audio",
    featured: true,
    image: "/images/devotional-proverbs.jpg"
  }
];

export default function DevotionalResources() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devotionalResources.map((resource) => (
          <Card key={resource.id} className="border-faith-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="aspect-video bg-faith-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-faith-900/20"></div>
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')` 
                }}
              ></div>
              {resource.featured && (
                <Badge className="absolute top-3 right-3 bg-faith-700">
                  Featured
                </Badge>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-faith-500" />
                <span className="text-xs text-faith-500">{resource.type}</span>
              </div>
              
              <h3 className="text-xl font-serif font-medium mb-2 text-faith-900">{resource.title}</h3>
              <p className="text-faith-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex flex-col gap-2 text-sm text-faith-600 mb-4">
                <div className="text-xs text-faith-500">Available as: {resource.format}</div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-faith-700 hover:bg-faith-800">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                <Button variant="outline" className="border-faith-300">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" className="border-faith-300">
          Browse All Resources
        </Button>
      </div>
    </div>
  );
}
