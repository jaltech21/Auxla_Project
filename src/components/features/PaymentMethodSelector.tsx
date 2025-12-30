import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign, Building2 } from 'lucide-react';
import { PaymentMethod } from '@/types/donation';
import { cn } from '@/lib/utils';

interface PaymentMethodOption {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
  processingTime: string;
  fees: string;
}

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  const methods: PaymentMethodOption[] = [
    {
      value: 'stripe',
      label: 'Credit/Debit Card',
      description: 'Pay instantly with your credit or debit card via Stripe',
      icon: <CreditCard className="h-6 w-6" />,
      processingTime: 'Instant',
      fees: '2.9% + $0.30'
    },
    {
      value: 'bank-transfer',
      label: 'Bank Transfer',
      description: 'Direct bank transfer (requires manual verification)',
      icon: <Building2 className="h-6 w-6" />,
      processingTime: '1-3 business days',
      fees: 'No processing fees'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to make your donation
        </p>
      </div>

      <RadioGroup value={selected} onValueChange={onChange}>
        <div className="grid gap-4">
          {methods.map((method) => (
            <Label
              key={method.value}
              htmlFor={method.value}
              className="cursor-pointer"
            >
              <Card
                className={cn(
                  'transition-all hover:border-primary/50',
                  selected === method.value && 'border-primary border-2 bg-primary/5'
                )}
              >
                <CardHeader className="flex flex-row items-start space-x-4 pb-4">
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      selected === method.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{method.label}</CardTitle>
                      <RadioGroupItem value={method.value} id={method.value} />
                    </div>
                    <CardDescription className="mt-1">
                      {method.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-medium">{method.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Fees:</span>
                    <span className="font-medium">{method.fees}</span>
                  </div>
                </CardContent>
              </Card>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
