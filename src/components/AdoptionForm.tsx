import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Phone, Mail, CheckCircle } from 'lucide-react';

interface AdoptionFormProps {
  petId: string;
  petName: string;
  children: React.ReactNode;
}

const AdoptionForm = ({ petId, petName, children }: AdoptionFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adopter_name: '',
    adopter_email: '',
    adopter_phone: ''
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

      // Send email notification to admin
      await supabase.functions.invoke('send-adoption-notification', {
        body: {
          petName,
          adopter_name: formData.adopter_name,
          adopter_email: formData.adopter_email,
          adopter_phone: formData.adopter_phone
        }
      });

      // Reset form and close dialog
      setFormData({
        adopter_name: '',
        adopter_email: '',
        adopter_phone: ''
      });
      setOpen(false);
      setSuccessOpen(true);
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
    <>
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

    <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            Adoption Request Submitted!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base pt-2">
            Your adoption request for <span className="font-semibold text-foreground">{petName}</span> has been submitted successfully. 
            Our team will review your application and contact you soon at <span className="font-semibold text-foreground">{formData.adopter_email}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <Button 
            onClick={() => setSuccessOpen(false)}
            className="w-full sm:w-auto bg-gradient-primary hover:bg-primary-dark"
          >
            Got it, thanks!
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default AdoptionForm;