import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo.png';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return <header className={`bg-header-brand shadow-soft sticky top-0 z-50 rounded-full max-w-[95%] mx-auto mt-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
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

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-header-brand border-none">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navItems.map(item => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-colors text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>;
};
export default Header;