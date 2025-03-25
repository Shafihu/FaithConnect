import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Calendar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  // Function to get user initials from name
  const getUserInitials = (name: string) => {
    if (!name) return "?";

    const nameParts = name.split(" ").filter((part) => part.length > 0);
    if (nameParts.length === 0) return "?";

    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Get first letter of first name and first letter of last name
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  // Generate a consistent background color based on the user's name
  const getAvatarColor = (name: string) => {
    if (!name) return "bg-faith-100";

    // Simple hash function to generate a number from a string
    const hash = name.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    // Array of tailwind color classes
    const colors = [
      "bg-red-100 text-red-800",
      "bg-orange-100 text-orange-800",
      "bg-amber-100 text-amber-800",
      "bg-yellow-100 text-yellow-800",
      "bg-lime-100 text-lime-800",
      "bg-green-100 text-green-800",
      "bg-emerald-100 text-emerald-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
      "bg-sky-100 text-sky-800",
      "bg-blue-100 text-blue-800",
      "bg-indigo-100 text-indigo-800",
      "bg-violet-100 text-violet-800",
      "bg-purple-100 text-purple-800",
      "bg-fuchsia-100 text-fuchsia-800",
      "bg-pink-100 text-pink-800",
      "bg-rose-100 text-rose-800",
    ];

    // Use the hash to select a color
    return colors[hash % colors.length];
  };

  const handleDeleteAccount = () => {
    toast({
      title: "This is a demo feature",
      description:
        "Account deletion would be implemented here in a real application.",
    });
  };

  const initials = getUserInitials(user.name);
  const avatarColorClass = getAvatarColor(user.name);

  // Wrap in ProtectedRoute to ensure only authenticated users can access
  return (
    <ProtectedRoute>
      <Layout>
        <div className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <SectionHeading
              subtitle="Account Settings"
              title="Your Profile"
              description="Manage your account settings and preferences"
            />

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={user.profileImage}
                        alt={user.name}
                        style={{ objectFit: "cover" }}
                      />
                      <AvatarFallback className={avatarColorClass}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl font-serif">
                        {user?.name}
                      </CardTitle>
                      <CardDescription>{user?.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-8"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Name</p>
                        <p className="text-faith-700">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <p className="text-faith-700">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Member Since</p>
                        <p className="text-faith-700">January 2023</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Edit Profile</Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Track your growth and engagement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg border border-faith-100">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <h4 className="text-faith-900 font-medium">
                              Completed Bible Study
                            </h4>
                            <p className="text-faith-600 text-sm">
                              Gospel of John - Chapter 3
                            </p>
                            <p className="text-faith-500 text-xs mt-1">
                              2 days ago
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg border border-faith-100">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-amber-700" />
                          </div>
                          <div>
                            <h4 className="text-faith-900 font-medium">
                              Registered for Event
                            </h4>
                            <p className="text-faith-600 text-sm">
                              Community Prayer Breakfast
                            </p>
                            <p className="text-faith-500 text-xs mt-1">
                              1 week ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how we contact you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-faith-600 mb-6">
                        This is a demo feature. In a real application, you would
                        be able to manage your notification preferences here.
                      </p>
                      <Button>Update Preferences</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="border-faith-300 hover:border-faith-400"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
