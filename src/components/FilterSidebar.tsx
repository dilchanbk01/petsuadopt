import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FilterState {
  species: string;
  age: string;
  gender: string;
  size: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Pets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Select value={filters.species} onValueChange={(value) => onFiltersChange({ ...filters, species: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Species</SelectItem>
                <SelectItem value="Dog">Dogs</SelectItem>
                <SelectItem value="Cat">Cats</SelectItem>
                <SelectItem value="Rabbit">Rabbits</SelectItem>
                <SelectItem value="Bird">Birds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Select value={filters.age} onValueChange={(value) => onFiltersChange({ ...filters, age: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Ages</SelectItem>
                <SelectItem value="Young">Young (0-2 years)</SelectItem>
                <SelectItem value="Adult">Adult (2-7 years)</SelectItem>
                <SelectItem value="Senior">Senior (7+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={filters.gender} onValueChange={(value) => onFiltersChange({ ...filters, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select value={filters.size} onValueChange={(value) => onFiltersChange({ ...filters, size: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sizes</SelectItem>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={() => onFiltersChange({ species: 'All', age: 'All', gender: 'All', size: 'All' })}
            variant="outline" 
            className="w-full"
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;