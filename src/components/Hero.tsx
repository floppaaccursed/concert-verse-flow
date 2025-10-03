import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-concert.jpg";

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Find Your Next
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Concert Experience
          </span>
        </h1>
        <p className="text-xl text-white/90 mb-8 drop-shadow-md">
          Discover amazing live performances and secure your tickets to unforgettable shows
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-glow">
          <Input
            type="text"
            placeholder="Search for artists, venues, or events..."
            className="border-0 bg-transparent focus-visible:ring-0 text-foreground"
          />
          <Button className="rounded-full bg-gradient-primary hover:opacity-90 transition-opacity">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
    </div>
  );
};

export default Hero;
