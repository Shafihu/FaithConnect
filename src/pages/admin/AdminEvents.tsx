"use client";

import type React from "react";

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
import { Plus, Search, Edit, Trash, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the Event interface
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description?: string;
  imageUrl?: string;
}

// Sample event data
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Prayer & Worship Night",
    date: "2023-08-05",
    time: "19:00",
    location: "Main Sanctuary",
    category: "Worship",
    description:
      "Join us for a night of prayer and worship as we seek God's presence together.",
    imageUrl: "/images/events/worship-night.jpg",
  },
  {
    id: 2,
    title: "Youth Summer Retreat",
    date: "2023-08-12",
    time: "09:00",
    location: "Mountain View Camp",
    category: "Youth",
    description:
      "A three-day retreat for youth to grow in faith and build lasting friendships.",
    imageUrl: "/images/events/youth-retreat.jpg",
  },
  {
    id: 3,
    title: "Community Outreach Day",
    date: "2023-08-20",
    time: "10:00",
    location: "City Park",
    category: "Outreach",
    description:
      "Serving our community through various outreach activities and sharing God's love.",
    imageUrl: "/images/events/outreach.jpg",
  },
];

export default function AdminEvents() {
  // State for events
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");

  // State for dialogs
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  // State for current event being edited or deleted
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
      imageUrl: "",
    });
    setCurrentEventId(null);
  };

  // Open edit dialog with pre-filled data
  const handleEditClick = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description || "",
      imageUrl: event.imageUrl || "",
    });
    setCurrentEventId(event.id);
    setIsEditEventOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (eventId: number) => {
    setCurrentEventId(eventId);
    setIsDeleteDialogOpen(true);
  };

  // Add new event
  const handleAddEvent = () => {
    // Validate required fields
    if (
      !formData.title ||
      !formData.date ||
      !formData.location ||
      !formData.category
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(0, ...events.map((e) => e.id)) + 1;

    // Create new event
    const newEvent: Event = {
      id: newId,
      ...formData,
    };

    // Add to events array
    setEvents((prev) => [...prev, newEvent]);

    // Close dialog and reset form
    setIsAddEventOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Event Added",
      description: `"${formData.title}" has been added successfully.`,
    });
  };

  // Update existing event
  const handleUpdateEvent = () => {
    // Validate required fields
    if (
      !formData.title ||
      !formData.date ||
      !formData.location ||
      !formData.category
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (currentEventId === null) return;

    // Update events array
    setEvents((prev) =>
      prev.map((event) =>
        event.id === currentEventId ? { ...event, ...formData } : event
      )
    );

    // Close dialog and reset form
    setIsEditEventOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Event Updated",
      description: `"${formData.title}" has been updated successfully.`,
    });
  };

  // Delete event
  const handleDeleteEvent = () => {
    if (currentEventId === null) return;

    // Get event title for toast message
    const eventTitle =
      events.find((e) => e.id === currentEventId)?.title || "Event";

    // Remove from events array
    setEvents((prev) => prev.filter((event) => event.id !== currentEventId));

    // Close dialog and reset current event
    setIsDeleteDialogOpen(false);
    setCurrentEventId(null);

    // Show success toast
    toast({
      title: "Event Deleted",
      description: `"${eventTitle}" has been deleted successfully.`,
    });
  };

  // Close dialogs and reset form
  const handleDialogClose = () => {
    resetFormData();
  };

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
        <Dialog
          open={isAddEventOpen}
          onOpenChange={(open) => {
            setIsAddEventOpen(open);
            if (!open) handleDialogClose();
          }}
        >
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
                <Label htmlFor="title">Event Title*</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time*</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category*</Label>
                <Input
                  id="category"
                  placeholder="e.g., Worship, Youth, Outreach"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddEventOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Save Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog
          open={isEditEventOpen}
          onOpenChange={(open) => {
            setIsEditEventOpen(open);
            if (!open) handleDialogClose();
          }}
        >
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Update the details for this event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title*</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time*</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category*</Label>
                <Input
                  id="category"
                  placeholder="e.g., Worship, Youth, Outreach"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditEventOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateEvent}>Update Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteEvent}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No events found. Try a different search or add a new event.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      {new Date(event.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{event.time.substring(0, 5)}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(event.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
