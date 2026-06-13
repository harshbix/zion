
import React, { useState, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Loader2, AlertCircle, Trash2, CheckCircle } from 'lucide-react';
import { uploadImage } from '@/services/upload';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndUpload = async (file: File) => {
    setError(null);

    // Validate type (images only)
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, WEBP, GIF)');
      return;
    }

    // Validate size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError('File is too large. Maximum size allowed is 5MB.');
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await validateAndUpload(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-500">
          {label}
        </span>
      )}

      {value ? (
        // Preview State
        <div className="relative border border-stone-200 bg-stone-50 p-4 flex flex-col sm:flex-row items-center gap-4 group">
          <div className="relative w-32 h-32 sm:w-24 sm:h-24 overflow-hidden border border-stone-200/60 bg-white flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt="Uploaded Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Upload Completed Successfully</span>
            </div>
            <p className="text-[11px] text-stone-500 font-mono truncate max-w-xs md:max-w-md" title={value}>
              {value}
            </p>
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-red-700 hover:text-white border border-red-200 hover:border-red-600 hover:bg-red-600 transition-all duration-200 rounded-none bg-white"
            >
              <Trash2 className="w-3 h-3" /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        // Dropzone State
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-200 min-h-[160px] cursor-pointer bg-white group rounded-none
            ${dragActive ? 'border-amber-600 bg-amber-50/20' : 'border-stone-200 hover:border-stone-400'}
            ${loading ? 'pointer-events-none' : ''}
          `}
        >
          <input
            type="file"
            id="file-upload-input"
            multiple={false}
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={loading}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-stone-800 uppercase tracking-wider animate-pulse">Uploading Media...</p>
                <p className="text-[10px] text-stone-400">Processing upload with Cloudinary REST API</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-stone-50 border border-stone-100 group-hover:bg-amber-50 group-hover:border-amber-100/50 transition-colors duration-200">
                <Upload className="w-6 h-6 text-stone-400 group-hover:text-amber-600 transition-colors duration-200" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-stone-700">
                  <span className="font-bold text-stone-900 hover:text-amber-600 transition-colors">Click to browse</span> or drag & drop your image here
                </p>
                <p className="text-[10px] text-stone-400">Supports PNG, JPG, WEBP, or GIF (max 5MB)</p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-red-600 mt-2 bg-red-50/50 border border-red-100 p-2 text-[10px] font-medium leading-none">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
