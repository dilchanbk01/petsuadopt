import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  image: string;
  location?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}
const PetCard = ({
  id,
  name,
  breed,
  age,
  gender,
  image,
  location,
  isFavorite,
  onToggleFavorite
}: PetCardProps) => {
  return <Card className="group overflow-hidden bg-gradient-card border-border shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={`${name} - ${breed}`} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        
        {/* Gender Badge */}
        <Badge className={`absolute top-3 right-3 ${gender === "Male" ? "bg-pet-male text-blue-700" : "bg-pet-female text-pink-700"}`}>
          {gender}
        </Badge>

        {/* Favorite Button */}
        
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name and Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{breed}</span>
          <span>Age: {age} {age === 1 ? 'month' : 'months'}</span>
        </div>

        {/* Location */}
        {location && location !== 'not_specified' && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-gradient-primary hover:bg-primary-dark" onClick={() => window.location.href = `/learn-more/${id}`}>
            Learn More
          </Button>
          
        </div>
      </div>
    </Card>;
};
export default PetCard;