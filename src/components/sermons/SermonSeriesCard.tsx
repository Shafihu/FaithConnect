
import { Link } from "react-router-dom";
import { LayersIcon, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SermonSeriesCardProps {
  series: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    count: number;
    date: string;
  };
}

export default function SermonSeriesCard({ series }: SermonSeriesCardProps) {
  return (
    <Card className="overflow-hidden border-faith-100 transition-transform hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-faith-100">
        <img 
          src={series.imageUrl || "/images/series-thumbnail.jpg"} 
          alt={series.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-faith-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif font-medium text-white mb-1">
            {series.title}
          </h3>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <LayersIcon className="h-4 w-4" />
              <span>{series.count} sermons</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{series.date}</span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-5 flex-grow flex flex-col">
        <p className="text-faith-600 text-sm flex-grow">
          {series.description}
        </p>
        
        <Button
          asChild
          variant="outline"
          className="w-full mt-4 border-faith-200 text-faith-700 hover:bg-faith-50"
        >
          <Link to={`/sermon-series/${series.id}`}>
            View Series
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
