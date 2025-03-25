
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  {
    title: "Total Events",
    value: "12",
    description: "Active events",
    icon: Calendar,
    change: "+3 this month",
    color: "text-blue-500",
  },
  {
    title: "Sermons",
    value: "45",
    description: "Published sermons",
    icon: BookOpen,
    change: "+5 this month",
    color: "text-indigo-500",
  },
  {
    title: "Community Posts",
    value: "235",
    description: "User posts",
    icon: MessageSquare,
    change: "+28 this month",
    color: "text-green-500",
  },
  {
    title: "Members",
    value: "1,203",
    description: "Registered users",
    icon: Users,
    change: "+12 this month",
    color: "text-orange-500",
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={cn("h-5 w-5", card.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
              <div className="mt-2 text-xs font-medium text-green-600">{card.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0">
                  <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-semibold">{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {i % 3 === 0 ? "New sermon added" 
                      : i % 2 === 0 ? "New event created" 
                      : "New community post"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(Date.now() - i * 86400000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2 items-center justify-center" 
                asChild
              >
                <Link to="/admin/events">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Add Event</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2 items-center justify-center" 
                asChild
              >
                <Link to="/admin/sermons">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Add Sermon</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2 items-center justify-center" 
                asChild
              >
                <Link to="/admin/posts">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Manage Posts</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2 items-center justify-center"
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">View Members</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
