// shared/components/Modal.tsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) => {
  // Lock scroll saat modal terbuka
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Tutup dengan Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      onClick={onClose} // klik backdrop → tutup
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className={`
          relative z-50 w-full ${sizeMap[size]}
          bg-[#1e293b] border border-[#334155]
          rounded-xl shadow-lg
        `}
        onClick={e => e.stopPropagation()} // cegah klik dalam modal menutup modal
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-[#334155]">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};