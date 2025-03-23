
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, Clock, Calendar, User, Download } from "lucide-react";
import { useState } from "react";

// Mock sermon data
const sermonData = {
  id: 1,
  title: "Finding Peace in a Troubled World",
  speaker: "Pastor Michael Johnson",
  date: "July 16, 2023",
  description: "In this powerful message, Pastor Michael explores how we can find true peace even in the midst of life's most challenging circumstances. Drawing from John 14:27 and Philippians 4:6-7, he shares biblical principles and practical steps to experience God's peace that surpasses all understanding.\n\nThe world around us is often chaotic and uncertain, but Christ offers a peace that is not dependent on our circumstances. This sermon delves into the nature of God's peace, how it differs from what the world offers, and how we can access it daily through prayer, trust, and surrender.",
  videoUrl: "#",
  audioUrl: "#",
  imageUrl: "/images/sermon-1.jpg",
  scripture: "John 14:27, Philippians 4:6-7",
  duration: "45:12",
  topics: ["peace", "anxiety", "prayer", "faith", "trust"],
  downloads: {
    audio: "#",
    notes: "#",
    transcript: "#"
  },
  series: {
    id: 1,
    title: "Finding Peace",
    position: "Part 2 of 4"
  },
  relatedSermons: [2, 3, 5]
};

export default function SermonDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // In a real app, you would fetch the sermon data based on the ID
  // const sermon = fetchSermonById(id);
  const sermon = sermonData;
  
  if (!sermon) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-medium text-faith-900">Sermon not found</h2>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle={sermon.series.title}
            title={sermon.title}
            align="left"
            className="max-w-4xl"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative overflow-hidden rounded-xl shadow-xl aspect-video bg-faith-900 mb-8">
                <div className="absolute inset-0 bg-faith-900 flex items-center justify-center">
                  <img 
                    src={sermon.imageUrl} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover opacity-70"
                  />
                  
                  {/* Play Button */}
                  <button 
                    className="absolute inset-0 flex items-center justify-center group"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center text-faith-900 
                      group-hover:scale-110 transform transition-transform duration-300">
                      {isPlaying ? (
                        <Pause className="h-7 w-7" />
                      ) : (
                        <Play className="h-7 w-7 ml-1" />
                      )}
                    </div>
                  </button>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-faith-950 to-transparent flex items-center">
                    <div className="flex w-full items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white/90 hover:text-white"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </button>
                      
                      {/* Progress Bar */}
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-faith-400 w-[30%]"></div>
                      </div>
                      
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white/90 hover:text-white"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sermon Info */}
              <div className="flex items-center flex-wrap gap-4 mb-6">
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
              <div className="mb-6 p-4 bg-faith-50 rounded-lg border border-faith-100 text-faith-800">
                <h4 className="font-medium mb-2">Scripture References</h4>
                <p>{sermon.scripture}</p>
              </div>
              
              {/* Description */}
              <div className="prose prose-faith max-w-none mb-8">
                <h3 className="text-faith-900">Description</h3>
                {sermon.description.split('\n\n').map((paragraph, index) => (
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
              <div className="mb-8">
                <h3 className="text-xl font-serif font-medium text-faith-900 mb-4">
                  From the "{sermon.series.title}" Series
                </h3>
                <p className="text-faith-600 mb-4">{sermon.series.position}</p>
                <Button variant="outline" className="border-faith-200 text-faith-700 hover:bg-faith-50">
                  View All Sermons in This Series
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-faith-50 rounded-lg border border-faith-100 p-6 mb-8">
                <h3 className="text-lg font-serif font-medium text-faith-900 mb-4">
                  Downloads
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100">
                    <Download className="mr-2 h-4 w-4" />
                    Download Audio (MP3)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100">
                    <Download className="mr-2 h-4 w-4" />
                    Sermon Notes (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-faith-200 text-faith-700 hover:bg-faith-100">
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
                  <Button size="icon" variant="outline" className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                    </svg>
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full border-faith-200 text-faith-700 hover:bg-faith-100">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </Button>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    value={window.location.href}
                    readOnly
                    className="w-full p-2 pr-16 text-sm border border-faith-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-faith-500"
                  />
                  <Button 
                    className="absolute right-1 top-1 h-6 text-xs bg-faith-700 hover:bg-faith-800"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // In a real app, you would show a toast notification here
                    }}
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
