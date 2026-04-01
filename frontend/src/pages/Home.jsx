import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Leaf, Shield, Droplet, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { submitWaitlistForm } from '../services/mockData';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    babyAge: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, babyAge: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.babyAge) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitWaitlistForm(formData);
      if (result.success) {
        toast.success("You're on the list. We'll be in touch when untocs launches. — the untocs team", {
          duration: 5000,
        });
        setFormData({ firstName: '', email: '', babyAge: '', comments: '' });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">
            <Leaf className="logo-icon" />
            <span>untocs</span>
          </div>
          <Button onClick={scrollToWaitlist} className="nav-cta">
            Join the Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Conventional baby clothing is soaked in toxic chemicals. Your baby wears it 16 hours a day.
            </h1>
            <p className="hero-subline">
              Synthetic dyes, formaldehyde finishes, chemical softeners — none of it disclosed on any label. 
              Over 8,000 synthetic chemicals are used in conventional textile manufacturing. Not one is required 
              to appear on the tag.
            </p>
            <Button onClick={scrollToWaitlist} size="lg" className="hero-cta">
              Join the Waitlist
            </Button>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/35727373/pexels-photo-35727373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
              alt="Pure organic baby clothing"
            />
          </div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="ticker-strip">
        <div className="ticker-content">
          <span>No toxic dyes</span>
          <span className="ticker-dot">·</span>
          <span>No formaldehyde finishes</span>
          <span className="ticker-dot">·</span>
          <span>No optical brighteners</span>
          <span className="ticker-dot">·</span>
          <span>No heavy metals</span>
          <span className="ticker-dot">·</span>
          <span>No PFAS</span>
          <span className="ticker-dot">·</span>
          <span>Nothing hidden</span>
          <span className="ticker-dot">·</span>
          <span>No toxic dyes</span>
          <span className="ticker-dot">·</span>
          <span>No formaldehyde finishes</span>
          <span className="ticker-dot">·</span>
          <span>No optical brighteners</span>
          <span className="ticker-dot">·</span>
          <span>No heavy metals</span>
          <span className="ticker-dot">·</span>
          <span>No PFAS</span>
          <span className="ticker-dot">·</span>
          <span>Nothing hidden</span>
        </div>
      </div>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="solution-header">
          <h2>We do things differently</h2>
          <p className="solution-subline">
            untocs starts where other brands stop. We control every step — the fibre, the dye, the finish. 
            No synthetic chemicals enter our process at any stage. What you get is clothing that is pure from 
            the first thread to the last stitch.
          </p>
        </div>

        <div className="solution-cards">
          {/* Card 1 */}
          <div className="solution-card">
            <div className="card-icon">
              <Shield size={32} />
            </div>
            <h3>Zero toxic chemicals</h3>
            <p>
              Most baby clothing is treated with synthetic dyes, formaldehyde finishes, and optical brighteners. 
              Brands aren't required to disclose this. untocs is built around what we leave out — from raw material 
              to final stitch. Every untocs garment carries zero toxic chemical treatments. Ever.
            </p>
            <div className="card-image">
              <img 
                src="https://images.pexels.com/photos/4964277/pexels-photo-4964277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Chemical-free baby clothing"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="solution-card">
            <div className="card-icon">
              <Heart size={32} />
            </div>
            <h3>Built for the most sensitive skin</h3>
            <p>
              Infant skin is 30% thinner than adult skin. It doesn't block what touches it — it absorbs it. 
              Your baby is in direct skin contact with clothing all day and through the night. Every untocs 
              decision starts from that fact.
            </p>
            <div className="card-image">
              <img 
                src="https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBiYWJ5JTIwZmFicmljfGVufDB8fHx8MTc3NTAzNTYxMHww&ixlib=rb-4.1.0&q=85" 
                alt="Soft pure cotton fabric"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="solution-card">
            <div className="card-icon">
              <Droplet size={32} />
            </div>
            <h3>How we dye our clothes</h3>
            <p>
              Most brands use synthetic azo dyes loaded with heavy metals and carcinogens. We don't. 
              Every untocs garment is coloured using plant-based botanicals rooted in India's textile tradition — 
              each chosen because it carries zero toxic risk against your baby's skin:
            </p>
            <div className="botanical-list">
              <div className="botanical-item">
                <strong>Turmeric</strong> — anti-inflammatory, calms sensitive skin
              </div>
              <div className="botanical-item">
                <strong>Neem</strong> — antimicrobial, natural fabric protection
              </div>
              <div className="botanical-item">
                <strong>Indigo</strong> — cooling, reduces heat and irritation
              </div>
              <div className="botanical-item">
                <strong>Tulsi</strong> — enhances textile hygiene naturally
              </div>
              <div className="botanical-item">
                <strong>Pomegranate</strong> — natural UV resistance
              </div>
            </div>
            <div className="card-image">
              <img 
                src="https://images.pexels.com/photos/6850873/pexels-photo-6850873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Natural botanical dyes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="waitlist-container">
          <div className="waitlist-header">
            <h2>Be the first to know</h2>
            <p>We're launching soon in India. Join the waitlist and we'll be in touch when untocs is ready.</p>
          </div>

          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="form-group">
              <Label htmlFor="firstName">First name *</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Your first name"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="babyAge">Baby's age *</Label>
              <Select value={formData.babyAge} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-6">0–6 months</SelectItem>
                  <SelectItem value="6-12">6–12 months</SelectItem>
                  <SelectItem value="1-2">1–2 years</SelectItem>
                  <SelectItem value="expecting">Expecting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label htmlFor="comments">What made you look this up today? (Optional)</Label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>

            <Button type="submit" size="lg" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Count Me In'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Leaf className="logo-icon" />
            <span>untocs</span>
          </div>
          <p className="footer-text">No spam. Just updates when we launch.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
