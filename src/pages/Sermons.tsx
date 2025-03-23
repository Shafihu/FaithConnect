
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SermonList from "@/components/sermons/SermonList";
import SermonFilters from "@/components/sermons/SermonFilters";
import { Separator } from "@/components/ui/separator";

export default function Sermons() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Listen & Grow"
            title="Sermons & Messages"
            description="Explore our collection of sermons and messages that inspire, educate, and strengthen your faith journey."
          />
          
          <Tabs defaultValue="recent" className="w-full mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <TabsList className="bg-faith-50">
                <TabsTrigger value="recent">Recent Messages</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="popular">Most Viewed</TabsTrigger>
              </TabsList>
              
              <SermonFilters 
                activeFilter={activeFilter} 
                setActiveFilter={setActiveFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            
            <Separator className="mb-8" />
            
            <TabsContent value="recent" className="mt-0">
              <SermonList 
                filter={activeFilter} 
                searchQuery={searchQuery}
                type="recent"
              />
            </TabsContent>
            
            <TabsContent value="series" className="mt-0">
              <SermonList 
                filter={activeFilter} 
                searchQuery={searchQuery}
                type="series"
              />
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <SermonList 
                filter={activeFilter} 
                searchQuery={searchQuery}
                type="popular"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
