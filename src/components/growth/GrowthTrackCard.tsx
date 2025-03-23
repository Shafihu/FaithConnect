
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface GrowthTrackProps {
  track: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    completionRate: number;
  };
}

export default function GrowthTrackCard({ track }: GrowthTrackProps) {
  const { title, description, icon: Icon, color, completionRate } = track;
  
  return (
    <Card className="h-full flex flex-col border-faith-200 hover:border-faith-300 transition-all duration-300 hover:shadow-md">
      <CardContent className="flex-grow p-6">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-serif font-medium text-faith-900 mb-2">{title}</h3>
        <p className="text-faith-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col gap-2 mt-auto">
        <div className="w-full flex justify-between text-xs text-faith-500 mb-1">
          <span>Progress</span>
          <span>{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2 bg-faith-100" />
        <Button 
          variant="outline" 
          className="w-full mt-4 border-faith-200 hover:border-faith-300 hover:bg-faith-50"
        >
          Continue Track
        </Button>
      </CardFooter>
    </Card>
  );
}
