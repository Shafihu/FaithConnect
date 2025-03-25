
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QuizList from "@/components/quiz/QuizList";
import { ArrowRight } from "lucide-react";

export default function Quizzes() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Test Your Knowledge"
            title="Bible Quizzes"
            description="Challenge yourself with quizzes created by our pastors to help deepen your understanding of the Bible and Christian teachings."
          />
          
          {!isAuthenticated && (
            <div className="mt-8 p-6 rounded-lg bg-faith-50 border border-faith-100 text-center">
              <h3 className="text-xl font-medium mb-2">Join our community to track your progress</h3>
              <p className="text-faith-600 mb-4">Create an account to save your quiz results and track your learning journey.</p>
              <Button asChild className="bg-faith-700 hover:bg-faith-800">
                <Link to="/signup">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
          
          <QuizList />
        </div>
      </div>
    </Layout>
  );
}
