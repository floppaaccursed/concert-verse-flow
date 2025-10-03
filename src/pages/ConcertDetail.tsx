import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket } from "lucide-react";

// Mock data - will be replaced with real data later
const concertData = {
  1: {
    artist: "Arctic Monkeys",
    venue: "Madison Square Garden, New York",
    date: "March 15, 2025",
    time: "8:00 PM",
    price: "$89",
    genre: "Indie Rock",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    description: "Join us for an unforgettable night with Arctic Monkeys as they bring their electrifying performance to Madison Square Garden. Experience their greatest hits and new material in one of the world's most iconic venues.",
  },
};

const ConcertDetail = () => {
  const { id } = useParams();
  const concert = concertData[Number(id) as keyof typeof concertData] || concertData[1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={concert.image}
            alt={concert.artist}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/">
                <Button variant="ghost" className="text-white hover:text-white/80 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to concerts
                </Button>
              </Link>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                {concert.genre}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-2">
                {concert.artist}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8 animate-fade-in">
              <Card className="bg-card border-border shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About this event</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {concert.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-card">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Venue</p>
                        <p className="text-muted-foreground">{concert.venue}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Date</p>
                        <p className="text-muted-foreground">{concert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Time</p>
                        <p className="text-muted-foreground">{concert.time}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="animate-fade-in">
              <Card className="sticky top-24 bg-card border-border shadow-glow">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Tickets from</p>
                    <p className="text-4xl font-bold text-primary">{concert.price}</p>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-lg py-6">
                    <Ticket className="w-5 h-5 mr-2" />
                    Buy Tickets
                  </Button>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      🎟️ Limited tickets available
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      ✓ Instant confirmation
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      ✓ Mobile tickets accepted
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;
