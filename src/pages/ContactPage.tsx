import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormError } from '@/components/ui/form-error';
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
import { contactFormSchema, ContactFormData } from '@/schemas/contactFormSchema';
import { cn } from '@/lib/utils';

const ContactPage = () => {
  const navigate = useNavigate();
  const { mutate: submitForm, isPending } = useSubmitContactForm();

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange', // Re-validate on change after first error
    defaultValues: {
      inquiryType: 'general',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      organization: '',
    },
  });

  // Watch inquiry type for conditional organization field
  const inquiryType = watch('inquiryType');

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

  // Handle form submission with validation
  const onSubmit = (data: ContactFormData) => {
    submitForm(data as ContactForm, {
      onSuccess: (response) => {
        navigate('/contact/success', {
          state: {
            submissionId: response.submissionId,
            inquiryType: data.inquiryType,
          },
        });
      },
    });
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
                  <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">What can we help you with? *</Label>
                      <Controller
                        name="inquiryType"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className={cn(errors.inquiryType && 'border-destructive')}>
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
                            <FormError message={errors.inquiryType?.message} />
                          </>
                        )}
                      />
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className={cn(errors.firstName && 'border-destructive')}
                          placeholder="John"
                        />
                        <FormError message={errors.firstName?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className={cn(errors.lastName && 'border-destructive')}
                          placeholder="Doe"
                        />
                        <FormError message={errors.lastName?.message} />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={cn(errors.email && 'border-destructive')}
                          placeholder="john.doe@example.com"
                        />
                        <FormError message={errors.email?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <>
                              <PhoneInput
                                international
                                defaultCountry="SL"
                                value={field.value}
                                onChange={field.onChange}
                                className={cn(
                                  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                                  errors.phone && 'border-destructive'
                                )}
                                placeholder="+232 76 123 456"
                              />
                              <FormError message={errors.phone?.message} />
                            </>
                          )}
                        />
                      </div>
                    </div>

                    {/* Organization (conditional) */}
                    {(inquiryType === 'partnership' || inquiryType === 'media') && (
                      <div className="space-y-2">
                        <Label htmlFor="organization">
                          {inquiryType === 'partnership' ? 'Organization Name *' : 'Media Outlet *'}
                        </Label>
                        <Input
                          id="organization"
                          {...register('organization')}
                          className={cn(errors.organization && 'border-destructive')}
                          placeholder={inquiryType === 'partnership' ? 'Your organization' : 'News outlet name'}
                        />
                        <FormError message={errors.organization?.message} />
                      </div>
                    )}

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        className={cn(errors.subject && 'border-destructive')}
                        placeholder="Brief description of your inquiry"
                      />
                      <FormError message={errors.subject?.message} />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center justify-between">
                        <span>Message *</span>
                        <span className="text-xs text-muted-foreground">
                          {watch('message')?.length || 0} / 2000
                        </span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        className={cn(errors.message && 'border-destructive')}
                        rows={6}
                        placeholder="Tell us more about your inquiry... (minimum 20 characters)"
                      />
                      <FormError message={errors.message?.message} />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      disabled={isPending || !isValid}
                    >
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
