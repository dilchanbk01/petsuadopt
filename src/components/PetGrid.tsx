import PetCard from "./PetCard";
import goldenRetriever from "@/assets/pets/golden-retriever.jpg";
import orangeTabby from "@/assets/pets/orange-tabby.jpg";
import borderCollie from "@/assets/pets/border-collie.jpg";
import persianCat from "@/assets/pets/persian-cat.jpg";
import beagle from "@/assets/pets/beagle.jpg";
import calicoCat from "@/assets/pets/calico-cat.jpg";

const mockPets = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2Y",
    gender: "Male" as const,
    location: "New York",
    image: goldenRetriever,
    description: "Friendly and energetic golden retriever looking for an active family. Loves playing fetch and swimming.",
  },
  {
    id: "2",
    name: "Luna",
    type: "Cat",
    breed: "Orange Tabby",
    age: "1Y",
    gender: "Female" as const,
    location: "San Francisco",
    image: orangeTabby,
    description: "Playful kitten with beautiful orange fur. Loves to chase toys and cuddle with her humans.",
  },
  {
    id: "3",
    name: "Max",
    type: "Dog",
    breed: "Border Collie",
    age: "3Y",
    gender: "Male" as const,
    location: "Chicago",
    image: borderCollie,
    description: "Intelligent and loyal border collie. Great with kids and other pets. Needs daily exercise.",
  },
  {
    id: "4",
    name: "Princess",
    type: "Cat",
    breed: "Persian",
    age: "2Y",
    gender: "Female" as const,
    location: "Los Angeles",
    image: persianCat,
    description: "Elegant Persian cat with beautiful long fur. Calm and gentle personality, perfect for quiet homes.",
  },
  {
    id: "5",
    name: "Charlie",
    type: "Dog",
    breed: "Beagle",
    age: "4M",
    gender: "Male" as const,
    location: "Austin",
    image: beagle,
    description: "Adorable beagle puppy with lots of energy. Great with children and very social.",
  },
  {
    id: "6",
    name: "Patches",
    type: "Cat",
    breed: "Calico",
    age: "1Y",
    gender: "Female" as const,
    location: "Seattle",
    image: calicoCat,
    description: "Beautiful calico cat with unique markings. Independent but affectionate when she trusts you.",
  },
];

const PetGrid = () => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recent Listings</h2>
            <p className="text-muted-foreground">Showing 1-6 of 134 pets</p>
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground">
              <option>Recently Added</option>
              <option>Age (Youngest)</option>
              <option>Age (Oldest)</option>
              <option>Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPets.map((pet) => (
          <PetCard key={pet.id} {...pet} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-lg transition-colors">
          Load More Pets
        </button>
      </div>
    </div>
  );
};

export default PetGrid;