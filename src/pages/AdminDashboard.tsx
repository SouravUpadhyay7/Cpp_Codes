import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, LogOut, Calendar, Clock, User, FileText, Upload, Image } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  teacher: string;
  location: string;
  image?: string; // Base64 encoded image or URL
  createdAt: string;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    teacher: '',
    location: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Check admin authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('tbit_admin_logged_in');
    if (!isLoggedIn) {
      navigate('/tbitadminlogin');
    }
    
    // Load events from localStorage
    const savedEvents = localStorage.getItem('tbit_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, [navigate]);

  const saveEvents = (newEvents: Event[]) => {
    localStorage.setItem('tbit_events', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select a valid image file' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setEventForm(prev => ({
          ...prev,
          image: base64String
        }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventForm(prev => ({
      ...prev,
      image: ''
    }));
    setImagePreview('');
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      teacher: '',
      location: '',
      image: ''
    });
    setImagePreview('');
    setIsAddingEvent(false);
    setEditingEvent(null);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventForm,
      createdAt: new Date().toISOString()
    };

    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    
    setMessage({ type: 'success', text: 'Event added successfully!' });
    resetForm();
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      teacher: event.teacher,
      location: event.location,
      image: event.image || ''
    });
    setImagePreview(event.image || '');
    setIsAddingEvent(true);
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingEvent) return;

    const updatedEvents = events.map(event =>
      event.id === editingEvent.id
        ? { ...event, ...eventForm }
        : event
    );

    saveEvents(updatedEvents);
    
    setMessage({ type: 'success', text: 'Event updated successfully!' });
    resetForm();
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      saveEvents(updatedEvents);
      
      setMessage({ type: 'success', text: 'Event deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tbit_admin_logged_in');
    localStorage.removeItem('tbit_admin_login_time');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="floating-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-orbitron font-bold text-gradient">
              SYNAPSE Admin Dashboard
            </h1>
            <p className="text-foreground/70 font-space mt-2">
              Manage upcoming events for TBIT AIML Club
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="glass-button border-electric-red/30 text-electric-red hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Message Alert */}
        {message.text && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-neon-green/30 bg-neon-green/10' : 'border-electric-red/30 bg-electric-red/10'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-neon-green' : 'text-electric-red'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Add Event Button */}
        {!isAddingEvent && (
          <div className="mb-8">
            <Button
              onClick={() => setIsAddingEvent(true)}
              className="glass-button text-white font-orbitron font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </div>
        )}

        {/* Add/Edit Event Form */}
        {isAddingEvent && (
          <Card className="glass-card-premium mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-gradient">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </CardTitle>
              <CardDescription>
                Fill in the event details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={eventForm.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Machine Learning Workshop"
                      className="glass-button"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Teacher/Instructor *</Label>
                    <Input
                      id="teacher"
                      name="teacher"
                      value={eventForm.teacher}
                      onChange={handleInputChange}
                      placeholder="e.g., Dr. Smith"
                      className="glass-button"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={eventForm.description}
                    onChange={handleInputChange}
                    placeholder="Describe the event details..."
                    className="glass-button min-h-[100px]"
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label htmlFor="image">Event Banner Image (Optional)</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="glass-button file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyber-blue file:text-white hover:file:bg-cyber-blue/80"
                      />
                      <div className="flex items-center text-sm text-foreground/60">
                        <Upload className="w-4 h-4 mr-1" />
                        Max 5MB
                      </div>
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative">
                        <div className="glass-card-subtle p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-sm text-neon-green">
                              <Image className="w-4 h-4 mr-1" />
                              Image Preview
                            </div>
                            <Button
                              type="button"
                              onClick={removeImage}
                              size="sm"
                              variant="outline"
                              className="glass-button border-electric-red/30 text-electric-red hover:bg-electric-red/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <img
                            src={imagePreview}
                            alt="Event banner preview"
                            className="w-full h-48 object-cover rounded-lg border border-cyber-blue/30"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={eventForm.date}
                      onChange={handleInputChange}
                      className="glass-button"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={eventForm.time}
                      onChange={handleInputChange}
                      className="glass-button"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={eventForm.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Lab 101"
                      className="glass-button"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="glass-button text-white font-orbitron"
                  >
                    {editingEvent ? 'Update Event' : 'Add Event'}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="glass-button border-foreground/30"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Events List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-orbitron font-bold text-gradient">
            Upcoming Events ({events.length})
          </h2>
          
          {events.length === 0 ? (
            <Card className="glass-card-subtle">
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/70 font-space">
                  No events added yet. Click "Add New Event" to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id} className="glass-card-premium">
                  <CardContent className="p-6">
                    {/* Event Image */}
                    {event.image && (
                      <div className="mb-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg border border-cyber-blue/30"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-orbitron font-bold text-gradient mb-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {event.teacher}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => handleEditEvent(event)}
                          size="sm"
                          variant="outline"
                          className="glass-button border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteEvent(event.id)}
                          size="sm"
                          variant="outline"
                          className="glass-button border-electric-red/30 text-electric-red hover:bg-electric-red/10"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-3 leading-relaxed">{event.description}</p>

                    <div className="text-sm text-foreground/60">
                      <strong>Location:</strong> {event.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
