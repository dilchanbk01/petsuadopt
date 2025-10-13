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
    url: 'https://petsu.in/vet-consultation'
  }, {
    label: 'Grooming',
    url: 'https://petsu.in/groomers'
  }, {
    label: 'Pet Essentials',
    url: 'https://petsu.in/pet-essentials'
  }, {
    label: 'Blogs',
    url: 'https://petsu.in/blogs'
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
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Profile Icon */}
          <div className="flex items-center space-x-3">
          </div>
        </div>
      </div>
    </header>;
};
export default Header;