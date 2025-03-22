
import { useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export default function FeaturedSermon() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeading
          subtitle="Latest Message"
          title="Featured Sermon"
          description="Watch or listen to our most recent message from Sunday service."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Video Player */}
          <div className="relative overflow-hidden rounded-xl shadow-xl aspect-video bg-faith-900">
            <div className="absolute inset-0 bg-faith-900 flex items-center justify-center">
              <img 
                src="/images/sermon-thumbnail.jpg" 
                alt="Sermon Thumbnail" 
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
          
          {/* Sermon Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-medium font-serif text-faith-900 mb-2">
                Finding Peace in a Troubled World
              </h3>
              <p className="text-faith-600">Pastor Michael Johnson • July 16, 2023</p>
            </div>
            
            <p className="text-faith-700 leading-relaxed">
              In this powerful message, Pastor Michael explores how we can find true peace even in the midst of life's most challenging circumstances. Drawing from John 14:27 and Philippians 4:6-7, he shares biblical principles and practical steps to experience God's peace that surpasses all understanding.
            </p>
            
            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">Peace</span>
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">Anxiety</span>
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">Prayer</span>
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">John 14:27</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-faith-700 hover:bg-faith-800">
                  Watch Full Sermon
                </Button>
                <Button variant="outline" className="border-faith-200 text-faith-700 hover:bg-faith-50">
                  Download Audio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
