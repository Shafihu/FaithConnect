
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import EventFilters from "@/components/events/EventFilters";
import EventList from "@/components/events/EventList";
import { useState } from "react";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Join Us"
            title="Upcoming Events"
            description="Connect with our community through these upcoming events and activities."
          />
          
          <div className="mt-10 mb-8">
            <EventFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={categoryFilter}
              setActiveFilter={setCategoryFilter}
            />
          </div>
          
          <EventList 
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
          />
        </div>
      </div>
    </Layout>
  );
}
