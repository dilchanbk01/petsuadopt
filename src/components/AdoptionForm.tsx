import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

interface AdoptionFormProps {
  petId: string;
  petName: string;
  children: React.ReactNode;
}

const AdoptionForm = ({ petId, petName, children }: AdoptionFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adopter_name: '',
    adopter_email: '',
    adopter_phone: '',
    adopter_address: '',
    adoption_reason: '',
    experience_with_pets: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const adoptionData = {
        ...formData,
        pet_id: petId
      };

      const { error } = await supabase
        .from('adoption_requests')
        .insert(adoptionData);

      if (error) throw error;

      toast({
        title: "Adoption Request Submitted!",
        description: `Your adoption request for ${petName} has been submitted successfully. We'll contact you soon!`,
      });

      // Reset form and close dialog
      setFormData({
        adopter_name: '',
        adopter_email: '',
        adopter_phone: '',
        adopter_address: '',
        adoption_reason: '',
        experience_with_pets: ''
      });
      setOpen(false);
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      toast({
        title: "Error",
        description: "Failed to submit adoption request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Adopt {petName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adopter_name">Full Name *</Label>
              <Input
                id="adopter_name"
                value={formData.adopter_name}
                onChange={(e) => handleInputChange('adopter_name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="adopter_email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="adopter_email"
                  type="email"
                  value={formData.adopter_email}
                  onChange={(e) => handleInputChange('adopter_email', e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="adopter_phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="adopter_phone"
                  type="tel"
                  value={formData.adopter_phone}
                  onChange={(e) => handleInputChange('adopter_phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="adopter_address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="adopter_address"
                  value={formData.adopter_address}
                  onChange={(e) => handleInputChange('adopter_address', e.target.value)}
                  placeholder="Enter your address"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="adoption_reason">Why do you want to adopt {petName}?</Label>
            <Textarea
              id="adoption_reason"
              value={formData.adoption_reason}
              onChange={(e) => handleInputChange('adoption_reason', e.target.value)}
              placeholder="Tell us why you'd like to adopt this pet..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="experience_with_pets">Experience with Pets</Label>
            <Textarea
              id="experience_with_pets"
              value={formData.experience_with_pets}
              onChange={(e) => handleInputChange('experience_with_pets', e.target.value)}
              placeholder="Tell us about your experience with pets..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitting} 
              className="flex-1 bg-gradient-primary hover:bg-primary-dark"
            >
              {submitting ? 'Submitting...' : 'Submit Adoption Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionForm;