import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const ReferencesSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [
    {
      name: "Annette Schmidt",
      role: "Eventmanagerin",
      company: "Tech Solutions GmbH",
      image: "/img4.png",
      quote: "Hardal hat unsere Firmenfeier mit exquisitem Essen und erstklassigem Service zu einem unvergesslichen Erlebnis gemacht.",
      rating: 5
    },
    {
      name: "Michael Weber",
      role: "CEO",
      company: "Digital Innovators",
      image: "/img4.png",
      quote: "Die Qualität und Präsentation der Speisen war außergewöhnlich. Ein perfekter Catering-Service für unsere Firmenveranstaltung.",
      rating: 5
    },
  ];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="flex-[0_0_100%] min-w-0"
            >
              <div className="p-4">
                <div className="grid md:grid-cols-[1fr_1px_400px] gap-12 items-center">
                  {/* Content Side */}
                  <div className="space-y-10">
                    {/* Quote */}
                    <div className="relative">
                      {/* Opening Quote */}
                      <div className="absolute -left-4 -top-4">
                        <svg 
                          className="w-8 h-8 text-first/20" 
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
                        </svg>
                      </div>

                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed pl-6">
                        {testimonial.quote}
                      </p>

                      {/* Closing Quote */}
                      <div className="absolute -right-4 bottom-0">
                        <svg 
                          className="w-8 h-8 text-first/20 transform rotate-180" 
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
                        </svg>
                      </div>
                    </div>

                    {/* Rating & Author Info */}
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-first' : 'text-gray-200'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden md:block w-[1px] h-[300px] bg-gray-100" />

                  {/* Image Side */}
                  <div className="hidden md:block h-[400px] rounded-xl overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12">
        {/* Arrows */}
        <div className="flex gap-4">
          <button
            onClick={scrollPrev}
            className="group h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center
                     transition-all duration-300 hover:border-first hover:bg-first/5"
          >
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-first transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="group h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center
                     transition-all duration-300 hover:border-first hover:bg-first/5"
          >
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-first transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedIndex === idx ? 'w-6 bg-first' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferencesSlider;
