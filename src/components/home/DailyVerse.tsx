
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const verses = [
  {
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
  },
  {
    text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  }
];

export default function DailyVerse() {
  const [currentVerse, setCurrentVerse] = useState(0);
  
  const getRandomVerse = () => {
    const random = Math.floor(Math.random() * verses.length);
    setCurrentVerse(random);
  };
  
  // Change verse on load
  useEffect(() => {
    getRandomVerse();
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-faith-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="px-4 py-1.5 bg-faith-200 text-faith-800 rounded-full text-sm font-medium">
              Daily Verse
            </span>
          </div>
          
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-faith-100 mb-6">
            <blockquote className="text-2xl md:text-3xl font-serif text-faith-900 mb-4 relative">
              <span className="absolute -top-6 -left-2 text-6xl text-faith-200">"</span>
              <p className="relative">{verses[currentVerse].text}</p>
              <span className="absolute -bottom-8 -right-2 text-6xl text-faith-200">"</span>
            </blockquote>
            
            <p className="text-lg font-medium text-faith-700 mt-6">
              {verses[currentVerse].reference}
            </p>
          </div>
          
          <Button
            onClick={getRandomVerse}
            className="bg-faith-700 hover:bg-faith-800 mt-4"
          >
            Get Another Verse <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
