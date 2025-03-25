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

// Define the Sermon interface
interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  series: string;
  duration: string;
  scripture?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  topics?: string[];
}

// Sample sermon data
const initialSermons: Sermon[] = [
  {
    id: 1,
    title: "Finding Peace in Troubled Times",
    speaker: "Pastor James Wilson",
    date: "2023-07-30",
    series: "Peace That Passes Understanding",
    duration: "45 min",
    scripture: "Philippians 4:6-7",
    description:
      "In this sermon, Pastor James explores how we can find true peace even in the midst of life's most challenging circumstances.",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    imageUrl: "/images/sermons/peace.jpg",
    topics: ["peace", "anxiety", "faith"],
  },
  {
    id: 2,
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Boampong",
    date: "2023-07-23",
    series: "Prayer Warriors",
    duration: "38 min",
    scripture: "James 5:13-16",
    description:
      "Pastor Sarah shares biblical principles for effective prayer and how it can transform our lives and circumstances.",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    imageUrl: "/images/sermons/prayer.jpg",
    topics: ["prayer", "spiritual disciplines", "faith"],
  },
  {
    id: 3,
    title: "Walking in Faith",
    speaker: "Pastor James Wilson",
    date: "2023-07-16",
    series: "Faith Journey",
    duration: "42 min",
    scripture: "Hebrews 11:1-6",
    description:
      "This message explores what it means to live by faith in today's world and how to trust God even when the path ahead seems uncertain.",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    imageUrl: "/images/sermons/faith.jpg",
    topics: ["faith", "trust", "obedience"],
  },
];

export default function AdminSermons() {
  // State for sermons
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [searchQuery, setSearchQuery] = useState("");

  // State for dialogs
  const [isAddSermonOpen, setIsAddSermonOpen] = useState(false);
  const [isEditSermonOpen, setIsEditSermonOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState<
    Omit<Sermon, "id" | "topics"> & { topics: string }
  >({
    title: "",
    speaker: "",
    date: "",
    series: "",
    duration: "",
    scripture: "",
    description: "",
    videoUrl: "",
    imageUrl: "",
    topics: "",
  });

  // State for current sermon being edited or deleted
  const [currentSermonId, setCurrentSermonId] = useState<number | null>(null);

  // Filter sermons based on search query
  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.series.toLowerCase().includes(searchQuery.toLowerCase())
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
      speaker: "",
      date: "",
      series: "",
      duration: "",
      scripture: "",
      description: "",
      videoUrl: "",
      imageUrl: "",
      topics: "",
    });
    setCurrentSermonId(null);
  };

  // Open edit dialog with pre-filled data
  const handleEditClick = (sermon: Sermon) => {
    setFormData({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      series: sermon.series,
      duration: sermon.duration,
      scripture: sermon.scripture || "",
      description: sermon.description || "",
      videoUrl: sermon.videoUrl || "",
      imageUrl: sermon.imageUrl || "",
      topics: sermon.topics ? sermon.topics.join(", ") : "",
    });
    setCurrentSermonId(sermon.id);
    setIsEditSermonOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (sermonId: number) => {
    setCurrentSermonId(sermonId);
    setIsDeleteDialogOpen(true);
  };

  // Add new sermon
  const handleAddSermon = () => {
    // Validate required fields
    if (
      !formData.title ||
      !formData.speaker ||
      !formData.date ||
      !formData.series
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(0, ...sermons.map((s) => s.id)) + 1;

    // Process topics from comma-separated string to array
    const topicsArray = formData.topics
      ? formData.topics
          .split(",")
          .map((topic) => topic.trim())
          .filter((topic) => topic !== "")
      : undefined;

    // Create new sermon
    const newSermon: Sermon = {
      id: newId,
      ...formData,
      topics: topicsArray,
    };

    // Add to sermons array
    setSermons((prev) => [...prev, newSermon]);

    // Close dialog and reset form
    setIsAddSermonOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Sermon Added",
      description: `"${formData.title}" has been added successfully.`,
    });
  };

  // Update existing sermon
  const handleUpdateSermon = () => {
    // Validate required fields
    if (
      !formData.title ||
      !formData.speaker ||
      !formData.date ||
      !formData.series
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (currentSermonId === null) return;

    // Process topics from comma-separated string to array
    const topicsArray = formData.topics
      ? formData.topics
          .split(",")
          .map((topic) => topic.trim())
          .filter((topic) => topic !== "")
      : undefined;

    // Update sermons array
    setSermons((prev) =>
      prev.map((sermon) =>
        sermon.id === currentSermonId
          ? { ...sermon, ...formData, topics: topicsArray }
          : sermon
      )
    );

    // Close dialog and reset form
    setIsEditSermonOpen(false);
    resetFormData();

    // Show success toast
    toast({
      title: "Sermon Updated",
      description: `"${formData.title}" has been updated successfully.`,
    });
  };

  // Delete sermon
  const handleDeleteSermon = () => {
    if (currentSermonId === null) return;

    // Get sermon title for toast message
    const sermonTitle =
      sermons.find((s) => s.id === currentSermonId)?.title || "Sermon";

    // Remove from sermons array
    setSermons((prev) =>
      prev.filter((sermon) => sermon.id !== currentSermonId)
    );

    // Close dialog and reset current sermon
    setIsDeleteDialogOpen(false);
    setCurrentSermonId(null);

    // Show success toast
    toast({
      title: "Sermon Deleted",
      description: `"${sermonTitle}" has been deleted successfully.`,
    });
  };

  // Close dialogs and reset form
  const handleDialogClose = () => {
    resetFormData();
  };

  return (
    <AdminLayout title="Manage Sermons">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search sermons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog
          open={isAddSermonOpen}
          onOpenChange={(open) => {
            setIsAddSermonOpen(open);
            if (!open) handleDialogClose();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Sermon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Sermon</DialogTitle>
              <DialogDescription>
                Fill in the details for the new sermon.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Sermon Title*</Label>
                <Input
                  id="title"
                  placeholder="Enter sermon title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="speaker">Speaker*</Label>
                  <Input
                    id="speaker"
                    placeholder="Pastor's name"
                    value={formData.speaker}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="series">Series*</Label>
                  <Input
                    id="series"
                    placeholder="Sermon series"
                    value={formData.series}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration*</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 45 min"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scripture">Scripture Reference</Label>
                <Input
                  id="scripture"
                  placeholder="e.g., John 3:16"
                  value={formData.scripture}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter sermon description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="YouTube or Vimeo link"
                  value={formData.videoUrl}
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
              <div className="grid gap-2">
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  placeholder="e.g., faith, prayer, hope"
                  value={formData.topics}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddSermonOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSermon}>Save Sermon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Sermon Dialog */}
        <Dialog
          open={isEditSermonOpen}
          onOpenChange={(open) => {
            setIsEditSermonOpen(open);
            if (!open) handleDialogClose();
          }}
        >
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Sermon</DialogTitle>
              <DialogDescription>
                Update the details for this sermon.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Sermon Title*</Label>
                <Input
                  id="title"
                  placeholder="Enter sermon title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="speaker">Speaker*</Label>
                  <Input
                    id="speaker"
                    placeholder="Pastor's name"
                    value={formData.speaker}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="series">Series*</Label>
                  <Input
                    id="series"
                    placeholder="Sermon series"
                    value={formData.series}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration*</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 45 min"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scripture">Scripture Reference</Label>
                <Input
                  id="scripture"
                  placeholder="e.g., John 3:16"
                  value={formData.scripture}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter sermon description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="YouTube or Vimeo link"
                  value={formData.videoUrl}
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
              <div className="grid gap-2">
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  placeholder="e.g., faith, prayer, hope"
                  value={formData.topics}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditSermonOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateSermon}>Update Sermon</Button>
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
                Are you sure you want to delete this sermon? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSermon}
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
                <TableHead>Speaker</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Series</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSermons.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No sermons found. Try a different search or add a new
                    sermon.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSermons.map((sermon) => (
                  <TableRow key={sermon.id}>
                    <TableCell className="font-medium">
                      {sermon.title}
                    </TableCell>
                    <TableCell>{sermon.speaker}</TableCell>
                    <TableCell>
                      {new Date(sermon.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{sermon.series}</TableCell>
                    <TableCell>{sermon.duration}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(sermon)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(sermon.id)}
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
