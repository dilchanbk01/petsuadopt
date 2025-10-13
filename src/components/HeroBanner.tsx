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
  return;
};
export default HeroBanner;