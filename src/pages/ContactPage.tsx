import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Loader2,
  Users,
  Handshake,
  Newspaper,
  HeartHandshake
} from 'lucide-react';
import { useSubmitContactForm } from '@/hooks/useContact';
import { ContactForm, InquiryType } from '@/types/contact';

const ContactPage = () => {
  const navigate = useNavigate();
  const { mutate: submitForm, isPending } = useSubmitContactForm();

  const [formData, setFormData] = useState<Partial<ContactForm>>({
    inquiryType: 'general',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    organization: '',
  });

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'support', label: 'Mental Health Support', icon: HeartHandshake },
    { value: 'volunteer', label: 'Volunteer Opportunities', icon: Users },
    { value: 'partnership', label: 'Partnership', icon: Handshake },
    { value: 'media', label: 'Media Inquiry', icon: Newspaper },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@ocslaa.org',
      href: 'mailto:info@ocslaa.org',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+232 XX XXX XXXX',
      href: 'tel:+232XXXXXXXX',
      description: 'Mon-Fri, 9AM-5PM GMT'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Freetown, Sierra Leone',
      description: 'Visit our office'
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM', isOpen: true },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.subject || !formData.message || !formData.inquiryType) {
      return;
    }

    submitForm(formData as ContactForm, {
      onSuccess: (response) => {
        navigate('/contact/success', { 
          state: { 
            submissionId: response.submissionId,
            inquiryType: formData.inquiryType 
          } 
        });
      },
    });
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - OCSLAA</title>
        <meta
          name="description"
          content="Get in touch with OCSLAA. We're here to help with your questions about mental health support, volunteering, partnerships, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24-48 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">What can we help you with? *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange('inquiryType', value as InquiryType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Organization (conditional) */}
                    {(formData.inquiryType === 'partnership' || formData.inquiryType === 'media') && (
                      <div className="space-y-2">
                        <Label htmlFor="organization">
                          {formData.inquiryType === 'partnership' ? 'Organization Name' : 'Media Outlet'}
                        </Label>
                        <Input
                          id="organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
                        />
                      </div>
                    )}

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        required
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <Alert>
                      <AlertDescription className="text-sm">
                        By submitting this form, you agree to our privacy policy. We'll only use your
                        information to respond to your inquiry.
                      </AlertDescription>
                    </Alert>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.value}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Office Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((hours, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{hours.day}</span>
                      <span
                        className={`text-sm ${
                          hours.isOpen ? 'text-muted-foreground' : 'text-red-600'
                        }`}
                      >
                        {hours.hours}
                      </span>
                    </div>
                  ))}
                  <Alert className="mt-4">
                    <AlertDescription className="text-xs">
                      For urgent mental health support, please contact the national crisis hotline
                      or visit your nearest emergency room.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="/volunteer">
                      <Users className="mr-2 h-4 w-4" />
                      Volunteer With Us
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="/donate">
                      <HeartHandshake className="mr-2 h-4 w-4" />
                      Make a Donation
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="/faq">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      View FAQs
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
