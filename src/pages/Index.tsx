import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ConcertCard from "@/components/ConcertCard";

// Mock data - will be replaced with real data from database later
const upcomingConcerts = [
  {
    id: 1,
    artist: "Arctic Monkeys",
    venue: "Madison Square Garden, New York",
    date: "March 15, 2025",
    price: "$89",
    genre: "Indie Rock",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
  },
  {
    id: 2,
    artist: "Billie Eilish",
    venue: "The Forum, Los Angeles",
    date: "March 22, 2025",
    price: "$125",
    genre: "Pop",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  },
  {
    id: 3,
    artist: "The Weeknd",
    venue: "United Center, Chicago",
    date: "April 5, 2025",
    price: "$95",
    genre: "R&B",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
  },
  {
    id: 4,
    artist: "Dua Lipa",
    venue: "Barclays Center, Brooklyn",
    date: "April 12, 2025",
    price: "$110",
    genre: "Pop",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
  },
  {
    id: 5,
    artist: "Tame Impala",
    venue: "Red Rocks Amphitheatre, Colorado",
    date: "May 1, 2025",
    price: "$78",
    genre: "Psychedelic Rock",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
  },
  {
    id: 6,
    artist: "Travis Scott",
    venue: "Oracle Arena, Oakland",
    date: "May 18, 2025",
    price: "$135",
    genre: "Hip Hop",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Concerts Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Upcoming Concerts
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't miss out on these amazing live performances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingConcerts.map((concert) => (
            <ConcertCard key={concert.id} {...concert} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
