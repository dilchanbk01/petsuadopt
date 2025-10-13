import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

export interface FilterState {
  species: string;
  age: string;
  gender: string;
  size: string;
  location: string;
  searchQuery: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const filterContent = (
    <div className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={filters.location} onValueChange={(value) => onFiltersChange({ ...filters, location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
              </SelectContent>
            </Select>
          </div>

      <Button 
        onClick={() => onFiltersChange({ species: 'All', age: 'All', gender: 'All', size: 'All', location: 'All', searchQuery: '' })}
        variant="outline" 
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full mb-4">
        {/* Search Bar with Filter Icon */}
        <div className="flex gap-2 items-center">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 h-10">
                <Filter className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute z-10 w-full left-0 px-4 mt-2">
              <Card>
                <CardContent className="pt-4">
                  {filterContent}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="relative flex-1">
            <Input 
              placeholder="Search pets..." 
              value={filters.searchQuery}
              onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
              className="pr-10 h-10"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Pets</CardTitle>
        </CardHeader>
        <CardContent>
          {filterContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;