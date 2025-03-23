
import { Play, Calendar, Headphones, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SermonCardProps {
  sermon: {
    id: number;
    title: string;
    speaker: string;
    date: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    audioUrl: string;
    duration: string;
    topics: string[];
    views: number;
    series: string;
  };
}

export default function SermonCard({ sermon }: SermonCardProps) {
  return (
    <Card className="overflow-hidden border-faith-100 transition-transform hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-faith-100">
        <img 
          src={sermon.imageUrl || "/images/sermon-thumbnail.jpg"} 
          alt={sermon.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-faith-900/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button asChild size="icon" className="rounded-full bg-white/90 text-faith-900 hover:bg-white">
            <Link to={`/sermons/${sermon.id}`}>
              <Play className="h-6 w-6 ml-0.5" />
            </Link>
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-5 flex-grow">
        <div className="flex items-center gap-2 text-faith-500 text-sm mb-2">
          <Calendar className="h-4 w-4" />
          <span>{sermon.date}</span>
        </div>
        
        <Link to={`/sermons/${sermon.id}`} className="hover:underline">
          <h3 className="text-xl font-serif font-medium text-faith-900 mb-2 line-clamp-2">
            {sermon.title}
          </h3>
        </Link>
        
        <p className="text-faith-600 text-sm line-clamp-3 mb-4">
          {sermon.description}
        </p>
        
        <div className="flex items-center gap-1 text-faith-600 text-sm">
          <span className="font-medium">{sermon.speaker}</span>
          <span>•</span>
          <span className="text-faith-500">{sermon.series}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 border-t border-faith-100 pt-4">
        <div className="flex items-center gap-1 text-faith-500 text-xs">
          <Clock className="h-3 w-3" />
          <span>{sermon.duration}</span>
        </div>
        
        {sermon.topics.slice(0, 2).map((topic, index) => (
          <Badge key={index} variant="outline" className="text-faith-600 border-faith-200 text-xs">
            {topic}
          </Badge>
        ))}
        
        <Button 
          asChild
          size="sm"
          variant="ghost" 
          className="ml-auto text-faith-600 hover:text-faith-800 hover:bg-faith-50 p-0 h-6"
        >
          <Link to={sermon.audioUrl} className="flex items-center gap-1">
            <Headphones className="h-3 w-3" />
            <span className="text-xs">Listen</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
