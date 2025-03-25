"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  isSameDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

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

// Sample events data
const churchEvents: CalendarEvent[] = [
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
    description:
      "Join us for our weekly Sunday worship service. Everyone is welcome to attend and participate in worship, prayer, and fellowship.",
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
    description:
      "Weekly youth group gathering with games, worship, and Bible study. Open to all teenagers in grades 7-12.",
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
    description:
      "Midweek prayer gathering where we come together to pray for our church, community, and world needs.",
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
    description:
      "Serving our community through various outreach activities including food distribution, clothing donations, and community cleanup.",
    category: "outreach",
    color: "#0EA5E9",
  },
  {
    id: 5,
    title: "Women's Bible Study",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    allDay: false,
    location: "Fellowship Hall",
    description:
      "Weekly women's Bible study focusing on the book of Psalms. All women are welcome to join for study, discussion, and fellowship.",
    category: "bible-study",
    color: "#8B5CF6",
  },
  {
    id: 6,
    title: "Men's Breakfast",
    start: new Date(new Date().setDate(new Date().getDate() + 8)),
    end: new Date(new Date().setDate(new Date().getDate() + 8)),
    allDay: false,
    location: "Church Cafeteria",
    description:
      "Monthly men's breakfast with food, fellowship, and a short devotional. Come hungry for both food and the Word!",
    category: "fellowship",
    color: "#EC4899",
  },
  {
    id: 7,
    title: "Worship Night",
    start: new Date(new Date().setDate(new Date().getDate() + 12)),
    end: new Date(new Date().setDate(new Date().getDate() + 12)),
    allDay: false,
    location: "Main Sanctuary",
    description:
      "An evening dedicated to worship through music, prayer, and meditation on Scripture. Open to all ages.",
    category: "worship",
    color: "#9b87f5",
  },
  {
    id: 8,
    title: "Church Anniversary Celebration",
    start: new Date(new Date().setDate(new Date().getDate() + 15)),
    end: new Date(new Date().setDate(new Date().getDate() + 15)),
    allDay: true,
    location: "Church Campus",
    description:
      "Join us as we celebrate another year of God's faithfulness to our church with special services, food, and activities for all ages.",
    category: "special",
    color: "#F59E0B",
  },
  {
    id: 9,
    title: "Youth Outreach",
    start: new Date(new Date().setDate(new Date().getDate() + 10)),
    end: new Date(new Date().setDate(new Date().getDate() + 10)),
    allDay: false,
    location: "Community Center",
    description:
      "Youth-led outreach event serving the local community through various service projects.",
    category: "youth",
    color: "#F97316",
  },
  {
    id: 10,
    title: "Sunday Service",
    start: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0) + 7)
    ),
    end: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0) + 7)
    ),
    allDay: true,
    location: "Main Sanctuary",
    description:
      "Join us for our weekly Sunday worship service. Everyone is welcome to attend and participate in worship, prayer, and fellowship.",
    category: "worship",
    color: "#9b87f5",
  },
  {
    id: 11,
    title: "Sunday Service",
    start: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0) + 14)
    ),
    end: new Date(
      new Date().setDate(new Date().getDate() - (new Date().getDay() - 0) + 14)
    ),
    allDay: true,
    location: "Main Sanctuary",
    description:
      "Join us for our weekly Sunday worship service. Everyone is welcome to attend and participate in worship, prayer, and fellowship.",
    category: "worship",
    color: "#9b87f5",
  },
  {
    id: 12,
    title: "Marriage Enrichment Seminar",
    start: new Date(new Date().setDate(new Date().getDate() + 20)),
    end: new Date(new Date().setDate(new Date().getDate() + 21)),
    allDay: true,
    location: "Conference Room",
    description:
      "A two-day seminar focused on strengthening marriages through biblical principles, communication exercises, and fellowship with other couples.",
    category: "special",
    color: "#F59E0B",
  },
];

// Upcoming events component
const UpcomingEvents = ({
  events,
  onEventClick,
}: {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}) => {
  const today = new Date();

  // Filter events that are today or in the future, and sort by date
  const upcomingEvents = events
    .filter((event) => event.start >= today || isSameDay(event.start, today))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5); // Show only the next 5 events

  return (
    <div className="space-y-4">
      {upcomingEvents.length === 0 ? (
        <p className="text-faith-600 text-center py-4">
          No upcoming events scheduled.
        </p>
      ) : (
        upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-faith-200 rounded-lg hover:border-faith-300 hover:bg-faith-50 transition-colors cursor-pointer"
            onClick={() => onEventClick(event)}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-faith-100 rounded-md flex flex-col items-center justify-center flex-shrink-0 border border-faith-200">
                <span className="text-xs text-faith-600">
                  {format(event.start, "MMM")}
                </span>
                <span className="text-lg font-medium text-faith-900">
                  {format(event.start, "d")}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-faith-900">{event.title}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: `${event.color}20`,
                      color: event.color,
                      borderColor: `${event.color}40`,
                    }}
                  >
                    {
                      eventCategories.find(
                        (cat) => cat.value === event.category
                      )?.label
                    }
                  </Badge>
                  {!event.allDay && (
                    <span className="text-xs text-faith-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(event.start, "h:mm a")}
                    </span>
                  )}
                  {event.location && (
                    <span className="text-xs text-faith-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default function ChurchCalendar() {
  // State for current date and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  // State for event details dialog
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  // State for category filters
  const [activeFilters, setActiveFilters] = useState<string[]>(
    eventCategories.map((cat) => cat.value)
  );
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Filter events based on active category filters
  const filteredEvents = churchEvents.filter((event) =>
    activeFilters.includes(event.category)
  );

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  // Handle month navigation
  const navigateCalendar = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      if (direction === "prev") {
        return addMonths(prevDate, -1);
      } else {
        return addMonths(prevDate, 1);
      }
    });
  };

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Select all categories
  const selectAllCategories = () => {
    setActiveFilters(eventCategories.map((cat) => cat.value));
  };

  // Clear all categories
  const clearAllCategories = () => {
    setActiveFilters([]);
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
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-faith-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/calendar-hero.jpg"
            alt="Church Calendar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-faith-950/90 to-faith-800/70" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 animate-slide-up">
              Church Calendar
            </h1>
            <p className="text-xl text-white/80 animate-fade-in animate-delay-200">
              Stay connected with all our upcoming events, services, and
              activities. Join us as we grow together in faith and community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Plan Your Visit"
            title="Upcoming Events"
            description="Browse our calendar to find worship services, Bible studies, outreach opportunities, and more."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateCalendar("prev")}
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium text-faith-900">
                        {format(currentDate, "MMMM yyyy")}
                      </h3>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateCalendar("next")}
                        aria-label="Next month"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => setIsFilterDialogOpen(true)}
                      >
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filter</span>
                      </Button>
                    </div>
                  </div>

                  <div className="h-[600px]">
                    <Calendar
                      localizer={localizer}
                      events={filteredEvents}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: "100%" }}
                      onSelectEvent={handleSelectEvent}
                      eventPropGetter={eventStyleGetter}
                      views={["month", "week", "day", "agenda"]}
                      defaultView="month"
                      date={currentDate}
                      onNavigate={(date) => setCurrentDate(date)}
                      onView={(view) => setCurrentView(view)}
                      popup
                      className="faith-calendar"
                      tooltipAccessor={null}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {eventCategories.map((category) => (
                  <div key={category.value} className="flex items-center gap-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-faith-700">
                      {category.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-medium text-faith-900 mb-6">
                    Upcoming Events
                  </h3>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <UpcomingEvents
                        events={filteredEvents}
                        onEventClick={handleSelectEvent}
                      />
                    </TabsContent>
                    <TabsContent value="weekly">
                      <div className="space-y-4">
                        <div className="p-4 border border-faith-200 rounded-lg">
                          <h4 className="font-medium text-faith-900">Sunday</h4>
                          <p className="text-sm text-faith-600 mt-1">
                            Sunday Service: 10:00 AM - 12:00 PM
                          </p>
                          <p className="text-sm text-faith-600">
                            Youth Service: 2:00 PM - 3:30 PM
                          </p>
                        </div>
                        <div className="p-4 border border-faith-200 rounded-lg">
                          <h4 className="font-medium text-faith-900">
                            Tuesday
                          </h4>
                          <p className="text-sm text-faith-600 mt-1">
                            Prayer Meeting: 6:00 PM - 7:30 PM
                          </p>
                        </div>
                        <div className="p-4 border border-faith-200 rounded-lg">
                          <h4 className="font-medium text-faith-900">
                            Wednesday
                          </h4>
                          <p className="text-sm text-faith-600 mt-1">
                            Bible Study: 7:00 PM - 8:30 PM
                          </p>
                        </div>
                        <div className="p-4 border border-faith-200 rounded-lg">
                          <h4 className="font-medium text-faith-900">Friday</h4>
                          <p className="text-sm text-faith-600 mt-1">
                            Youth Group: 6:30 PM - 8:30 PM
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-8 pt-6 border-t border-faith-100">
                    <h3 className="text-lg font-medium text-faith-900 mb-4">
                      Need More Information?
                    </h3>
                    <p className="text-faith-600 text-sm mb-4">
                      If you have questions about any of our events or would
                      like to get involved, please don't hesitate to contact us.
                    </p>

                    <Button
                      asChild
                      className="w-full bg-faith-700 hover:bg-faith-800"
                    >
                      <Link to="/contact">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>Event details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2 text-faith-600">
                  <CalendarIcon className="h-4 w-4 text-faith-700" />
                  <span>
                    {format(selectedEvent.start, "MMMM d, yyyy")}
                    {selectedEvent.allDay
                      ? " (All day)"
                      : ` • ${format(selectedEvent.start, "h:mm a")} - ${format(
                          selectedEvent.end,
                          "h:mm a"
                        )}`}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-faith-600">
                    <MapPin className="h-4 w-4 text-faith-700" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-faith-600">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: selectedEvent.color }}
                  ></div>
                  <span>
                    {eventCategories.find(
                      (cat) => cat.value === selectedEvent.category
                    )?.label || "Event"}
                  </span>
                </div>

                {selectedEvent.description && (
                  <div className="mt-4 pt-4 border-t border-faith-100">
                    <h4 className="text-sm font-medium text-faith-900 mb-2">
                      Description
                    </h4>
                    <p className="text-faith-600 text-sm whitespace-pre-line">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setIsEventDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Events</DialogTitle>
            <DialogDescription>
              Select which types of events you want to see on the calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <Button variant="outline" size="sm" onClick={selectAllCategories}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllCategories}>
                Clear All
              </Button>
            </div>
            <div className="space-y-3">
              {eventCategories.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`filter-${category.value}`}
                    checked={activeFilters.includes(category.value)}
                    onCheckedChange={() => toggleCategoryFilter(category.value)}
                  />
                  <Label
                    htmlFor={`filter-${category.value}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsFilterDialogOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </Layout>
  );
}
