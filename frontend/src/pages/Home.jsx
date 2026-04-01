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
import { Leaf, Shield, Droplet, Heart, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { submitWaitlistForm } from '../services/mockData';

const products = [
  {
    id: 1,
    name: 'Onesies',
    description: 'Soft, breathable onesies in natural colors',
    image: 'https://images.pexels.com/photos/5982301/pexels-photo-5982301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 2,
    name: 'Rompers',
    description: 'Comfortable rompers for all-day play',
    image: 'https://images.pexels.com/photos/36709406/pexels-photo-36709406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 3,
    name: 'Jhablas',
    description: 'Traditional jhablas with modern comfort',
    image: 'https://images.pexels.com/photos/15961868/pexels-photo-15961868.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 4,
    name: 'Swaddles',
    description: 'Gentle swaddles for peaceful sleep',
    image: 'https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBiYWJ5JTIwZmFicmljfGVufDB8fHx8MTc3NTAzNTYxMHww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 5,
    name: 'Sleepwear',
    description: 'Cozy sleepwear for restful nights',
    image: 'https://images.pexels.com/photos/6849333/pexels-photo-6849333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 6,
    name: 'Pants',
    description: 'Stretchy, comfortable pants for active babies',
    image: 'https://images.pexels.com/photos/30435354/pexels-photo-30435354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 7,
    name: 'Tank Tops',
    description: 'Lightweight tank tops for warm days',
    image: 'https://images.unsplash.com/photo-1580835619786-7f0747475dc7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxiYWJ5JTIwb25lc2llfGVufDB8fHx3aGl0ZXwxNzc1MDM4OTM5fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 8,
    name: 'Mittens',
    description: 'Soft mittens to protect delicate hands',
    image: 'https://images.pexels.com/photos/29234754/pexels-photo-29234754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 9,
    name: 'Caps',
    description: 'Gentle caps for warmth and comfort',
    image: 'https://images.pexels.com/photos/16053828/pexels-photo-16053828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 10,
    name: 'Socks',
    description: 'Non-slip socks for tiny feet',
    image: 'https://images.unsplash.com/photo-1591909242139-83cc3b9217c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxiYWJ5JTIwc2xlZXB3ZWFyfGVufDB8fHx3aGl0ZXwxNzc1MDM4OTU3fDA&ixlib=rb-4.1.0&q=85'
  }
];

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    babyAge: '',
    location: '',
    chemicalConcern: '',
    firstImpression: '',
    openToConversation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const countryCodes = [
    { code: '+91', country: '🇮🇳 India', digits: 10, startsWithDigits: ['6', '7', '8', '9'] },
    { code: '+971', country: '🇦🇪 UAE', digits: 9 },
    { code: '+966', country: '🇸🇦 Saudi Arabia', digits: 9 },
    { code: '+974', country: '🇶🇦 Qatar', digits: 8 },
    { code: '+965', country: '🇰🇼 Kuwait', digits: 8 },
    { code: '+968', country: '🇴🇲 Oman', digits: 8 },
    { code: '+65', country: '🇸🇬 Singapore', digits: 8 },
    { code: '+60', country: '🇲🇾 Malaysia', digits: 9 },
    { code: '+66', country: '🇹🇭 Thailand', digits: 9 },
    { code: '+62', country: '🇮🇩 Indonesia', digits: 10 },
    { code: '+1', country: '🇺🇸 United States', digits: 10 },
    { code: '+1', country: '🇨🇦 Canada', digits: 10 },
    { code: '+61', country: '🇦🇺 Australia', digits: 9 },
    { code: '+64', country: '🇳🇿 New Zealand', digits: 9 },
    { code: '+44', country: '🇬🇧 United Kingdom', digits: 10 },
    { code: '+49', country: '🇩🇪 Germany', digits: 10 },
    { code: '+33', country: '🇫🇷 France', digits: 9 },
    { code: '+31', country: '🇳🇱 Netherlands', digits: 9 },
    { code: '+34', country: '🇪🇸 Spain', digits: 9 },
    { code: '+39', country: '🇮🇹 Italy', digits: 10 },
    { code: '+41', country: '🇨🇭 Switzerland', digits: 9 },
    { code: '+32', country: '🇧🇪 Belgium', digits: 9 },
    { code: '+43', country: '🇦🇹 Austria', digits: 10 },
    { code: '+46', country: '🇸🇪 Sweden', digits: 9 },
    { code: '+47', country: '🇳🇴 Norway', digits: 8 },
    { code: '+45', country: '🇩🇰 Denmark', digits: 8 },
    { code: '+353', country: '🇮🇪 Ireland', digits: 9 },
    { code: '+351', country: '🇵🇹 Portugal', digits: 9 },
    { code: '+48', country: '🇵🇱 Poland', digits: 9 },
    { code: '+30', country: '🇬🇷 Greece', digits: 10 },
    { code: '+358', country: '🇫🇮 Finland', digits: 9 },
    { code: '+81', country: '🇯🇵 Japan', digits: 10 },
    { code: '+86', country: '🇨🇳 China', digits: 11 },
    { code: '+886', country: '🇹🇼 Taiwan', digits: 9 },
    { code: '+852', country: '🇭🇰 Hong Kong', digits: 8 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate phone number if it's being changed
    if (name === 'phone') {
      validatePhoneNumber(value, formData.countryCode);
    }
  };

  const validatePhoneNumber = (phone, countryCode) => {
    if (!phone) {
      setPhoneError('');
      return true;
    }
    
    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Find the country configuration
    const countryConfig = countryCodes.find(c => c.code === countryCode);
    
    if (!countryConfig) {
      setPhoneError('Invalid country code selected');
      return false;
    }
    
    // Check if phone contains only digits
    if (!/^\d+$/.test(cleanPhone)) {
      setPhoneError('Phone number should contain only digits');
      return false;
    }
    
    // Check digit length
    if (cleanPhone.length !== countryConfig.digits) {
      setPhoneError(`Phone number must be ${countryConfig.digits} digits for ${countryConfig.country}`);
      return false;
    }
    
    // Special validation for India - must start with 6, 7, 8, or 9
    if (countryCode === '+91' && countryConfig.startsWithDigits) {
      const firstDigit = cleanPhone[0];
      if (!countryConfig.startsWithDigits.includes(firstDigit)) {
        setPhoneError('Indian mobile numbers must start with 6, 7, 8, or 9');
        return false;
      }
    }
    
    setPhoneError('');
    return true;
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Re-validate phone if country code changes
    if (field === 'countryCode' && formData.phone) {
      validatePhoneNumber(formData.phone, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.babyAge || !formData.location || !formData.chemicalConcern) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if user wants to talk and phone is required
    if (formData.openToConversation === 'yes' && !formData.phone) {
      toast.error('Please enter your phone number so we can reach out to you');
      return;
    }

    // Validate phone number if provided
    if (formData.phone && !validatePhoneNumber(formData.phone, formData.countryCode)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Combine country code and phone number for submission
      const submissionData = {
        ...formData,
        phone: formData.phone ? `${formData.countryCode}${formData.phone}` : ''
      };
      
      const result = await submitWaitlistForm(submissionData);
      if (result.success) {
        // Show different success messages based on conversation preference
        if (formData.openToConversation === 'yes') {
          toast.success("You're on the list and you're now part of our founding circle. We'll reach out personally within a few days to set up a quick conversation. As a thank you, you'll get exclusive first-access pricing when untocs launches.", {
            duration: 8000,
          });
        } else {
          toast.success("You're on the list. We'll be in touch when untocs launches.", {
            duration: 5000,
          });
        }
        setFormData({ 
          firstName: '', 
          email: '', 
          phone: '',
          babyAge: '', 
          location: '', 
          chemicalConcern: '',
          firstImpression: '',
          openToConversation: ''
        });
        setPhoneError('');
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
              Cloths are treated and dyed with toxic chemicals. Your baby wears it 16 hours a day.
            </h1>
           <p className="hero-subline">
            Over 8,000 synthetic chemicals are used in textile manufacturing including synthetic dyes, formaldehyde finishes, and chemical softeners.
            </p>
            <p className="hero-subline">
              Many cause immediate reactions like eczema, allergies, and textile dermatitis. Others are known carcinogens and endocrine disruptors, linked to long-term reproductive and developmental harm. Your baby's skin absorbs more of this than you'd expect.
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

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2>Our Collection</h2>
          <p>Pure, chemical-free clothing for every moment of your baby's day</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="waitlist-container">
          <div className="waitlist-header">
            <h2>Be the first to know</h2>
            <p>We're launching soon. Join the waitlist and we'll be in touch when untocs is ready.</p>
            <div className="india-notice">
              <MapPin size={18} />
              <span>Launching soon in India</span>
            </div>
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
              <Label htmlFor="phone">Phone number</Label>
              <div className="phone-input-wrapper">
                <Select value={formData.countryCode} onValueChange={(value) => handleSelectChange('countryCode', value)}>
                  <SelectTrigger className="country-code-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="country-code-dropdown">
                    {countryCodes.map((country, index) => (
                      <SelectItem key={`${country.code}-${index}`} value={country.code}>
                        {country.country} {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="phone-number-input"
                />
              </div>
              {phoneError && <span className="error-message">{phoneError}</span>}
            </div>

            <div className="form-group">
              <Label htmlFor="babyAge">Baby's age *</Label>
              <Select value={formData.babyAge} onValueChange={(value) => handleSelectChange('babyAge', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expecting">Expecting</SelectItem>
                  <SelectItem value="0-6">0–6 months</SelectItem>
                  <SelectItem value="6-12">6–12 months</SelectItem>
                  <SelectItem value="1-2">1–2 years</SelectItem>
                  <SelectItem value="2+">2+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label htmlFor="location">Your city *</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Enter your city"
              />
            </div>

            <div className="form-divider"></div>

            <div className="form-group">
              <Label htmlFor="chemicalConcern">How concerned are you about chemicals in your baby's clothing? *</Label>
              <Select value={formData.chemicalConcern} onValueChange={(value) => handleSelectChange('chemicalConcern', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your concern level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-concerned">Very concerned</SelectItem>
                  <SelectItem value="somewhat-concerned">Somewhat concerned</SelectItem>
                  <SelectItem value="not-thought">Not thought about it until now</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label htmlFor="firstImpression">What's your first impression of untocs?</Label>
              <Textarea
                id="firstImpression"
                name="firstImpression"
                value={formData.firstImpression}
                onChange={handleInputChange}
                placeholder="Share your thoughts..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="openToConversation" className="conversation-label">
                We'd love to learn more about your experience as a parent. Early supporters get exclusive first-access pricing at launch. Would you be open to a 15-minute conversation with us?
              </Label>
              <Select value={formData.openToConversation} onValueChange={(value) => handleSelectChange('openToConversation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, I'm happy to talk</SelectItem>
                  <SelectItem value="skip">Skip for now</SelectItem>
                </SelectContent>
              </Select>
              {formData.openToConversation === 'yes' && !formData.phone && (
                <p className="phone-reminder">Please add your phone number above so we can reach out to you.</p>
              )}
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
