import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

interface ConcertCardProps {
  id: number;
  artist: string;
  venue: string;
  date: string;
  price: string;
  image: string;
  genre: string;
}

const ConcertCard = ({ id, artist, venue, date, price, image, genre }: ConcertCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 animate-scale-in bg-card border-border">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={artist}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {genre}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {artist}
        </h3>
        
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{date}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">From</p>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        <Link to={`/concert/${id}`}>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Ticket className="w-4 h-4 mr-2" />
            Get Tickets
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ConcertCard;
