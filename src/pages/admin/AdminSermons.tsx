
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

// Sample sermon data
const sermons = [
  {
    id: 1,
    title: "Finding Peace in Troubled Times",
    speaker: "Pastor James Wilson",
    date: "July 30, 2023",
    series: "Peace That Passes Understanding",
    duration: "45 min",
  },
  {
    id: 2,
    title: "The Power of Prayer",
    speaker: "Pastor Sarah Johnson",
    date: "July 23, 2023",
    series: "Prayer Warriors",
    duration: "38 min",
  },
  {
    id: 3,
    title: "Walking in Faith",
    speaker: "Pastor James Wilson",
    date: "July 16, 2023",
    series: "Faith Journey",
    duration: "42 min",
  },
];

export default function AdminSermons() {
  const [isAddSermonOpen, setIsAddSermonOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSermons = sermons.filter(sermon =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.series.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Dialog open={isAddSermonOpen} onOpenChange={setIsAddSermonOpen}>
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
                <Label htmlFor="title">Sermon Title</Label>
                <Input id="title" placeholder="Enter sermon title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="speaker">Speaker</Label>
                  <Input id="speaker" placeholder="Pastor's name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="series">Series</Label>
                  <Input id="series" placeholder="Sermon series" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 45 min" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="scripture">Scripture Reference</Label>
                <Input id="scripture" placeholder="e.g., John 3:16" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter sermon description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input id="videoUrl" placeholder="YouTube or Vimeo link" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="Enter image URL" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddSermonOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddSermonOpen(false)}>
                Save Sermon
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
                <TableHead>Speaker</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Series</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSermons.map((sermon) => (
                <TableRow key={sermon.id}>
                  <TableCell className="font-medium">{sermon.title}</TableCell>
                  <TableCell>{sermon.speaker}</TableCell>
                  <TableCell>{sermon.date}</TableCell>
                  <TableCell>{sermon.series}</TableCell>
                  <TableCell>{sermon.duration}</TableCell>
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
