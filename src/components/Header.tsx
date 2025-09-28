import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo.png';
const Header = () => {
  const navigate = useNavigate();
  return <header className="bg-header-brand border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src={logoImage} alt="Petsu Adopt Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Petsu Adopt</h1>
              <p className="text-xs text-white/80">Find Your Family</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex gap-2 w-full">
              <div className="flex-1 relative">
                <Input placeholder="What are you looking for? (e.g., Golden Retriever)" className="pr-4 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500" />
              </div>
              <div className="w-48 relative">
                
              </div>
              
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-6">
            <Button variant="outline" size="sm" className="border-white/20 text-slate-800 bg-slate-50">
              Contact
            </Button>
            {/* Mobile Search Button */}
            <Button variant="ghost" size="sm" className="md:hidden bg-slate-50 text-slate-800">
              <Search className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;