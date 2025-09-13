import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PetCardProps {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: "Male" | "Female";
  location: string;
  image: string;
  description?: string;
}

const PetCard = ({ name, type, breed, age, gender, location, image, description }: PetCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={`${name} - ${breed}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Gender Badge */}
        <Badge 
          className={`absolute top-3 right-3 ${
            gender === "Male" 
              ? "bg-pet-male text-blue-700" 
              : "bg-pet-female text-pink-700"
          }`}
        >
          {gender}
        </Badge>

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 left-3 w-8 h-8 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name and Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{breed}</p>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{type}</span>
          <span>Age: {age}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-gradient-primary hover:bg-primary-dark">
            Learn More
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PetCard;