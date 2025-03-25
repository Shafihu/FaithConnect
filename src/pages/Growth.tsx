import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BibleStudies from "@/components/growth/BibleStudies";
import DevotionalResources from "@/components/growth/DevotionalResources";
import MentorshipPrograms from "@/components/growth/MentorshipPrograms";
import GrowthTrackCard from "@/components/growth/GrowthTrackCard";
import GrowthMetrics from "@/components/growth/GrowthMetrics";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Heart, ScrollText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const growthTracks = [
  {
    id: "foundations",
    title: "Foundations of Faith",
    description:
      "Build a solid foundation for your faith journey with essential Christian teachings.",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700",
    completionRate: 65,
  },
  {
    id: "community",
    title: "Community Life",
    description:
      "Learn how to build meaningful relationships and serve within the church community.",
    icon: Users,
    color: "bg-green-100 text-green-700",
    completionRate: 42,
  },
  {
    id: "spiritual-disciplines",
    title: "Spiritual Disciplines",
    description:
      "Develop practices like prayer, fasting, and meditation to strengthen your relationship with God.",
    icon: Heart,
    color: "bg-purple-100 text-purple-700",
    completionRate: 28,
  },
  {
    id: "leadership",
    title: "Leadership Development",
    description:
      "Discover and develop your leadership skills to serve others effectively.",
    icon: ScrollText,
    color: "bg-blue-100 text-blue-700",
    completionRate: 15,
  },
];

export default function Growth() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Spiritual Growth"
            title="Grow in Faith"
            description="Explore resources and opportunities designed to help you grow in your faith journey and deepen your relationship with God."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {growthTracks.map((track) => (
              <GrowthTrackCard key={track.id} track={track} />
            ))}
          </div>

          {!isAuthenticated && (
            <Card className="mt-16 bg-faith-50 border border-faith-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-medium text-faith-900">
                      Ready to start your growth journey?
                    </h3>
                    <p className="text-faith-600">
                      Create an account to track your progress and access
                      exclusive resources.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-faith-700 hover:bg-faith-800 min-w-32"
                  >
                    <Link to="/signup">
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isAuthenticated && (
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-serif font-medium text-faith-900 mb-2">
                Welcome back, {user?.name}!
              </h3>
              <p className="text-faith-600 mb-6">
                Continue your spiritual growth journey from where you left off.
              </p>
            </div>
          )}

          <div className="mt-16">
            <GrowthMetrics />
          </div>

          <Tabs defaultValue="bible-studies" className="mt-16">
            <TabsList className="w-full flex justify-center bg-faith-50 p-1">
              <TabsTrigger value="bible-studies" className="flex-1 max-w-xs">
                Bible Studies
              </TabsTrigger>
              <TabsTrigger value="devotionals" className="flex-1 max-w-xs">
                Devotional Resources
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="flex-1 max-w-xs">
                Mentorship Programs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bible-studies" className="mt-6">
              <BibleStudies />
            </TabsContent>

            <TabsContent value="devotionals" className="mt-6">
              <DevotionalResources />
            </TabsContent>

            <TabsContent value="mentorship" className="mt-6">
              <MentorshipPrograms />
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <p className="text-faith-600 mb-4">
              Looking for more ways to grow?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="border-faith-300">
                <Link to="/sermons">Explore Sermons</Link>
              </Button>
              <Button asChild variant="outline" className="border-faith-300">
                <Link to="/events">Join an Event</Link>
              </Button>
              <Button asChild variant="outline" className="border-faith-300">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
