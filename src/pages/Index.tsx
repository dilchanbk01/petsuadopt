import { useState, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import { type FilterState } from '@/components/FilterSidebar';

const FilterSidebar = lazy(() => import('@/components/FilterSidebar'));
const PetGrid = lazy(() => import('@/components/PetGrid'));
const Footer = lazy(() => import('@/components/Footer'));
const BottomNavigation = lazy(() => import('@/components/BottomNavigation'));
const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    species: 'All',
    age: 'All',
    gender: 'All',
    size: 'All',
    location: 'All',
    searchQuery: ''
  });
  return <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <HeroBanner />
      
      {/* Main Content */}
      <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Loading...</div>}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-50 lg:flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
            <div className="flex-1 min-w-0">
              <PetGrid filters={filters} />
            </div>
          </div>
        </div>
        
        <Footer />
        <BottomNavigation />
      </Suspense>
    </div>;
};
export default Index;