
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PostProvider } from '@/context/PostContext';
import PostList from '@/components/posts/PostList';
import CreatePostForm from '@/components/posts/CreatePostForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <PostProvider>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-faith-800">Community Sharing</h1>
              <p className="text-faith-600 max-w-2xl mx-auto">
                Share your thoughts, prayers, and experiences with our community. 
                Feel free to post anonymously if you prefer.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Share Your Thoughts</CardTitle>
                <CardDescription>
                  Your words may bring encouragement to someone who needs it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreatePostForm />
              </CardContent>
            </Card>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-faith-800">Community Posts</h2>
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
                  <TabsTrigger value="named">Named</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <PostList filter="all" />
              </TabsContent>
              
              <TabsContent value="anonymous">
                <PostList filter="anonymous" />
              </TabsContent>
              
              <TabsContent value="named">
                <PostList filter="named" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </PostProvider>
  );
}
