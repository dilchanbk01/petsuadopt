import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const FilterSidebar = () => {
  return (
    <div className="w-64 space-y-6">
      {/* Pet Type */}
      <Card className="p-4 bg-gradient-card border-border shadow-soft">
        <h3 className="font-semibold text-foreground mb-3">Pet Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="all-pets" name="pet-type" className="text-primary" defaultChecked />
            <label htmlFor="all-pets" className="text-sm text-foreground">All Pets</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="dogs" name="pet-type" className="text-primary" />
            <label htmlFor="dogs" className="text-sm text-foreground">Dogs</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="cats" name="pet-type" className="text-primary" />
            <label htmlFor="cats" className="text-sm text-foreground">Cats</label>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-gradient-card border-border shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Filters</h3>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
            Reset
          </Button>
        </div>

        <div className="space-y-4">
          {/* Age */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Age</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="puppy" className="text-primary" />
                <label htmlFor="puppy" className="text-sm text-foreground">Puppy/Kitten</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="young" className="text-primary" />
                <label htmlFor="young" className="text-sm text-foreground">Young</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="adult" className="text-primary" />
                <label htmlFor="adult" className="text-sm text-foreground">Adult</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="senior" className="text-primary" />
                <label htmlFor="senior" className="text-sm text-foreground">Senior</label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Gender */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Gender</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="male" className="text-primary" />
                <label htmlFor="male" className="text-sm text-foreground">Male</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="female" className="text-primary" />
                <label htmlFor="female" className="text-sm text-foreground">Female</label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Health Status */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Health Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="vaccinated" className="text-primary" />
                <label htmlFor="vaccinated" className="text-sm text-foreground">Vaccinated</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sterilized" className="text-primary" />
                <label htmlFor="sterilized" className="text-sm text-foreground">Sterilized</label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Filters */}
      <Card className="p-4 bg-gradient-card border-border shadow-soft">
        <h3 className="font-semibold text-foreground mb-3">Active Filters</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            All Pets
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default FilterSidebar;