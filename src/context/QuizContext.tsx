
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  timeMinutes: number;
  questions: Question[];
  completed?: boolean;
  bestScore?: number;
};

type QuizContextType = {
  quizzes: Quiz[];
  getQuizById: (id: string) => Quiz | undefined;
  updateQuizResults: (quizId: string, score: number) => void;
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  deleteQuiz: (id: string) => void;
};

// Sample quiz data
const initialQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Basics of Christianity",
    description: "Test your knowledge of fundamental Christian beliefs and principles.",
    category: "basics",
    timeMinutes: 10,
    questions: [
      {
        question: "Who is considered the founder of Christianity?",
        options: ["Moses", "Jesus Christ", "Abraham", "Paul"],
        correctAnswer: "Jesus Christ"
      },
      {
        question: "What is the first book of the New Testament?",
        options: ["Genesis", "John", "Matthew", "Acts"],
        correctAnswer: "Matthew"
      },
      {
        question: "What is the central Christian ritual called?",
        options: ["Baptism", "Communion", "Confirmation", "Confession"],
        correctAnswer: "Communion"
      },
      {
        question: "How many disciples did Jesus have?",
        options: ["10", "12", "7", "15"],
        correctAnswer: "12"
      },
      {
        question: "What is the Christian term for God's unmerited favor?",
        options: ["Mercy", "Faith", "Grace", "Hope"],
        correctAnswer: "Grace"
      }
    ]
  },
  {
    id: "2",
    title: "Old Testament Heroes",
    description: "Learn about the great figures from the Old Testament and their stories.",
    category: "old testament",
    timeMinutes: 15,
    questions: [
      {
        question: "Who built the ark according to God's command?",
        options: ["Abraham", "Moses", "Noah", "David"],
        correctAnswer: "Noah"
      },
      {
        question: "Who led the Israelites out of Egypt?",
        options: ["Joshua", "Moses", "Abraham", "Solomon"],
        correctAnswer: "Moses"
      },
      {
        question: "Which king of Israel wrote many of the Psalms?",
        options: ["Saul", "Solomon", "David", "Rehoboam"],
        correctAnswer: "David"
      },
      {
        question: "Who was sold into slavery by his brothers and later became a ruler in Egypt?",
        options: ["Joseph", "Benjamin", "Reuben", "Judah"],
        correctAnswer: "Joseph"
      },
      {
        question: "Who was known for his great wisdom and built the first temple in Jerusalem?",
        options: ["David", "Solomon", "Saul", "Hezekiah"],
        correctAnswer: "Solomon"
      }
    ]
  },
  {
    id: "3",
    title: "New Testament Parables",
    description: "Test your understanding of Jesus' teachings through parables.",
    category: "new testament",
    timeMinutes: 12,
    questions: [
      {
        question: "In the Parable of the Prodigal Son, what does the father do when his son returns?",
        options: ["Sends him away", "Makes him work as a servant", "Welcomes him with a celebration", "Ignores him"],
        correctAnswer: "Welcomes him with a celebration"
      },
      {
        question: "What is the main message of the Parable of the Good Samaritan?",
        options: ["Always travel in groups", "Love your neighbor regardless of differences", "Avoid dangerous roads", "Give money to the poor"],
        correctAnswer: "Love your neighbor regardless of differences"
      },
      {
        question: "In the Parable of the Sower, what does the seed represent?",
        options: ["Money", "The Word of God", "Food", "People"],
        correctAnswer: "The Word of God"
      },
      {
        question: "What did the merchant do when he found a pearl of great price?",
        options: ["Stole it", "Sold everything he had to buy it", "Left it alone", "Traded it for food"],
        correctAnswer: "Sold everything he had to buy it"
      },
      {
        question: "In the Parable of the Lost Sheep, how many sheep does the shepherd leave behind to find the one that is lost?",
        options: ["99", "50", "12", "None"],
        correctAnswer: "99"
      }
    ]
  },
  {
    id: "4",
    title: "Biblical Geography",
    description: "Explore the places mentioned in the Bible and their significance.",
    category: "geography",
    timeMinutes: 8,
    questions: [
      {
        question: "In which city was Jesus born?",
        options: ["Jerusalem", "Nazareth", "Bethlehem", "Jericho"],
        correctAnswer: "Bethlehem"
      },
      {
        question: "What sea did Moses part to allow the Israelites to escape Egypt?",
        options: ["Mediterranean Sea", "Dead Sea", "Sea of Galilee", "Red Sea"],
        correctAnswer: "Red Sea"
      },
      {
        question: "Where did Jesus grow up after returning from Egypt?",
        options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
        correctAnswer: "Nazareth"
      },
      {
        question: "On which mountain did Moses receive the Ten Commandments?",
        options: ["Mount Sinai", "Mount Carmel", "Mount Zion", "Mount of Olives"],
        correctAnswer: "Mount Sinai"
      },
      {
        question: "Which city's walls fell after Joshua and the Israelites marched around it for seven days?",
        options: ["Jerusalem", "Jericho", "Ai", "Nineveh"],
        correctAnswer: "Jericho"
      }
    ]
  }
];

const QuizContext = createContext<QuizContextType>({
  quizzes: [],
  getQuizById: () => undefined,
  updateQuizResults: () => {},
  addQuiz: () => {},
  deleteQuiz: () => {},
});

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // Load quizzes and user progress from localStorage on mount
  useEffect(() => {
    const storedQuizzes = localStorage.getItem('faithconnect_quizzes');
    const initialQuizzesWithProgress = storedQuizzes 
      ? JSON.parse(storedQuizzes) 
      : initialQuizzes;
    
    if (isAuthenticated && user) {
      const userProgress = localStorage.getItem(`faithconnect_quiz_progress_${user.id}`);
      
      if (userProgress) {
        const progress = JSON.parse(userProgress);
        
        // Merge quiz progress with quiz data
        const updatedQuizzes = initialQuizzesWithProgress.map((quiz: Quiz) => {
          const userQuizResult = progress.find((p: any) => p.quizId === quiz.id);
          if (userQuizResult) {
            return {
              ...quiz,
              completed: true,
              bestScore: userQuizResult.bestScore
            };
          }
          return quiz;
        });
        
        setQuizzes(updatedQuizzes);
      } else {
        setQuizzes(initialQuizzesWithProgress);
      }
    } else {
      setQuizzes(initialQuizzesWithProgress);
    }
  }, [isAuthenticated, user]);

  // Save quizzes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('faithconnect_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const getQuizById = (id: string) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const updateQuizResults = (quizId: string, score: number) => {
    if (!isAuthenticated || !user) return;
    
    // Update user progress in localStorage
    const userProgressKey = `faithconnect_quiz_progress_${user.id}`;
    const existingProgress = localStorage.getItem(userProgressKey);
    let progress = existingProgress ? JSON.parse(existingProgress) : [];
    
    const existingQuizResult = progress.find((p: any) => p.quizId === quizId);
    
    if (existingQuizResult) {
      // Update existing result if new score is better
      if (score > existingQuizResult.bestScore) {
        existingQuizResult.bestScore = score;
        existingQuizResult.completedAt = new Date().toISOString();
      }
    } else {
      // Add new result
      progress.push({
        quizId,
        bestScore: score,
        completedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(userProgressKey, JSON.stringify(progress));
    
    // Update quizzes state
    setQuizzes(prevQuizzes => 
      prevQuizzes.map(quiz => {
        if (quiz.id === quizId) {
          const bestScore = existingQuizResult 
            ? Math.max(score, existingQuizResult.bestScore) 
            : score;
          
          return {
            ...quiz,
            completed: true,
            bestScore
          };
        }
        return quiz;
      })
    );
  };

  const addQuiz = (quiz: Omit<Quiz, 'id'>) => {
    const newQuiz = {
      ...quiz,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    setQuizzes(prev => [...prev, newQuiz]);
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== id));
  };

  return (
    <QuizContext.Provider 
      value={{ 
        quizzes, 
        getQuizById, 
        updateQuizResults,
        addQuiz,
        deleteQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
