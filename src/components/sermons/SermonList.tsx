
import SermonCard from "./SermonCard";
import SermonSeriesCard from "./SermonSeriesCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface SermonListProps {
  filter: string;
  searchQuery: string;
  type: "recent" | "series" | "popular";
}

// Mock data for sermon items
const sermonData = [
  {
    id: 1,
    title: "Finding Peace in a Troubled World",
    speaker: "Pastor Michael Johnson",
    date: "July 16, 2023",
    description: "In this powerful message, Pastor Michael explores how we can find true peace even in the midst of life's most challenging circumstances.",
    imageUrl: "/images/sermon-1.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "45:12",
    topics: ["peace", "anxiety", "prayer"],
    views: 1245,
    series: "Finding Peace"
  },
  {
    id: 2,
    title: "The Power of Gratitude",
    speaker: "Pastor Sarah Williams",
    date: "July 9, 2023",
    description: "Discover how practicing gratitude can transform your perspective and deepen your relationship with God.",
    imageUrl: "/images/sermon-2.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "38:05",
    topics: ["gratitude", "joy", "faith"],
    views: 980,
    series: "Spiritual Disciplines"
  },
  {
    id: 3,
    title: "Building Strong Families",
    speaker: "Pastor David Chen",
    date: "July 2, 2023",
    description: "Learn biblical principles for nurturing healthy family relationships and creating a Christ-centered home.",
    imageUrl: "/images/sermon-3.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "42:30",
    topics: ["family", "relationships", "parenting"],
    views: 1567,
    series: "Family Matters"
  },
  {
    id: 4,
    title: "Walking in Faith",
    speaker: "Pastor Michael Johnson",
    date: "June 25, 2023",
    description: "Exploring the journey of faith and how to trust God even when the path ahead seems uncertain.",
    imageUrl: "/images/sermon-4.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "41:18",
    topics: ["faith", "trust", "providence"],
    views: 1120,
    series: "Faith Journey"
  },
  {
    id: 5,
    title: "The Grace of God",
    speaker: "Pastor Lisa Thompson",
    date: "June 18, 2023",
    description: "A powerful message about God's unmerited favor and how His grace transforms our lives.",
    imageUrl: "/images/sermon-5.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "39:42",
    topics: ["grace", "forgiveness", "love"],
    views: 1340,
    series: "Grace Unleashed"
  },
  {
    id: 6,
    title: "Praying with Confidence",
    speaker: "Pastor James Wilson",
    date: "June 11, 2023",
    description: "Learn how to approach God in prayer with confidence and expectation based on His promises.",
    imageUrl: "/images/sermon-6.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "44:05",
    topics: ["prayer", "faith", "promises"],
    views: 1087,
    series: "Prayer Power"
  }
];

// Mock data for sermon series
const seriesData = [
  {
    id: 1,
    title: "Faith Journey",
    description: "A 5-part series exploring what it means to live by faith in today's world.",
    imageUrl: "/images/series-1.jpg",
    count: 5,
    date: "April - May 2023",
  },
  {
    id: 2,
    title: "Grace Unleashed",
    description: "Discovering the transformative power of God's grace in every aspect of our lives.",
    imageUrl: "/images/series-2.jpg",
    count: 4,
    date: "June 2023",
  },
  {
    id: 3,
    title: "Prayer Power",
    description: "Learning how to develop a dynamic prayer life that connects with God's heart.",
    imageUrl: "/images/series-3.jpg",
    count: 3,
    date: "June - July 2023",
  },
  {
    id: 4,
    title: "Family Matters",
    description: "Biblical wisdom for building strong families and godly relationships.",
    imageUrl: "/images/series-4.jpg",
    count: 6,
    date: "March 2023",
  }
];

export default function SermonList({ filter, searchQuery, type }: SermonListProps) {
  // Filter sermons based on selected filter and search query
  const filteredSermons = sermonData.filter(sermon => {
    const matchesFilter = filter === "all" || sermon.topics.includes(filter.toLowerCase());
    const matchesSearch = searchQuery === "" || 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Sort sermons based on the selected tab
  let displaySermons = [...filteredSermons];
  if (type === "popular") {
    displaySermons.sort((a, b) => b.views - a.views);
  }
  
  // Filter series based on search query
  const filteredSeries = seriesData.filter(series => {
    return searchQuery === "" || 
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  if (type === "series") {
    return (
      <div>
        {filteredSeries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-faith-600">No sermon series found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map((series) => (
              <SermonSeriesCard key={series.id} series={series} />
            ))}
          </div>
        )}
        
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
  
  return (
    <div>
      {displaySermons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-faith-600">No sermons found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}
      
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
