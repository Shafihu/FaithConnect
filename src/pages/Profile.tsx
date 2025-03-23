
import { useState } from 'react';
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Calendar, User } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  const handleDeleteAccount = () => {
    toast({
      title: "This is a demo feature",
      description: "Account deletion would be implemented here in a real application.",
    });
  };

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
                    <div className="h-16 w-16 rounded-full bg-faith-100 flex items-center justify-center">
                      <User className="h-8 w-8 text-faith-700" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-serif">{user?.name}</CardTitle>
                      <CardDescription>{user?.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
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
                      <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Track your growth and engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg border border-faith-100">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <h4 className="text-faith-900 font-medium">Completed Bible Study</h4>
                            <p className="text-faith-600 text-sm">Gospel of John - Chapter 3</p>
                            <p className="text-faith-500 text-xs mt-1">2 days ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 rounded-lg border border-faith-100">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-amber-700" />
                          </div>
                          <div>
                            <h4 className="text-faith-900 font-medium">Registered for Event</h4>
                            <p className="text-faith-600 text-sm">Community Prayer Breakfast</p>
                            <p className="text-faith-500 text-xs mt-1">1 week ago</p>
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
                      <CardDescription>Manage how we contact you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-faith-600 mb-6">This is a demo feature. In a real application, you would be able to manage your notification preferences here.</p>
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
