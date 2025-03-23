
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "faith", label: "Faith" },
  { id: "hope", label: "Hope" },
  { id: "love", label: "Love" },
  { id: "prayer", label: "Prayer" },
  { id: "family", label: "Family" },
  { id: "grace", label: "Grace" },
];

interface SermonFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SermonFilters({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
}: SermonFiltersProps) {
  return (
    <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-start md:items-center">
      {/* Search */}
      <div className="relative w-full md:w-60">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-faith-500" />
        <Input
          placeholder="Search sermons..."
          className="pl-8 bg-faith-50 border-faith-200 focus-visible:ring-faith-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Topic Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <Badge
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`
              cursor-pointer hover:bg-faith-100 
              ${activeFilter === filter.id 
                ? "bg-faith-700 hover:bg-faith-800" 
                : "text-faith-700 border-faith-200"
              }
            `}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
