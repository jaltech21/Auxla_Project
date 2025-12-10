import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, Building2, Info, AlertCircle } from 'lucide-react';
import { BankTransferDetails as BankTransferDetailsType, DonationForm } from '@/types/donation';
import { toast } from 'sonner';
import FileUpload from './FileUpload';

interface BankTransferDetailsProps {
  donationData: DonationForm;
  onProofUploaded: (fileUrl: string) => void;
  onSubmit: () => void;
}

export default function BankTransferDetails({
  donationData,
  onProofUploaded,
  onSubmit
}: BankTransferDetailsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [proofUploaded, setProofUploaded] = useState(false);

  const bankDetails: BankTransferDetailsType = {
    bankName: 'Sierra Leone Commercial Bank',
    accountName: 'OCSLAA Mental Health Initiative',
    accountNumber: '1234567890',
    swiftCode: 'SLCBSLF1',
    reference: `OCSLAA-${Date.now().toString().slice(-8)}`
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProofUpload = (fileUrl: string) => {
    setProofUploaded(true);
    onProofUploaded(fileUrl);
  };

  const DetailRow = ({ 
    label, 
    value, 
    highlight = false 
  }: { 
    label: string; 
    value: string; 
    highlight?: boolean 
  }) => (
    <div className={`flex justify-between items-center p-3 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-muted/50'}`}>
      <div>
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className={`font-mono font-semibold ${highlight ? 'text-primary text-lg' : ''}`}>
          {value}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => copyToClipboard(value, label)}
        className="flex-shrink-0"
      >
        {copiedField === label ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Bank Transfer Instructions</CardTitle>
          </div>
          <CardDescription>
            Please transfer ${donationData.amount.toFixed(2)} to the account below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <DetailRow 
              label="Bank Name" 
              value={bankDetails.bankName} 
            />
            <DetailRow 
              label="Account Name" 
              value={bankDetails.accountName} 
            />
            <DetailRow 
              label="Account Number" 
              value={bankDetails.accountNumber} 
            />
            <DetailRow 
              label="SWIFT Code" 
              value={bankDetails.swiftCode} 
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="text-xs">
                IMPORTANT
              </Badge>
              <span className="text-sm font-semibold">Reference Number</span>
            </div>
            <DetailRow 
              label="Transfer Reference" 
              value={bankDetails.reference}
              highlight 
            />
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Please include this reference number when making your transfer. 
                This helps us identify your donation quickly.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload Payment Proof</CardTitle>
          <CardDescription>
            Help us verify your donation faster by uploading a screenshot or photo of your transfer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload onUpload={handleProofUpload} />
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>What happens next?</AlertTitle>
        <AlertDescription className="text-sm space-y-2">
          <p>
            1. Make the bank transfer using the details above
          </p>
          <p>
            2. Upload proof of payment (optional but recommended)
          </p>
          <p>
            3. Click "Submit Donation" below
          </p>
          <p>
            4. We'll verify your donation within 1-3 business days
          </p>
          <p>
            5. You'll receive a confirmation email once verified
          </p>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onSubmit}
          size="lg"
          className="flex-1"
        >
          Submit Donation
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Your donation status will be "Pending Verification" until we confirm the transfer
      </p>
    </div>
  );
}
