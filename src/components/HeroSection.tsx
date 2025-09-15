import { Heart, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-16 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Perfect
            <span className="text-primary"> Companion</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with loving pets in need of homes. Every adoption saves a life and creates an unbreakable bond.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:bg-primary-dark text-lg px-8 py-3">
              Start Adopting
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;