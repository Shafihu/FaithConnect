import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const testimonials = [
  {
    id: 1,
    name: "Mirabel Asamoah",
    role: "Church Member for 5 Years",
    quote:
      "FaithConnect has been instrumental in my spiritual growth. The community here is truly like a family, and I've never felt more supported in my faith journey.",
    image: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "David Amoako",
    role: "Youth Group Leader",
    quote:
      "The teachings at this church have transformed my understanding of Scripture. I've been equipped to not only grow personally but also to guide our youth in their faith walks.",
    image: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Jessica Osei Frimpong",
    role: "New Member",
    quote:
      "Even as a newcomer, I was welcomed with open arms. The genuine love and acceptance I've experienced here has made me feel at home from day one.",
    image: "/images/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "George Agyemang",
    role: "Worship Team Member",
    quote:
      "Being part of the worship team at FaithConnect has deepened my connection with God in ways I never imagined. The spiritual atmosphere here is truly special.",
    image: "/images/testimonial-4.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) {
        next();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [dragging]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;

    let endX;
    if ("changedTouches" in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }

    const diff = startX - endX;

    if (diff > 50) {
      next();
    } else if (diff < -50) {
      prev();
    }

    setDragging(false);
  };

  return (
    <section className="py-16 md:py-24 bg-faith-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path fill="white" d="M0,0 L100,0 L100,100 L0,100 Z" />
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              d={`M${i * 10},0 L${i * 10 + 5},100`}
            />
          ))}
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <SectionHeading
          subtitle="Our Community"
          title="Testimonials"
          description="Hear from members of our church family about their experiences at FaithConnect."
          className="text-white [&>p]:text-white/80"
        />

        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Testimonial Slider */}
          <div
            className="overflow-hidden"
            ref={slideRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4 md:px-10"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-white/20">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-faith-300"
                          >
                            <path
                              d="M10 11L8 17H11V21H5V17L7 11H5V7H10V11ZM18 11L16 17H19V21H13V17L15 11H13V7H18V11Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <blockquote className="text-lg md:text-xl mb-4 italic text-white/90">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-medium text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-white/70">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    current === index
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={prev}
                className="h-9 w-9 rounded-full border-white/20 text-white hover:bg-white/10"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={next}
                className="h-9 w-9 rounded-full border-white/20 text-white hover:bg-white/10"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
