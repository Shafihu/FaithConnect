
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Pencil, Trash2, Clock, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "@/context/QuizContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const quizFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  timeMinutes: z.number().min(1, "Time must be at least 1 minute").max(60, "Time must be less than 60 minutes"),
});

export default function AdminQuizzes() {
  const { quizzes, addQuiz, deleteQuiz } = useQuiz();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [questions, setQuestions] = useState([{
    question: "",
    options: ["", "", "", ""],
    correctAnswer: ""
  }]);

  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      timeMinutes: 10,
    },
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    } else {
      toast({
        title: "Cannot delete",
        description: "Quiz must have at least one question",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (values: z.infer<typeof quizFormSchema>) => {
    // Validate questions
    const isValid = questions.every(q => 
      q.question.trim() !== "" && 
      q.options.every(o => o.trim() !== "") &&
      q.correctAnswer.trim() !== ""
    );

    if (!isValid) {
      toast({
        title: "Validation error",
        description: "All questions must have text, all options filled, and a correct answer selected",
        variant: "destructive",
      });
      return;
    }

    // Create new quiz object
    const newQuiz = {
      title: values.title,
      description: values.description,
      category: values.category.toLowerCase(),
      timeMinutes: values.timeMinutes,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      })),
    };

    // Add the quiz
    addQuiz(newQuiz);
    
    console.log("New quiz created:", newQuiz);
    
    toast({
      title: "Quiz created",
      description: "The quiz has been successfully created and is now available",
    });

    // Reset form
    form.reset();
    setQuestions([{
      question: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }]);
    setActiveTab("list");
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(id);
      toast({
        title: "Quiz deleted",
        description: "The quiz has been successfully deleted",
      });
    }
  };

  return (
    <AdminLayout title="Quiz Management">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">Quiz List</TabsTrigger>
          <TabsTrigger value="create">Create Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Available Quizzes</CardTitle>
              <CardDescription>Manage the quizzes available on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {quizzes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>{quiz.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {quiz.timeMinutes} min
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Book className="h-4 w-4 mr-1" />
                            {quiz.questions.length}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteQuiz(quiz.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No quizzes have been created yet.</p>
                  <Button 
                    onClick={() => setActiveTab("create")} 
                    className="mt-2"
                  >
                    Create Your First Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Quiz</CardTitle>
              <CardDescription>Add a new quiz for church members</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Bible Basics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., New Testament" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the quiz content" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeMinutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Limit (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            max="60"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Questions</h3>
                      <Button 
                        type="button" 
                        onClick={handleAddQuestion}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Question
                      </Button>
                    </div>
                    
                    {questions.map((question, qIndex) => (
                      <Card key={qIndex}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteQuestion(qIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor={`question-${qIndex}`}>Question Text</Label>
                            <Input 
                              id={`question-${qIndex}`}
                              value={question.question} 
                              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                              placeholder="Enter your question here"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Label>Answer Options</Label>
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex gap-2">
                                <Input 
                                  value={option}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                  placeholder={`Option ${oIndex + 1}`}
                                />
                                <Button
                                  type="button"
                                  variant={question.correctAnswer === option ? "default" : "outline"}
                                  className={question.correctAnswer === option ? "bg-green-600" : ""}
                                  onClick={() => handleCorrectAnswerChange(qIndex, option)}
                                  disabled={!option.trim()}
                                >
                                  Correct
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("list")}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Create Quiz
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
