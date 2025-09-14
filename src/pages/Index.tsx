import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FilterSidebar, { type FilterState } from '@/components/FilterSidebar';
import PetGrid from '@/components/PetGrid';
import Footer from '@/components/Footer';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    species: 'All',
    age: 'All',
    gender: 'All',
    size: 'All'
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          <PetGrid filters={filters} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;