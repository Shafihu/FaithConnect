
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Clock, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import { useAuth } from "@/context/AuthContext";

export default function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getQuizById, updateQuizResults } = useQuiz();
  const { isAuthenticated, user } = useAuth();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const foundQuiz = getQuizById(id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setTimeLeft(foundQuiz.timeMinutes * 60);
        setSelectedAnswers(new Array(foundQuiz.questions.length).fill(""));
      } else {
        toast({
          title: "Quiz not found",
          description: "The quiz you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate("/quizzes");
      }
    }
    setLoading(false);
  }, [id, getQuizById, navigate, toast]);

  useEffect(() => {
    if (!loading && quiz && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, quiz, quizCompleted]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    
    let correctCount = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(percentage);
    setQuizCompleted(true);
    
    if (isAuthenticated && user) {
      updateQuizResults(quiz.id, percentage);
      toast({
        title: "Quiz completed!",
        description: `Your score: ${percentage}%`,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <p>Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  if (!quiz) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <p>Quiz not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-20">
        <div className="container px-4 md:px-6 max-w-4xl">
          {!quizCompleted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => navigate("/quizzes")}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Quizzes
                </Button>
                <div className="flex items-center text-faith-700">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                      <CardDescription>Question {currentQuestion + 1} of {quiz.questions.length}</CardDescription>
                    </div>
                  </div>
                  <Progress value={(currentQuestion + 1) / quiz.questions.length * 100} className="h-2" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">{quiz.questions[currentQuestion].question}</h3>
                      <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerChange}>
                        {quiz.questions[currentQuestion].options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 py-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="text-base">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-6">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <div>
                    {currentQuestion === quiz.questions.length - 1 ? (
                      <Button onClick={handleSubmitQuiz} className="bg-faith-700 hover:bg-faith-800">
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion} className="bg-faith-700 hover:bg-faith-800">
                        Next <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card className="max-w-md mx-auto text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
                <CardDescription>You've completed the quiz!</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="mb-6">
                  {score !== null && score >= 70 ? (
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                  )}
                  <h3 className="text-2xl font-bold mb-2">
                    Your Score: {score}%
                  </h3>
                  <p className="text-faith-600">
                    {score !== null && score >= 70
                      ? "Great job! You've passed the quiz."
                      : "Keep studying and try again to improve your score."}
                  </p>
                </div>
                {!isAuthenticated && (
                  <div className="mt-6 p-4 bg-faith-50 rounded-lg">
                    <p className="text-sm text-faith-700 mb-2">
                      Create an account to save your results and track your progress!
                    </p>
                    <Button asChild size="sm" className="bg-faith-700">
                      <Link to="/signup">Create Account</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" onClick={() => navigate("/quizzes")}>
                  Back to Quizzes
                </Button>
                <Button onClick={() => {
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers(new Array(quiz.questions.length).fill(""));
                  setTimeLeft(quiz.timeMinutes * 60);
                  setScore(null);
                }}>
                  Try Again
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
