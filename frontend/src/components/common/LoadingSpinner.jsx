import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center gap-2 text-brand-600 font-medium">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>{text}</span>
    </div>
  );
}