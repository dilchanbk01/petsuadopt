import { useState, useEffect } from 'react';
import PetCard from './PetCard';
import { supabase } from '@/integrations/supabase/client';

interface FilterState {
  species: string;
  age: string;
  gender: string;
  size: string;
}

interface PetGridProps {
  filters: FilterState;
}

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  species: string;
  size: string;
  color: string;
  description?: string;
  adoption_fee?: number;
  image_url?: string;
  is_adopted: boolean;
}

const PetGrid = ({ filters }: PetGridProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('is_adopted', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (petId: string) => {
    setFavorites(prev =>
      prev.includes(petId)
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  // Filter pets based on selected filters
  const filteredPets = pets.filter((pet) => {
    if (filters.species && filters.species !== 'All' && pet.species !== filters.species) {
      return false;
    }
    if (filters.age && filters.age !== 'All') {
      const ageInYears = pet.age / 12;
      if (filters.age === 'Young' && ageInYears > 2) return false;
      if (filters.age === 'Adult' && (ageInYears <= 2 || ageInYears > 7)) return false;
      if (filters.age === 'Senior' && ageInYears <= 7) return false;
    }
    if (filters.gender && filters.gender !== 'All' && pet.gender !== filters.gender) {
      return false;
    }
    if (filters.size && filters.size !== 'All' && pet.size !== filters.size) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Loading Pets...
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded-lg h-96"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Available Pets ({filteredPets.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            breed={pet.breed}
            age={Math.floor(pet.age / 12)}
            gender={pet.gender}
            image={pet.image_url || '/placeholder.svg'}
            isFavorite={favorites.includes(pet.id)}
            onToggleFavorite={() => toggleFavorite(pet.id)}
          />
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No pets found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default PetGrid;