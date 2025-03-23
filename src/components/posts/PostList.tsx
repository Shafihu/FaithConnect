
import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '@/context/PostContext';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, User } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface PostListProps {
  filter: 'all' | 'anonymous' | 'named';
}

export default function PostList({ filter }: PostListProps) {
  const { posts, likePost, loading } = usePosts();

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'anonymous') return post.isAnonymous;
    if (filter === 'named') return !post.isAnonymous;
    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-faith-300 border-t-faith-700 rounded-full mx-auto mb-4"></div>
        <p className="text-faith-600">Loading posts...</p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-faith-300 rounded-lg bg-faith-50">
        <p className="text-faith-600 mb-2">No posts to display</p>
        <p className="text-sm text-faith-500">
          {filter === 'all' 
            ? 'Be the first to share something with the community!' 
            : filter === 'anonymous' 
              ? 'No anonymous posts yet. Feel free to share your thoughts without revealing your identity.'
              : 'No named posts yet. Share your experiences with the community!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map(post => (
        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {post.isAnonymous ? (
                  <div className="bg-faith-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-faith-500" />
                  </div>
                ) : (
                  <div className="bg-faith-700 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {post.author?.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-faith-800">
                    {post.isAnonymous ? 'Anonymous' : post.author?.name}
                  </p>
                  <p className="text-xs text-faith-500">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-faith-700 whitespace-pre-wrap">
              {post.content.length > 300 
                ? `${post.content.slice(0, 300)}...` 
                : post.content}
            </p>
            {post.content.length > 300 && (
              <Link 
                to={`/posts/${post.id}`} 
                className="text-faith-600 text-sm hover:text-faith-800 font-medium mt-2 inline-block"
              >
                Read more
              </Link>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex gap-4 w-full">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-faith-600 font-normal hover:text-faith-800 hover:bg-faith-50"
                onClick={() => likePost(post.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm" 
                className="text-faith-600 font-normal hover:text-faith-800 hover:bg-faith-50"
                asChild
              >
                <Link to={`/posts/${post.id}`}>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{post.comments.length}</span>
                </Link>
              </Button>
              <div className="ml-auto">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-sm text-faith-600 hover:text-faith-800 font-medium"
                >
                  View post
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
