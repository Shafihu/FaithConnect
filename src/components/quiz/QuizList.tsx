
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, BookCheck, ChevronRight, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";

export default function QuizList() {
  const { quizzes } = useQuiz();
  const [category, setCategory] = useState<string>("all");
  
  const filteredQuizzes = category === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === category);
  
  const categories = ["all", ...new Set(quizzes.map(quiz => quiz.category))];

  return (
    <div className="mt-10">
      <Tabs defaultValue="all" onValueChange={setCategory} className="w-full">
        <TabsList className="flex justify-start overflow-auto pb-2 mb-6 bg-transparent space-x-2">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="px-4 py-2 border rounded-full data-[state=active]:bg-faith-700 data-[state=active]:text-white"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-faith-50 text-faith-800">
                        {quiz.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {quiz.timeMinutes} min
                      </div>
                    </div>
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Book className="h-4 w-4 mr-1" />
                      <span>{quiz.questions.length} questions</span>
                      {quiz.completed && (
                        <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">
                          <BookCheck className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    {quiz.bestScore && (
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Award className="h-4 w-4 mr-1" />
                        <span>Best score: {quiz.bestScore}%</span>
                      </div>
                    )}
                    
                    <Button asChild className="w-full mt-auto">
                      <Link to={`/quizzes/${quiz.id}`}>
                        Start Quiz <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredQuizzes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No quizzes available in this category yet.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
