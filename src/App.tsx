import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext";
import { QuizProvider } from "@/context/QuizContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Sermons from "./pages/Sermons";
import SermonDetail from "./pages/SermonDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Growth from "./pages/Growth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Quizzes from "./pages/Quizzes";
import QuizDetail from "./pages/QuizDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSermons from "./pages/admin/AdminSermons";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminCalendar from "./pages/admin/AdminCalendar";
import ChurchCalendar from "./pages/Calendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PostProvider>
        <QuizProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="/sermons/:id" element={<SermonDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/growth" element={<Growth />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/quizzes/:id" element={<QuizDetail />} />
                <Route path="/calendar" element={<ChurchCalendar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <AdminRoute>
                      <AdminEvents />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/sermons"
                  element={
                    <AdminRoute>
                      <AdminSermons />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/posts"
                  element={
                    <AdminRoute>
                      <AdminPosts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/quizzes"
                  element={
                    <AdminRoute>
                      <AdminQuizzes />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/calendar"
                  element={
                    <AdminRoute>
                      <AdminCalendar />
                    </AdminRoute>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QuizProvider>
      </PostProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
