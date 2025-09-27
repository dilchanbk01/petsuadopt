import { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FilterSidebar, { type FilterState } from '@/components/FilterSidebar';
import PetGrid from '@/components/PetGrid';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    species: 'All',
    age: 'All',
    gender: 'All',
    size: 'All'
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <HeroBanner />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-80 lg:flex-shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="flex-1 min-w-0">
            <PetGrid filters={filters} />
          </div>
        </div>
      </div>
      
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Index;