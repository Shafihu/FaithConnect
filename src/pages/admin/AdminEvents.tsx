
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample event data
const events = [
  {
    id: 1,
    title: "Prayer & Worship Night",
    date: "August 5, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    category: "Worship",
  },
  {
    id: 2,
    title: "Youth Summer Retreat",
    date: "August 12-14, 2023",
    time: "Departs 9:00 AM",
    location: "Mountain View Camp",
    category: "Youth",
  },
  {
    id: 3,
    title: "Community Outreach Day",
    date: "August 20, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "City Park",
    category: "Outreach",
  },
];

export default function AdminEvents() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Events">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Fill in the details for the new event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter event location" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Worship, Youth, Outreach" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter event description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="Enter image URL" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddEventOpen(false)}>
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
