
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
import { Search, Eye, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePosts } from "@/context/PostContext";
import { Link } from "react-router-dom";

export default function AdminPosts() {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.author?.name && post.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Truncate content to a specific length
  const truncateContent = (content: string, maxLength = 70) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <AdminLayout title="Manage Community Posts">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No posts found. Try a different search term.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-md">
                      {truncateContent(post.content)}
                    </TableCell>
                    <TableCell>
                      {post.isAnonymous ? (
                        <span className="text-gray-500">Anonymous</span>
                      ) : (
                        post.author?.name
                      )}
                    </TableCell>
                    <TableCell>{formatDate(post.createdAt)}</TableCell>
                    <TableCell>
                      {post.isAnonymous ? (
                        <Badge variant="outline" className="bg-gray-100">Anonymous</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-faith-50 text-faith-700">Named</Badge>
                      )}
                    </TableCell>
                    <TableCell>{post.likes}</TableCell>
                    <TableCell>{post.comments.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/posts/${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
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
