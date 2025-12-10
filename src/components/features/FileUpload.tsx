import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (fileUrl: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
}

export default function FileUpload({
  onUpload,
  accept = 'image/*,application/pdf',
  maxSize = 5,
  label = 'Upload Payment Proof'
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Mock upload - in production, upload to Cloudinary/S3
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful upload
      const mockUrl = `https://storage.example.com/${Date.now()}-${file.name}`;
      
      setUploaded(true);
      onUpload(mockUrl);
      
      // Show success for 1 second then reset
      setTimeout(() => {
        setUploading(false);
      }, 1000);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setUploaded(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">{label}</label>
        <p className="text-xs text-muted-foreground mb-3">
          Upload a screenshot or photo of your bank transfer receipt (optional but recommended)
        </p>
      </div>

      {!file ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            'hover:border-primary/50 cursor-pointer',
            error && 'border-destructive'
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, PDF up to {maxSize}MB
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            {uploaded ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                disabled={uploading}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {!uploaded && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full mt-3"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploaded && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Payment proof uploaded successfully
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
