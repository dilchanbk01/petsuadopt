import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { PlusCircle, Users, Heart, ArrowLeft, LogOut, Trash2, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import logoImage from '@/assets/logo.png';
import EditPetForm from '@/components/EditPetForm';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ total: 0, adopted: 0, available: 0 });
  const [pets, setPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    description: '',
    medical_history: '',
    image_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchPets();
      fetchAdoptionRequests();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data: allPets } = await supabase.from('pets').select('is_adopted');
      if (allPets) {
        const total = allPets.length;
        const adopted = allPets.filter(pet => pet.is_adopted).length;
        const available = total - adopted;
        setStats({ total, adopted, available });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPets = async () => {
    try {
      const { data: allPets } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });
      if (allPets) {
        setPets(allPets);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const deletePet = async (petId: string) => {
    try {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', petId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Pet has been deleted successfully.",
      });

      fetchStats();
      fetchPets();
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast({
        title: "Error",
        description: "Failed to delete pet. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fetchAdoptionRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('adoption_requests')
        .select(`
          *,
          pets (name, breed, species)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdoptionRequests(data || []);
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    }
  };

  const updateAdoptionStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('adoption_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Adoption request ${status} successfully.`,
      });

      fetchAdoptionRequests();
    } catch (error) {
      console.error('Error updating adoption request:', error);
      toast({
        title: "Error",
        description: "Failed to update adoption request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin-auth');
  };

  if (!user) {
    return <Navigate to="/admin-auth" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const petData = {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: parseInt(formData.age),
        gender: formData.gender,
        size: 'Medium', // Default size since we removed the field
        color: formData.color,
        description: formData.description,
        medical_history: formData.medical_history,
        image_url: formData.image_url,
        created_by: user.id
      };

      const { error } = await supabase
        .from('pets')
        .insert(petData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Pet has been added successfully.",
      });

      // Reset form
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        color: '',
        description: '',
        medical_history: '',
        image_url: ''
      });

      // Refresh stats and pets list
      fetchStats();
      fetchPets();
    } catch (error) {
      console.error('Error adding pet:', error);
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src={logoImage} alt="Petsu Adopt Logo" className="w-8 h-8" loading="lazy" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Petsu Adopt</h1>
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pet Management</h1>
          <p className="text-muted-foreground">Add and manage pets available for adoption</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">In the system</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.available}</div>
              <p className="text-xs text-muted-foreground">Ready for adoption</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adopted</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.adopted}</div>
              <p className="text-xs text-muted-foreground">Happy families</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adoption Requests</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adoptionRequests.length}</div>
              <p className="text-xs text-muted-foreground">Pending applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Pet Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Pet Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter pet name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="species">Species *</Label>
                  <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Rabbit">Rabbit</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="breed">Breed *</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    placeholder="Enter breed"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age (in months) *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age in months"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Enter color"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the pet's personality and characteristics"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medical_history">Medical History</Label>
                <Textarea
                  id="medical_history"
                  value={formData.medical_history}
                  onChange={(e) => handleInputChange('medical_history', e.target.value)}
                  placeholder="Enter any medical history or special needs"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary hover:bg-primary-dark">
                {submitting ? 'Adding Pet...' : 'Add Pet'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Pets List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Manage Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pets.map((pet) => (
                <div key={pet.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {pet.image_url && (
                      <img 
                        src={pet.image_url} 
                        alt={pet.name} 
                        className="w-16 h-16 object-cover rounded-lg" 
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">{pet.breed} • {pet.species} • {pet.age} months • {pet.gender}</p>
                      <p className="text-xs text-muted-foreground">{pet.color}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <EditPetForm pet={pet} onPetUpdated={fetchPets} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePet(pet.id)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Adoption Requests */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Adoption Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adoptionRequests.map((request) => (
                <div key={request.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {request.adopter_name} wants to adopt {request.pets?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request.pets?.breed} • {request.pets?.species}
                      </p>
                      <div className="mt-2 text-sm">
                        <p><strong>Email:</strong> {request.adopter_email}</p>
                        <p><strong>Phone:</strong> {request.adopter_phone}</p>
                        {request.adopter_address && (
                          <p><strong>Address:</strong> {request.adopter_address}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAdoptionStatus(request.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAdoptionStatus(request.id, 'rejected')}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status !== 'pending' && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {request.adoption_reason && (
                    <div className="mt-3 p-3 bg-muted rounded">
                      <p className="text-sm"><strong>Why they want to adopt:</strong></p>
                      <p className="text-sm text-muted-foreground mt-1">{request.adoption_reason}</p>
                    </div>
                  )}
                  
                  {request.experience_with_pets && (
                    <div className="mt-3 p-3 bg-muted rounded">
                      <p className="text-sm"><strong>Pet experience:</strong></p>
                      <p className="text-sm text-muted-foreground mt-1">{request.experience_with_pets}</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-3">
                    Submitted on {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {adoptionRequests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No adoption requests yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;