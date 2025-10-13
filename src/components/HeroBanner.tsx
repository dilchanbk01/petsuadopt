import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
}
const HeroBanner = () => {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchBanners();
  }, []);
  const fetchBanners = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('hero_banners').select('*').eq('is_active', true).order('display_order');
      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);
  if (isLoading) {
    return <section className="bg-gradient-hero py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-12 bg-muted animate-pulse rounded mb-6"></div>
            <div className="h-6 bg-muted animate-pulse rounded max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>;
  }
  if (banners.length === 0) {
    return <section className="bg-gradient-hero py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Find Your Perfect
              <span className="text-primary"> Companion</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with loving pets in need of homes. Every adoption saves a life and creates an unbreakable bond.
            </p>
          </div>
        </div>
      </section>;
  }
  const currentBanner = banners[currentIndex];
  return <section className="relative bg-gradient-hero py-16 md:py-24 border-b border-border overflow-hidden">
      {currentBanner.image_url && <div className="absolute inset-0 z-0">
          <img src={currentBanner.image_url} alt={currentBanner.title} className="w-full h-full object-cover opacity-20" loading="eager" fetchPriority="high" />
        </div>}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            {currentBanner.title}
          </h1>
          {currentBanner.subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
              {currentBanner.subtitle}
            </p>}
          
          {currentBanner.cta_text && currentBanner.cta_link && <Link to={currentBanner.cta_link}>
              <Button size="lg" className="bg-gradient-primary hover:bg-primary-dark animate-scale-in">
                {currentBanner.cta_text}
              </Button>
            </Link>}
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && <>
          <Button variant="ghost" size="icon" onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" aria-label="Previous slide">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" aria-label="Next slide">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>}

      {/* Dots Indicator */}
      {banners.length > 1 && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-white/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
        </div>}
    </section>;
};
export default HeroBanner;