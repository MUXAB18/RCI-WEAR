'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Input } from './Input';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  required?: boolean;
}

export function ImageUpload({ label, value, onChange, helperText, required }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Upload failed');
        console.error('Upload failed');
      }
    } catch (error) {
      setError('An error occurred during upload');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="flex items-start gap-4">
        {value ? (
          <div className="shrink-0 relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 group bg-white/5">
            <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="shrink-0 relative w-24 h-24 rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer">
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-white/40 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-white/40 mb-2" />
                <span className="text-xs text-white/40 font-medium">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              title="Upload image from computer"
            />
          </div>
        )}
        <div className="flex-1 space-y-1.5 pt-1">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or enter image URL manually..."
            error={error || undefined}
          />
          {helperText && !error && <p className="text-xs text-white/40">{helperText}</p>}
        </div>
      </div>
    </div>
  );
}
