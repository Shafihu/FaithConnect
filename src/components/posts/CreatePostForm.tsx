
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CreatePostForm() {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addPost } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Post cannot be empty",
        description: "Please write something to share with the community.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addPost(content, isAnonymous);
      setContent('');
      setIsAnonymous(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="p-6 bg-faith-50 border-faith-200">
        <div className="text-center">
          <p className="text-faith-700 mb-2">
            Sign in to share your thoughts with the community
          </p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts, prayer requests, or experiences..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-y"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="anonymous-mode"
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
              htmlFor="anonymous-mode"
              className="text-sm font-medium cursor-pointer"
            >
              {isAnonymous ? 'Anonymous' : `Posting as ${user?.name}`}
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-faith-700 hover:bg-faith-800"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  );
}
