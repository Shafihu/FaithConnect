"use client";

import type React from "react";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, CalendarIcon, MapPin, AlertTriangle } from "lucide-react";

// Setup localizer for react-big-calendar
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define the CalendarEvent interface
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;
  description?: string;
  category: string;
  color?: string;
}

// Event categories with colors
const eventCategories = [
  { value: "worship", label: "Worship", color: "#9b87f5" },
  { value: "youth", label: "Youth", color: "#F97316" },
  { value: "outreach", label: "Outreach", color: "#0EA5E9" },
  { value: "prayer", label: "Prayer", color: "#10B981" },
  { value: "fellowship", label: "Fellowship", color: "#EC4899" },
  { value: "bible-study", label: "Bible Study", color: "#8B5CF6" },
  { value: "special", label: "Special Event", color: "#F59E0B" },
];

// Sample initial events
const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Sunday Service",
    start: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0))
    ),
    end: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0) + 2)
    ),
    allDay: true,
    location: "Main Sanctuary",
    description: "Regular Sunday worship service",
    category: "worship",
    color: "#9b87f5",
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    start: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 3))
    ),
    end: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 3))
    ),
    allDay: false,
    location: "Youth Center",
    description: "Weekly youth group gathering with games and Bible study",
    category: "youth",
    color: "#F97316",
  },
  {
    id: 3,
    title: "Prayer Meeting",
    start: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 2))
    ),
    end: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 2))
    ),
    allDay: false,
    location: "Prayer Room",
    description: "Midweek prayer gathering",
    category: "prayer",
    color: "#10B981",
  },
  {
    id: 4,
    title: "Community Outreach",
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
    allDay: true,
    location: "City Park",
    description: "Serving our community through various outreach activities",
    category: "outreach",
    color: "#0EA5E9",
  },
];

export default function AdminCalendar() {
  // State for events
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  // State for dialogs
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);

  // State for selected date/slot
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  // State for current event being viewed, edited or deleted
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
    allDay: false,
    location: "",
    description: "",
    category: "worship",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle select input changes
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: "",
      start: "",
      startTime: "",
      end: "",
      endTime: "",
      allDay: false,
      location: "",
      description: "",
      category: "worship",
    });
    setCurrentEvent(null);
    setSelectedSlot(null);
  };

  // Handle slot selection (for adding new event)
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });

    // Pre-fill form with selected date/time
    setFormData({
      title: "",
      start: format(start, "yyyy-MM-dd"),
      startTime: format(start, "HH:mm"),
      end: format(end, "yyyy-MM-dd"),
      endTime: format(end, "HH:mm"),
      allDay: false,
      location: "",
      description: "",
      category: "worship",
    });

    setIsAddEventOpen(true);
  };

  // Handle event selection (for viewing/editing)
  const handleSelectEvent = (event: CalendarEvent) => {
    setCurrentEvent(event);

    // Format dates for form inputs
    const startDate = format(event.start, "yyyy-MM-dd");
    const startTime = format(event.start, "HH:mm");
    const endDate = format(event.end, "yyyy-MM-dd");
    const endTime = format(event.end, "HH:mm");

    setFormData({
      title: event.title,
      start: startDate,
      startTime: startTime,
      end: endDate,
      endTime: endTime,
      allDay: event.allDay || false,
      location: event.location || "",
      description: event.description || "",
      category: event.category,
    });

    setIsViewEventOpen(true);
  };

  // Open edit dialog
  const handleEditEvent = () => {
    setIsViewEventOpen(false);
    setIsEditEventOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeletePrompt = () => {
    setIsViewEventOpen(false);
    setIsDeleteDialogOpen(true);
  };

  // Add new event
  const handleAddEvent = () => {
    // Validate required fields
    if (!formData.title || !formData.start) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Parse dates
    const startDate = parse(
      `${formData.start} ${formData.allDay ? "00:00" : formData.startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const endDate = parse(
      `${formData.end || formData.start} ${
        formData.allDay ? "23:59" : formData.endTime || formData.startTime
      }`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );

    // Get color for category
    const categoryColor =
      eventCategories.find((cat) => cat.value === formData.category)?.color ||
      "#9b87f5";

    // Generate a new ID
    const newId = Math.max(0, ...events.map((e) => e.id)) + 1;

    // Create new event
    const newEvent: CalendarEvent = {
      id: newId,
      title: formData.title,
      start: startDate,
      end: endDate,
      allDay: formData.allDay,
      location: formData.location,
      description: formData.description,
      category: formData.category,
      color: categoryColor,
    };

    // Add to events array
    setEvents((prev) => [...prev, newEvent]);

    // Close dialog and reset form
    setIsAddEventOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Event Added",
      description: `"${formData.title}" has been added to the calendar.`,
    });
  };

  // Update existing event
  const handleUpdateEvent = () => {
    // Validate required fields
    if (!formData.title || !formData.start) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!currentEvent) return;

    // Parse dates
    const startDate = parse(
      `${formData.start} ${formData.allDay ? "00:00" : formData.startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const endDate = parse(
      `${formData.end || formData.start} ${
        formData.allDay ? "23:59" : formData.endTime || formData.startTime
      }`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );

    // Get color for category
    const categoryColor =
      eventCategories.find((cat) => cat.value === formData.category)?.color ||
      "#9b87f5";

    // Update events array
    setEvents((prev) =>
      prev.map((event) =>
        event.id === currentEvent.id
          ? {
              ...event,
              title: formData.title,
              start: startDate,
              end: endDate,
              allDay: formData.allDay,
              location: formData.location,
              description: formData.description,
              category: formData.category,
              color: categoryColor,
            }
          : event
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
    if (!currentEvent) return;

    // Remove from events array
    setEvents((prev) => prev.filter((event) => event.id !== currentEvent.id));

    // Close dialog and reset current event
    setIsDeleteDialogOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Event Deleted",
      description: `"${currentEvent.title}" has been removed from the calendar.`,
    });
  };

  // Custom event styling
  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || "#9b87f5",
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        fontWeight: 500,
      },
    };
  };

  // Import CSS for react-big-calendar
  useEffect(() => {
    import("react-big-calendar/lib/css/react-big-calendar.css");
  }, []);

  return (
    <AdminLayout title="Calendar Management">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-faith-900">Event Calendar</h2>
        <Button
          onClick={() => {
            resetFormData();
            setIsAddEventOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="h-[700px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              views={["month", "week", "day", "agenda"]}
              defaultView="month"
              popup
              className="faith-calendar"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog
        open={isAddEventOpen}
        onOpenChange={(open) => {
          setIsAddEventOpen(open);
          if (!open) resetFormData();
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the details for the new calendar event.
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allDay"
                checked={formData.allDay}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <Label htmlFor="allDay" className="text-sm font-normal">
                All-day event
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start Date*</Label>
                <Input
                  id="start"
                  type="date"
                  value={formData.start}
                  onChange={handleInputChange}
                />
              </div>
              {!formData.allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time*</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="end">End Date*</Label>
                <Input
                  id="end"
                  type="date"
                  value={formData.end}
                  onChange={handleInputChange}
                />
              </div>
              {!formData.allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time*</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange(value, "category")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter event location"
                value={formData.location}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add to Calendar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog
        open={isViewEventOpen}
        onOpenChange={(open) => {
          setIsViewEventOpen(open);
          if (!open) resetFormData();
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{currentEvent?.title}</DialogTitle>
            <DialogDescription>Event details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-faith-600">
              <CalendarIcon className="h-4 w-4 text-faith-700" />
              <span>
                {currentEvent && format(currentEvent.start, "MMMM d, yyyy")}
                {currentEvent?.allDay
                  ? " (All day)"
                  : ` • ${format(
                      currentEvent?.start || new Date(),
                      "h:mm a"
                    )} - ${format(currentEvent?.end || new Date(), "h:mm a")}`}
              </span>
            </div>

            {currentEvent?.location && (
              <div className="flex items-center gap-2 text-faith-600">
                <MapPin className="h-4 w-4 text-faith-700" />
                <span>{currentEvent.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-faith-600">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: currentEvent?.color }}
              ></div>
              <span>
                {eventCategories.find(
                  (cat) => cat.value === currentEvent?.category
                )?.label || "Event"}
              </span>
            </div>

            {currentEvent?.description && (
              <div className="mt-4 pt-4 border-t border-faith-100">
                <h4 className="text-sm font-medium text-faith-900 mb-2">
                  Description
                </h4>
                <p className="text-faith-600 text-sm whitespace-pre-line">
                  {currentEvent.description}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-destructive border-destructive hover:bg-destructive/10"
                onClick={handleDeletePrompt}
              >
                Delete
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsViewEventOpen(false)}
              >
                Close
              </Button>
              <Button onClick={handleEditEvent}>Edit</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog
        open={isEditEventOpen}
        onOpenChange={(open) => {
          setIsEditEventOpen(open);
          if (!open) resetFormData();
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the details for this calendar event.
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allDay"
                checked={formData.allDay}
                onChange={handleInputChange}
                className="h-4 w-4"
              />
              <Label htmlFor="allDay" className="text-sm font-normal">
                All-day event
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start Date*</Label>
                <Input
                  id="start"
                  type="date"
                  value={formData.start}
                  onChange={handleInputChange}
                />
              </div>
              {!formData.allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time*</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="end">End Date*</Label>
                <Input
                  id="end"
                  type="date"
                  value={formData.end}
                  onChange={handleInputChange}
                />
              </div>
              {!formData.allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time*</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange(value, "category")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter event location"
                value={formData.location}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditEventOpen(false)}>
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
              Are you sure you want to delete "{currentEvent?.title}"? This
              action cannot be undone.
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

      {/* Custom CSS for calendar styling */}
      <style>{`
        .faith-calendar {
          font-family: var(--font-sans);
        }
        
        .faith-calendar .rbc-toolbar {
          margin-bottom: 1.5rem;
        }
        
        .faith-calendar .rbc-toolbar button {
          color: var(--faith-700);
          border-color: var(--faith-200);
        }
        
        .faith-calendar .rbc-toolbar button:hover {
          background-color: var(--faith-50);
          color: var(--faith-900);
        }
        
        .faith-calendar .rbc-toolbar button.rbc-active {
          background-color: var(--faith-700);
          color: white;
        }
        
        .faith-calendar .rbc-toolbar button.rbc-active:hover {
          background-color: var(--faith-800);
          color: white;
        }
        
        .faith-calendar .rbc-header {
          padding: 0.75rem 0;
          font-weight: 500;
          color: var(--faith-900);
          border-bottom: 1px solid var(--faith-200);
        }
        
        .faith-calendar .rbc-month-view {
          border-color: var(--faith-200);
        }
        
        .faith-calendar .rbc-day-bg {
          background-color: white;
        }
        
        .faith-calendar .rbc-day-bg.rbc-today {
          background-color: var(--faith-50);
        }
        
        .faith-calendar .rbc-off-range-bg {
          background-color: var(--faith-50);
        }
        
        .faith-calendar .rbc-date-cell {
          padding: 0.25rem 0.5rem;
          text-align: right;
          color: var(--faith-700);
        }
        
        .faith-calendar .rbc-date-cell.rbc-now {
          font-weight: 600;
          color: var(--faith-900);
        }
        
        .faith-calendar .rbc-event {
          border-radius: 4px;
          padding: 2px 5px;
          font-size: 0.875rem;
        }
        
        .faith-calendar .rbc-show-more {
          color: var(--faith-700);
          font-weight: 500;
        }
        
        .faith-calendar .rbc-agenda-view table.rbc-agenda-table {
          border-color: var(--faith-200);
        }
        
        .faith-calendar .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
          border-bottom: 1px solid var(--faith-200);
          color: var(--faith-900);
        }
        
        .faith-calendar .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
          border-bottom: 1px solid var(--faith-100);
        }
        
        .faith-calendar .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
          border-left: 1px solid var(--faith-100);
        }
      `}</style>
    </AdminLayout>
  );
}
