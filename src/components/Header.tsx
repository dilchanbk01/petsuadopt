import { Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo.png';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const navItems = [{
    label: 'Vet Consultation',
    path: '/vet-consultation'
  }, {
    label: 'Grooming',
    path: '/grooming'
  }, {
    label: 'Pet Essentials',
    path: '/pet-essentials'
  }, {
    label: 'Blogs',
    path: '/blogs'
  }];
  return <header className="bg-header-brand shadow-soft sticky top-0 z-50 rounded-full max-w-[95%] mx-auto mt-4">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src={logoImage} alt="Petsu Adopt Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-white font-medium text-base text-left">Adoption</h1>
            </div>
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-white hover:text-white/80 transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact & Profile Section */}
          <div className="flex items-center space-x-3">
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:text-white hover:bg-white/10">
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
                  <a href="tel:+15551234567" className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call us</p>
                      <p className="font-semibold group-hover:text-primary transition-colors">+1 (555) 123-4567</p>
                    </div>
                  </a>
                  
                  <a href="mailto:hello@pawshome.com" className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors group">
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

            {/* Profile Icon */}
            
          </div>
        </div>
      </div>
    </header>;
};
export default Header;