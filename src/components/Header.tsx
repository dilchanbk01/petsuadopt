import { Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PawsHome</h1>
              <p className="text-xs text-muted-foreground">Find Your Family</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="What are you looking for? (e.g., Golden Retriever)"
                  className="pr-4"
                />
              </div>
              <div className="w-48 relative">
                <Input
                  placeholder="Location"
                  className="pr-4"
                />
              </div>
              <Button variant="default" size="icon" className="bg-gradient-primary hover:bg-primary-dark">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;