'use client';

import { ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = true,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-6 pt-8 text-center">
          {isDanger && (
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/60 mb-6 leading-relaxed">
            {message}
          </p>
          <div className="flex gap-3 w-full">
            <Button variant="ghost" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white">
              {cancelText}
            </Button>
            <Button variant={isDanger ? "danger" : "primary"} onClick={onConfirm} loading={isLoading} className="flex-1">
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
