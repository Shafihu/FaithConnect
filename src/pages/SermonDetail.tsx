"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, User, Download } from "lucide-react";

// Define the sermon interface based on your SermonCard props
interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  audioUrl: string;
  duration: string;
  topics: string[];
  views: number;
  series: string;
  // Additional fields for sermon detail
  scripture?: string;
  downloads?: {
    audio: string;
    notes: string;
    transcript: string;
  };
  seriesInfo?: {
    id: number;
    title: string;
    position: string;
  };
  relatedSermons?: number[];
}

// Mock data for sermons - in a real app, this would come from an API
const sermonsData: Sermon[] = [
  {
    id: 1,
    title: "Finding Peace in a Troubled World",
    speaker: "Pastor Michael Johnson",
    date: "July 16, 2023",
    description:
      "In this powerful message, Pastor Michael explores how we can find true peace even in the midst of life's most challenging circumstances. Drawing from John 14:27 and Philippians 4:6-7, he shares biblical principles and practical steps to experience God's peace that surpasses all understanding.\n\nThe world around us is often chaotic and uncertain, but Christ offers a peace that is not dependent on our circumstances. This sermon delves into the nature of God's peace, how it differs from what the world offers, and how we can access it daily through prayer, trust, and surrender.",
    imageUrl: "/images/sermon-1.jpg",
    videoUrl: "ipWTb0BSHuI",
    audioUrl: "#",
    duration: "45:12",
    topics: ["peace", "anxiety", "prayer", "faith", "trust"],
    views: 1245,
    series: "Finding Peace",
    scripture: "John 14:27, Philippians 4:6-7",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 1,
      title: "Finding Peace",
      position: "Part 2 of 4",
    },
    relatedSermons: [2, 3, 5],
  },
  {
    id: 2,
    title: "The Power of Gratitude",
    speaker: "Pastor Sarah Boampong",
    date: "July 9, 2023",
    description:
      "Discover how practicing gratitude can transform your perspective and deepen your relationship with God. This sermon explores the biblical foundations of gratitude and provides practical ways to cultivate a thankful heart in all circumstances.\n\nDrawing from Psalms and the teachings of Paul, Pastor Sarah shows how gratitude is not just a feeling but a spiritual discipline that can reshape our attitudes and bring us closer to God's heart.",
    imageUrl: "/images/sermon-2.jpg",
    videoUrl: "pGoASOLEV_4",
    audioUrl: "#",
    duration: "38:05",
    topics: ["gratitude", "joy", "faith"],
    views: 980,
    series: "Spiritual Disciplines",
    scripture: "1 Thessalonians 5:16-18, Psalm 100",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 2,
      title: "Spiritual Disciplines",
      position: "Part 1 of 5",
    },
    relatedSermons: [3, 4, 6],
  },
  {
    id: 3,
    title: "Building Strong Families",
    speaker: "Pastor David Amoako",
    date: "July 2, 2023",
    description:
      "Learn biblical principles for nurturing healthy family relationships and creating a Christ-centered home. Pastor David shares insights from Scripture on how to build a family foundation that will withstand life's challenges.\n\nThis message addresses the unique challenges families face today and offers practical guidance for parents, children, and spouses seeking to honor God in their relationships.",
    imageUrl: "/images/sermon-3.jpg",
    videoUrl: "bfU-s69cxjU",
    audioUrl: "#",
    duration: "42:30",
    topics: ["family", "relationships", "parenting"],
    views: 1567,
    series: "Family Matters",
    scripture: "Ephesians 5:21-6:4, Deuteronomy 6:4-9",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 3,
      title: "Family Matters",
      position: "Part 1 of 3",
    },
    relatedSermons: [1, 4, 5],
  },
  {
    id: 4,
    title: "Walking in Faith",
    speaker: "Pastor Michael Johnson",
    date: "June 25, 2023",
    description:
      "Exploring the journey of faith and how to trust God even when the path ahead seems uncertain...",
    imageUrl: "/images/sermon-4.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "41:18",
    topics: ["faith", "trust", "providence"],
    views: 1120,
    series: "Faith Journey",
    scripture: "Hebrews 11:1, Proverbs 3:5-6",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 4,
      title: "Faith Journey",
      position: "Part 3 of 5",
    },
    relatedSermons: [2, 5, 6],
  },
  {
    id: 5,
    title: "The Grace of God",
    speaker: "Pastor Lisa Thompson",
    date: "June 18, 2023",
    description:
      "A powerful message about God's unmerited favor and how His grace transforms our lives...",
    imageUrl: "/images/sermon-5.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "39:42",
    topics: ["grace", "forgiveness", "love"],
    views: 1340,
    series: "Grace Unleashed",
    scripture: "Ephesians 2:8-9, Romans 5:1-2",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 5,
      title: "Grace Unleashed",
      position: "Part 2 of 4",
    },
    relatedSermons: [1, 4, 6],
  },
  {
    id: 6,
    title: "Praying with Confidence",
    speaker: "Pastor James Wilson",
    date: "June 11, 2023",
    description:
      "Learn how to approach God in prayer with confidence and expectation based on His promises...",
    imageUrl: "/images/sermon-6.jpg",
    videoUrl: "#",
    audioUrl: "#",
    duration: "44:05",
    topics: ["prayer", "faith", "promises"],
    views: 1087,
    series: "Prayer Power",
    scripture: "1 John 5:14-15, Matthew 7:7-8",
    downloads: {
      audio: "#",
      notes: "#",
      transcript: "#",
    },
    seriesInfo: {
      id: 6,
      title: "Prayer Power",
      position: "Part 1 of 3",
    },
    relatedSermons: [2, 3, 5],
  },
];

export default function SermonDetail() {
  const { id } = useParams<{ id: string }>();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the sermon data from an API
    // For now, we'll simulate this with a timeout and our mock data
    setIsLoading(true);

    const fetchSermon = () => {
      // Find the sermon with the matching ID from our mock data
      const foundSermon = sermonsData.find((s) => s.id === Number(id));

      // Set the sermon data or null if not found
      setSermon(foundSermon || null);
      setIsLoading(false);
    };

    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      fetchSermon();
    }, 500);

    // Set the share URL
    setShareUrl(window.location.href);

    // Clean up the timeout
    return () => clearTimeout(timer);
  }, [id]);

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // In a real app, you would show a toast notification here
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-faith-100 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-faith-100 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!sermon) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-medium text-faith-900">
            Sermon not found
          </h2>
          <p className="mt-4 text-faith-600">
            The sermon you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle={sermon.seriesInfo?.title || sermon.series}
            title={sermon.title}
            align="left"
            className="max-w-4xl"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative w-full aspect-video bg-faith-100 rounded-lg overflow-hidden">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={sermon.imageUrl || "/images/sermon-thumbnail.jpg"}
                      alt={sermon.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-faith-900/50"></div>
                    <button
                      className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center text-faith-900 
                      hover:scale-110 transform transition-transform duration-300 relative z-10"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play video"
                    >
                      <Play className="h-7 w-7 ml-1" />
                    </button>
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${sermon.videoUrl}?autoplay=1&rel=0`}
                    title={`${sermon.title} - ${sermon.speaker}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Sermon Info */}
              <div className="flex items-center flex-wrap gap-4 mt-6 mb-6">
                <div className="flex items-center gap-1 text-faith-600">
                  <User className="h-4 w-4" />
                  <span>{sermon.speaker}</span>
                </div>
                <div className="flex items-center gap-1 text-faith-600">
                  <Calendar className="h-4 w-4" />
                  <span>{sermon.date}</span>
                </div>
                <div className="flex items-center gap-1 text-faith-600">
                  <Clock className="h-4 w-4" />
                  <span>{sermon.duration}</span>
                </div>
              </div>

              {/* Scripture */}
              {sermon.scripture && (
                <div className="mb-6 p-4 bg-faith-50 rounded-lg border border-faith-100 text-faith-800">
                  <h4 className="font-medium mb-2">Scripture References</h4>
                  <p>{sermon.scripture}</p>
                </div>
              )}

              {/* Description */}
              <div className="prose prose-faith max-w-none mb-8">
                <h3 className="text-faith-900">Description</h3>
                {sermon.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {sermon.topics.map((topic, index) => (
                  <Badge
                    key={index}
                    className="bg-faith-100 text-faith-700 hover:bg-faith-200"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>

              <Separator className="my-8" />

              {/* Series Info */}
              {sermon.seriesInfo && (
                <div className="mb-8">
                  <h3 className="text-xl font-serif font-medium text-faith-900 mb-4">
                    From the "{sermon.seriesInfo.title}" Series
                  </h3>
                  <p className="text-faith-600 mb-4">
                    {sermon.seriesInfo.position}
                  </p>
                  <Button
                    variant="outline"
                    className="border-faith-200 text-faith-700 hover:bg-faith-50"
                  >
                    View All Sermons in This Series
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-faith-50 rounded-lg border border-faith-100 p-6 mb-8">
                <h3 className="text-lg font-serif font-medium text-faith-900 mb-4">
                  Downloads
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Audio (MP3)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Sermon Notes (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Transcript (PDF)
                  </Button>
                </div>
              </div>

              <div className="bg-faith-50 rounded-lg border border-faith-100 p-6">
                <h3 className="text-lg font-serif font-medium text-faith-900 mb-4">
                  Share This Sermon
                </h3>
                <div className="flex gap-3 mb-6">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </Button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="w-full p-2 pr-16 text-sm border border-faith-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-faith-500"
                  />
                  <Button
                    className="absolute right-1 top-1 h-6 text-xs bg-faith-700 hover:bg-faith-800"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
