import { useState, useRef, useEffect } from "react";
import { Check, Shield, ZoomIn, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import australiaAccreditation from "@/assets/AustraliaAccreditation.jpg";
import corporateAffairsCertificate from "@/assets/CorporateAffairsCertificate.jpg";

/**
 * Renders the certificate on a canvas with a tiled watermark burned into the
 * pixel data, so any screenshot also captures the watermark.
 */
const ProtectedCertificate = ({ src, title }: { src: string; title: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const maxW = 1400;
      const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Burn tiled diagonal watermark into the canvas pixels
      const fontSize = Math.max(Math.floor(canvas.width / 16), 22);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = "OCSLAA · FOR VIEWING ONLY";
      const lineHeight = fontSize * 4;
      const lineWidth = ctx.measureText(text).width * 2;

      for (let row = -lineHeight * 2; row < canvas.height + lineHeight * 2; row += lineHeight) {
        for (let col = -lineWidth; col < canvas.width + lineWidth; col += lineWidth) {
          ctx.save();
          ctx.translate(col, row);
          ctx.rotate(-Math.PI / 6);
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "#000000";
          ctx.shadowColor = "rgba(255,255,255,0.6)";
          ctx.shadowBlur = 6;
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
    };
    img.src = src;
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={title}
      onContextMenu={(e) => e.preventDefault()}
      className="max-h-[75vh] max-w-full block"
      style={{ userSelect: "none", cursor: "default" }}
    />
  );
};

const AccreditationPage = () => {
  const [viewingCert, setViewingCert] = useState<{ src: string; title: string } | null>(null);

  const blockInteraction = (e: React.MouseEvent | React.DragEvent) => e.preventDefault();

  // Block Ctrl+S and Ctrl+P keyboard shortcuts while the certificate modal is open
  useEffect(() => {
    if (!viewingCert) return;
    const blockKeys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "p", "shift+s"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", blockKeys, { capture: true });
    return () => document.removeEventListener("keydown", blockKeys, { capture: true });
  }, [viewingCert]);

  const accreditations = [
    {
      title: "Mental Health Organization Certification",
      issuer: "National Mental Health Council",
      year: "2024",
      description: "Recognized for excellence in mental health service delivery and community impact.",
      image: undefined as string | undefined,
    },
    {
      title: "Child Safety Accreditation",
      issuer: "Child Protection Authority",
      year: "2024",
      description: "Certified organization with comprehensive child safety policies and procedures.",
      image: undefined as string | undefined,
    },
    {
      title: "Australian Accreditation",
      issuer: "Australian Accreditation Authority",
      year: "2025",
      description: "Officially accredited by the Australian Accreditation Authority, affirming our commitment to internationally recognised standards in mental health service delivery.",
      image: australiaAccreditation,
    },
    {
      title: "Corporate Affairs Certificate",
      issuer: "Corporate Affairs Commission",
      year: "2025",
      description: "Officially registered and certified by the Corporate Affairs Commission, confirming our legal standing and compliance with all corporate governance requirements.",
      image: corporateAffairsCertificate,
    },
  ];

  const commitments = [
    {
      title: "Child Safety",
      description: "We are deeply committed to the safety, wellbeing and protection of all children. We have comprehensive policies, screening, training and reporting mechanisms in place.",
    },
    {
      title: "Inclusivity",
      description: "We are committed to creating inclusive communities, workplaces, policies and services for people of all backgrounds, genders, sexualities, cultures, bodies and abilities.",
    },
    {
      title: "Accessibility",
      description: "We provide accessible services and can arrange interpreter services for most languages. All our facilities and communications are designed with accessibility in mind.",
    },
    {
      title: "Ethical Practice",
      description: "We operate with integrity and transparency, guided by ethical principles that prioritize community wellbeing and accountability.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
          }
        }

        .hero-title {
          animation: slideInDown 0.8s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .glow-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-10 right-20 opacity-10">
          <Check className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <Shield className="h-24 w-24 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Accreditation</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Certified for
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                Excellence & Safety
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              Certified organization meeting the highest standards for quality, safety, and service delivery.
            </p>

            {/* CTA Button with animation */}
            <div className="hero-subtitle" style={{ animationDelay: "0.4s" }}>
              <Button variant="secondary" size="lg" asChild className="group">
                <Link to="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Accreditations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Accreditations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditations.map((accred, index) =>
                accred.image ? (
                  <Card key={index} className="md:col-span-2 hover:shadow-xl transition-shadow overflow-hidden border-2 border-primary/20">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 min-h-64 relative group">
                        <img
                          src={accred.image}
                          alt={accred.title}
                          draggable={false}
                          onContextMenu={blockInteraction}
                          onDragStart={blockInteraction}
                          className="max-h-64 w-full object-contain drop-shadow-md select-none"
                          style={{ WebkitUserDrag: "none" } as React.CSSProperties}
                        />
                        {/* Transparent overlay blocks right-click and drag-to-save */}
                        <div
                          className="absolute inset-0 cursor-pointer"
                          onContextMenu={blockInteraction}
                          onDragStart={blockInteraction}
                          onClick={() => setViewingCert({ src: accred.image!, title: accred.title })}
                          title="Click to view full certificate"
                        />
                        <button
                          onClick={() => setViewingCert({ src: accred.image!, title: accred.title })}
                          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <ZoomIn className="h-3.5 w-3.5" />
                          View Certificate
                        </button>
                      </div>
                      <div className="md:w-1/2 flex flex-col justify-center p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary rounded-lg flex-shrink-0">
                            <Check className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Official Accreditation
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{accred.title}</h3>
                        <p className="text-sm font-medium text-primary mb-1">{accred.issuer}</p>
                        <p className="text-xs text-muted-foreground mb-4">Certified {accred.year}</p>
                        <p className="text-foreground leading-relaxed">{accred.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-6 w-fit gap-2"
                          onClick={() => setViewingCert({ src: accred.image!, title: accred.title })}
                        >
                          <ZoomIn className="h-4 w-4" />
                          View Full Certificate
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{accred.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{accred.issuer}</p>
                          <p className="text-xs text-muted-foreground">Certified {accred.year}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground text-sm">{accred.description}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Commitments */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commitments.map((commitment, index) => (
                <Card key={index} className="bg-accent hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{commitment.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quality Standards Section */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Standards We Meet</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>WCAG AA Accessibility Standards</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Evidence-Based Mental Health Practices</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Data Protection and Privacy Compliance</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Professional Code of Ethics</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 flex-shrink-0" />
                <span>Anti-Discrimination Policies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Certificate Viewer Modal */}
      {viewingCert && (
        <Dialog open={!!viewingCert} onOpenChange={(open) => !open && setViewingCert(null)}>
          <DialogContent
            className="max-w-4xl w-full p-0 overflow-hidden bg-black border-0"
            onContextMenu={blockInteraction}
          >
            <DialogTitle className="sr-only">{viewingCert.title}</DialogTitle>
            {/* Canvas renders the image with watermark burned into pixels */}
            <div
              className="w-full flex items-center justify-center bg-neutral-950 p-4 overflow-auto"
              onContextMenu={blockInteraction}
              onDragStart={blockInteraction}
              style={{ userSelect: "none" }}
            >
              <ProtectedCertificate src={viewingCert.src} title={viewingCert.title} />
            </div>

            {/* Footer bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-neutral-900 text-neutral-400 text-xs">
              <span>This certificate is for viewing purposes only and may not be saved or reproduced.</span>
              <button
                onClick={() => setViewingCert(null)}
                className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AccreditationPage;
