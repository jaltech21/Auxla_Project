/**
 * Team Section component
 * Displays team member profiles with expandable details
 */

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { teamMembers } from "@/data/mockContent";
import { Mail, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const TeamSection = () => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [emailForm, setEmailForm] = useState({ subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailClick = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    setEmailDialogOpen(true);
    setEmailSent(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !emailForm.subject || !emailForm.message) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Send email via backend
      const response = await fetch(
        import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/email/send-to-team-member` : '/api/email/send-to-team-member',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientEmail: selectedMember.email,
            recipientName: selectedMember.name,
            subject: emailForm.subject,
            message: emailForm.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
      toast({
        title: 'Email Sent!',
        description: `Your message has been sent to ${selectedMember.name}`,
      });

      setTimeout(() => {
        setEmailDialogOpen(false);
        setEmailForm({ subject: '', message: '' });
        setEmailSent(false);
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Dedicated mental health professionals committed to serving Sierra Leone's communities
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Dialog key={member.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-sm font-medium opacity-90">{member.title}</p>
                        <p className="text-xs opacity-75 mt-1">{member.credentials}</p>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="p-4 bg-muted/30">
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.expertise.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Full Profile Dialog */}
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-start gap-6 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <DialogTitle className="text-2xl mb-2">{member.name}</DialogTitle>
                      <DialogDescription className="text-base mb-1">
                        {member.title}
                      </DialogDescription>
                      <p className="text-sm text-muted-foreground">{member.credentials}</p>

                      {/* Contact Links */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        {member.email && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailClick(member)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        )}
                        {member.linkedin && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}

                      </div>
                    </div>
                  </div>
                </DialogHeader>

                {/* Bio */}
                <div className="space-y-4 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Biography</h4>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to join our mission? We're always looking for passionate mental health advocates.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact?type=volunteer">Join Our Team</Link>
          </Button>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {emailSent ? 'Email Sent!' : `Send Email to ${selectedMember?.name}`}
            </DialogTitle>
            <DialogDescription>
              {emailSent 
                ? 'Your message has been successfully sent.' 
                : 'Fill out the form below to send an email to this team member.'}
            </DialogDescription>
          </DialogHeader>

          {emailSent ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4 p-4 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-muted-foreground mb-4">
                {selectedMember?.name} will receive your message at<br />
                <span className="font-mono text-sm">{selectedMember?.email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to-email">To</Label>
                <Input
                  id="to-email"
                  type="email"
                  value={selectedMember?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Email subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  required
                  disabled={isSubmitting}
                  rows={5}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEmailDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamSection;
