import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export default function FeaturedSermon() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const videoId = "obhieokTo2c"; // Replace with your video ID

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube API callback
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player("youtube-player", {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  // Detects video play/pause
  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Custom Play/Pause toggle
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeading
          subtitle="Latest Message"
          title="Featured Sermon"
          description="Watch or listen to our most recent message from Sunday service."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* YouTube Video Embed */}
          <div className="relative overflow-hidden rounded-xl shadow-xl aspect-video bg-faith-900">
            <iframe
              id="youtube-player"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
              title="Sermon Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Play/Pause Button Overlay (Only shows when video is NOT playing) */}
            {!isPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center group"
                onClick={togglePlay}
                aria-label="Play video"
              >
                <div
                  className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center text-faith-900 
                group-hover:scale-110 transform transition-transform duration-300"
                >
                  <Play className="h-7 w-7 ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Sermon Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-medium font-serif text-faith-900 mb-2">
                Finding Peace in a Troubled World
              </h3>
              <p className="text-faith-600">
                Pastor Michael Johnson • July 16, 2023
              </p>
            </div>

            <p className="text-faith-700 leading-relaxed">
              In this powerful message, Pastor Michael explores how we can find
              true peace even in the midst of life's most challenging
              circumstances...
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">
                  Peace
                </span>
                <span className="px-3 py-1 bg-faith-100 text-faith-700 rounded-full text-xs font-medium">
                  Anxiety
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-faith-700 hover:bg-faith-800">
                  Watch on YouTube
                </Button>
                <Button
                  variant="outline"
                  className="border-faith-200 text-faith-700 hover:bg-faith-50"
                >
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
