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
import { Shield, Droplet, Heart, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { submitWaitlistForm } from '../services/mockData';

// Country codes configuration
const COUNTRY_CODES = [
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
  { code: '+1', country: '🇨🇦 Canada', digits: 10, label: 'CA' },
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

const products = [
  { id: 1, name: 'Onesie', category: 'Clothing', image: '/assets/onsie.jpeg' },
  { id: 2, name: 'Bodysuit', category: 'Clothing', image: '/assets/Bodysuit.jpeg' },
  { id: 3, name: 'Romper', category: 'Clothing', image: '/assets/romper.jpeg' },
  { id: 4, name: 'Wrap Top', category: 'Clothing', image: '/assets/wrap top.jpeg' },
  { id: 5, name: 'Tank Top', category: 'Clothing', image: '/assets/tank top.jpeg' },
  { id: 6, name: 'Pants', category: 'Clothing', image: '/assets/pants.jpeg' },
  { id: 7, name: 'Mittens', category: 'Accessories', image: '/assets/mittens.jpeg' },
  { id: 8, name: 'Socks', category: 'Accessories', image: '/assets/socks.jpeg' },
  { id: 9, name: 'Booties', category: 'Accessories', image: '/assets/booties.jpeg' },
  { id: 10, name: 'Bib', category: 'Accessories', image: '/assets/bib.jpeg' },
  { id: 11, name: 'Hooded Towel', category: 'Care', image: '/assets/towel.jpeg' },
  { id: 12, name: 'Detergent', category: 'Care', image: '/assets/detergent.jpeg' },
];

const CATEGORIES = ['All', 'Clothing', 'Accessories', 'Care'];


const LittleSage = () => {
  React.useEffect(() => {
    document.title = 'Little Sage — Natural, Toxin-Free Baby Clothing';
  }, []);

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
  const [activeCategory, setActiveCategory] = useState('All');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'phone') {
      validatePhoneNumber(value, formData.countryCode);
    }
  };

  const validatePhoneNumber = (phone, countryCode) => {
    if (!phone) {
      setPhoneError('');
      return true;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const countryConfig = COUNTRY_CODES.find(c => c.code === countryCode);
    if (!countryConfig) {
      setPhoneError('Invalid country code selected');
      return false;
    }
    if (!/^\d+$/.test(cleanPhone)) {
      setPhoneError('Phone number should contain only digits');
      return false;
    }
    if (cleanPhone.length !== countryConfig.digits) {
      setPhoneError(`Phone number must be ${countryConfig.digits} digits for ${countryConfig.country}`);
      return false;
    }
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
    if (field === 'countryCode' && formData.phone) {
      validatePhoneNumber(formData.phone, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.babyAge || !formData.location || !formData.chemicalConcern) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.openToConversation === 'yes' && !formData.phone) {
      toast.error('Please enter your phone number so we can reach out to you');
      return;
    }
    if (formData.phone && !validatePhoneNumber(formData.phone, formData.countryCode)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        phone: formData.phone ? `${formData.countryCode}${formData.phone}` : ''
      };

      const result = await submitWaitlistForm(submissionData, { source: 'little-sage' });
      if (result.success) {
        if (formData.openToConversation === 'yes') {
          toast.success("You're on the list and you're now part of our founding circle. We'll reach out personally within a few days to set up a quick conversation. As a thank you, you'll get exclusive first-access pricing when Little Sage launches.", {
            duration: 8000,
          });
        } else {
          toast.success("You're on the list. We'll be in touch when Little Sage launches.", {
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
    <div className="little-sage-page">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">
            <img src="/little-sage-logo.png" alt="Little Sage" className="logo-image" />
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
              Natural and Herbal dyed, toxin-free.
            </h1>
            <p className="hero-subline">
              A transparent promise of purity with nothing hidden and nothing harmful, starting with your baby’s first layers and expanding into every corner of the world they grow up in.
            </p>
            <Button onClick={scrollToWaitlist} size="lg" className="hero-cta">
              Join the Waitlist
            </Button>
          </div>
          <div className="hero-image">
            <img
              src="/assets/hero image.jpeg"
              alt="Pure organic baby clothing"
            />
          </div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="ticker-strip">
        <div className="ticker-content">
          <span>No synthetic dyes</span>
          <span className="ticker-dot">·</span>
          <span>No toxic treatments</span>
          <span className="ticker-dot">·</span>
          <span>Nothing hidden</span>
          <span className="ticker-dot">·</span>
          <span>Dyed with herbs and plants</span>
          <span className="ticker-dot">·</span>
          <span>No heavy metals</span>
          <span className="ticker-dot">·</span>
          <span>No PFAS</span>
          <span className="ticker-dot">·</span>
          <span>No synthetic dyes</span>
          <span className="ticker-dot">·</span>
          <span>No toxic treatments</span>
          <span className="ticker-dot">·</span>
          <span>Nothing hidden</span>
          <span className="ticker-dot">·</span>
          <span>Dyed with herbs and plants</span>
          <span className="ticker-dot">·</span>
          <span>No heavy metals</span>
          <span className="ticker-dot">·</span>
          <span>No PFAS</span>
        </div>
      </div>

      {/* Why This Exists Section */}
      <section className="why-section">
        <div className="why-header">
          <h2>The textile industry made a choice. We made a different one.</h2>
        </div>
        <div className="why-paragraphs">
          <p>
            When textile production scaled up, natural dyes were replaced with synthetic chemical dyes — cheaper, faster, easier to standardize. The industry chose efficiency. Nobody asked what those chemicals do to the people wearing the clothes.
          </p>
          <p>
            Many synthetic dyes and textile finishing chemicals are endocrine disruptors and carcinogens. They silently leach into skin in small quantities. Your baby wears this for 24 hours a day.
          </p>
        </div>
        <blockquote className="pull-quote">
          Plant-based dyes exist. They work. The industry just stopped using them. We chose to use them instead.
        </blockquote>
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-number">8,000+</div>
            <div className="stat-label">chemicals used in global textile production</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24 hrs</div>
            <div className="stat-label">daily skin contact for babies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">toxic treatments in Little Sage clothing</div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="solution-header">
          <h2>We do things differently</h2>
        </div>

        <div className="solution-cards solution-cards-4">
          <div className="solution-card">
            <div className="card-icon">
              <Shield size={32} />
            </div>
            <h3>Zero toxic substances</h3>
            <p>
              No synthetic dyes, no chemical softeners, no formaldehyde finishes. Nothing that has no business being near a baby's skin. Every Little Sage garment is free of toxic treatments from the first thread to the last stitch.
            </p>
          </div>

          <div className="solution-card">
            <div className="card-icon">
              <Heart size={32} />
            </div>
            <h3>Built for sensitive skin</h3>
            <p>
              Infant skin is 30% thinner than adult skin. It doesn't block what touches it — it absorbs it. Your baby is in direct skin contact with clothing all day and through the night. Every Little Sage decision starts from that fact.
            </p>
          </div>

          <div className="solution-card">
            <div className="card-icon">
              <Droplet size={32} />
            </div>
            <h3>How we dye our clothes</h3>
            <p>
              Every Little Sage garment is coloured using plant-based botanicals — each chosen because it carries zero toxic risk against your baby's skin:
            </p>
            <div className="botanical-list">
              <div className="botanical-item">
                <strong>Turmeric</strong> — anti-inflammatory, calms sensitive skin
              </div>
              <div className="botanical-item">
                <strong>Indigo</strong> — cooling, reduces heat and irritation
              </div>
              <div className="botanical-item">
                <strong>Madder</strong> — natural terracotta, zero synthetic processing
              </div>
              <div className="botanical-item">
                <strong>Henna</strong> — antimicrobial, gentle on delicate skin
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-header">
          <h2>Our Collection</h2>
          <p>Pure, chemical-free products for every moment of your baby's day</p>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory === 'All' ? (
          CATEGORIES.filter(c => c !== 'All').map((cat) => {
            const catProducts = products.filter(p => p.category === cat);
            if (!catProducts.length) return null;
            return (
              <div key={cat} className="category-group">
                <h3 className="category-group-title">{cat}</h3>
                <div className="products-grid">
                  {catProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image-wrapper">
                        <img src={product.image} alt={product.name} className="product-image" />
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="products-grid">
            {products.filter(p => p.category === activeCategory).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="waitlist-container">
          <div className="waitlist-header">
            <h2>Be the first to know</h2>
            <p>We're launching soon. Join the waitlist and we'll be in touch when Little Sage is ready.</p>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
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
                    {COUNTRY_CODES.map((country, index) => (
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
              <Label htmlFor="firstImpression">What's your first impression of Little Sage?</Label>
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
            <img src="/little-sage-logo.png" alt="Little Sage" className="footer-logo-image" />
          </div>
          <p className="footer-text">No spam. Just a note when we're ready.</p>
        </div>
      </footer>
    </div>
  );
};

export default LittleSage;
