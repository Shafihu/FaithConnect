
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from './AuthContext';

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  } | null;
  isAnonymous: boolean;
  likes: number;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  } | null;
  isAnonymous: boolean;
};

type PostContextType = {
  posts: Post[];
  addPost: (content: string, isAnonymous: boolean) => Promise<Post>;
  getPost: (id: string) => Post | undefined;
  addComment: (postId: string, content: string, isAnonymous: boolean) => Promise<void>;
  likePost: (id: string) => void;
  loading: boolean;
};

const PostContext = createContext<PostContextType>({
  posts: [],
  addPost: async () => ({} as Post),
  getPost: () => undefined,
  addComment: async () => {},
  likePost: () => {},
  loading: false,
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load posts from localStorage on mount
    const storedPosts = localStorage.getItem('faithconnect_posts');
    if (storedPosts) {
      try {
        // Convert string dates back to Date objects
        const parsedPosts = JSON.parse(storedPosts);
        const postsWithDates = parsedPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          comments: post.comments.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        }));
        setPosts(postsWithDates);
      } catch (error) {
        console.error("Failed to parse stored posts:", error);
        localStorage.removeItem('faithconnect_posts');
      }
    } else {
      // Initialize with example data if no posts exist
      const examplePosts: Post[] = [
        {
          id: '1',
          content: 'I struggle with finding time for prayer in my busy schedule. Any tips?',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          author: null,
          isAnonymous: true,
          likes: 5,
          comments: [
            {
              id: '1a',
              content: 'Try setting specific prayer times in your calendar, even if just 5 minutes!',
              createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              author: {
                id: 'admin1',
                name: 'Pastor James'
              },
              isAnonymous: false
            }
          ]
        },
        {
          id: '2',
          content: 'Sunday\'s sermon on forgiveness really touched my heart. I\'ve been holding onto resentment for years, but now I feel ready to let go.',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          author: {
            id: 'user2',
            name: 'Sarah Thompson'
          },
          isAnonymous: false,
          likes: 12,
          comments: []
        }
      ];
      setPosts(examplePosts);
      localStorage.setItem('faithconnect_posts', JSON.stringify(examplePosts));
    }
    setLoading(false);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('faithconnect_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = async (content: string, isAnonymous: boolean): Promise<Post> => {
    if (!content.trim()) {
      toast({
        title: "Cannot create empty post",
        description: "Please add some content to your post.",
        variant: "destructive",
      });
      throw new Error("Post content cannot be empty");
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      createdAt: new Date(),
      author: isAnonymous ? null : user ? { id: user.id, name: user.name } : null,
      isAnonymous,
      likes: 0,
      comments: []
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    
    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });

    return newPost;
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const addComment = async (postId: string, content: string, isAnonymous: boolean) => {
    if (!content.trim()) {
      toast({
        title: "Cannot add empty comment",
        description: "Please add some content to your comment.",
        variant: "destructive",
      });
      throw new Error("Comment content cannot be empty");
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      createdAt: new Date(),
      author: isAnonymous ? null : user ? { id: user.id, name: user.name } : null,
      isAnonymous
    };

    setPosts((prevPosts) => 
      prevPosts.map((post) => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    toast({
      title: "Comment added!",
      description: "Your comment has been added to the post.",
    });
  };

  const likePost = (id: string) => {
    setPosts((prevPosts) => 
      prevPosts.map((post) => 
        post.id === id 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, addPost, getPost, addComment, likePost, loading }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
