import { Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
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
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20 text-slate-800 bg-slate-50">
                  Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                  <DialogDescription>
                    Get in touch with us through phone or email
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <a 
                    href="tel:+15551234567" 
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call us</p>
                      <p className="font-semibold group-hover:text-primary transition-colors">+1 (555) 123-4567</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:hello@pawshome.com" 
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email us</p>
                      <p className="font-semibold group-hover:text-primary transition-colors">hello@pawshome.com</p>
                    </div>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
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