
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const inspirationalQuotes = [
  "Faith is taking the first step even when you don't see the whole staircase. - Martin Luther King Jr.",
  "I believe in Christianity as I believe that the sun has risen: not only because I see it, but because by it I see everything else. - C.S. Lewis",
  "Prayer does not change God, but it changes him who prays. - Søren Kierkegaard",
  "God never said that the journey would be easy, but He did say that the arrival would be worthwhile. - Max Lucado",
  "The Christian does not think God will love us because we are good, but that God will make us good because He loves us. - C.S. Lewis"
];

export default function Hero() {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-screen max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/church-interior.jpg')",
            opacity: 0.6
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-faith-950/90 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4 md:mb-6 animate-slide-up"
        >
          Welcome to Faith<span className="text-faith-300">Connect</span>
        </h1>
        
        <div className="h-16 md:h-20 overflow-hidden mb-6 md:mb-8">
          {inspirationalQuotes.map((quote, index) => (
            <p 
              key={index}
              className={`text-white/90 text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 
                ${index === currentQuote ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
            >
              {quote}
            </p>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 animate-fade-in animate-delay-300">
          <Button 
            asChild
            size="lg" 
            className="bg-faith-700 hover:bg-faith-600 text-white border border-faith-600 rounded-md shadow-lg"
          >
            <Link to="/about">
              Learn More
            </Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 rounded-md shadow-lg"
          >
            <Link to="/contact">
              Join Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
