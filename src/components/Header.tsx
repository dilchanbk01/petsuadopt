import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-header-brand border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-yellow-400 italic">Petsu</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="https://petsu.in/vet-consultation" 
              className="text-white hover:text-yellow-400 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vet Consultation
            </a>
            <a 
              href="https://petsu.in/groomers" 
              className="text-white hover:text-yellow-400 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grooming
            </a>
            <a 
              href="https://petsu.in/pet-essentials" 
              className="text-white hover:text-yellow-400 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pet Essentials
            </a>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/about')}
              className="text-white hover:text-yellow-400 hover:bg-white/10 font-medium"
            >
              Blogs
            </Button>
          </nav>

          {/* User Icon */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;