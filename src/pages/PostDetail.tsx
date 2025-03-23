
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PostProvider, usePosts } from '@/context/PostContext';
import { formatDistanceToNow, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageSquare,
  User,
  Lock,
  Unlock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

function PostDetailContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, likePost, addComment } = usePosts();
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = getPost(id || '');

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-faith-800 mb-4">Post Not Found</h1>
        <p className="text-faith-600 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/posts')}
          className="mx-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 
          Back to Posts
        </Button>
      </div>
    );
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please write something to share with the community.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment on posts.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addComment(post.id, comment, isAnonymous);
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/posts')} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> 
        Back to Posts
      </Button>
      
      <Card className="mb-8">
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
                  {format(post.createdAt, 'PPP')} at {format(post.createdAt, 'p')}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-faith-700 whitespace-pre-wrap">{post.content}</p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex gap-4">
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
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments.length}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-faith-800 mb-4">
          {post.comments.length > 0 
            ? `Responses (${post.comments.length})` 
            : 'Be the first to respond'}
        </h2>
        
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
            <Textarea
              placeholder="Share your thoughts on this post..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] resize-y"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="comment-anonymous-mode"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <div className="flex items-center gap-1">
                  {isAnonymous ? (
                    <Lock className="h-4 w-4 text-faith-600" />
                  ) : (
                    <Unlock className="h-4 w-4 text-faith-600" />
                  )}
                  <label
                    htmlFor="comment-anonymous-mode"
                    className="text-sm font-medium cursor-pointer"
                  >
                    {isAnonymous ? 'Anonymous' : `Responding as ${user?.name}`}
                  </label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-faith-700 hover:bg-faith-800"
              >
                {isSubmitting ? 'Posting...' : 'Post Response'}
              </Button>
            </div>
          </form>
        ) : (
          <Card className="p-6 bg-faith-50 border-faith-200 mb-6">
            <div className="text-center">
              <p className="text-faith-700 mb-2">
                Sign in to respond to this post
              </p>
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </Card>
        )}
        
        {post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map(comment => (
              <Card key={comment.id} className="bg-faith-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {comment.isAnonymous ? (
                      <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center border border-faith-200">
                        <User className="h-4 w-4 text-faith-500" />
                      </div>
                    ) : (
                      <div className="bg-faith-600 h-8 w-8 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {comment.author?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-faith-800 text-sm">
                        {comment.isAnonymous ? 'Anonymous' : comment.author?.name}
                      </p>
                      <p className="text-xs text-faith-500">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-faith-700 text-sm whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-faith-300 rounded-lg bg-faith-50">
            <p className="text-faith-600 mb-2">No responses yet</p>
            <p className="text-sm text-faith-500">
              Be the first to respond to this post
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostDetail() {
  return (
    <PostProvider>
      <Layout>
        <PostDetailContent />
      </Layout>
    </PostProvider>
  );
}
