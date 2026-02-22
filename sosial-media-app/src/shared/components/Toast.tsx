// shared/components/Toast.tsx
import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;     // ms, default 3000
  onClose: () => void;
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-[#1e293b] border-green-500/50 text-green-400',
  error:   'bg-[#1e293b] border-red-500/50 text-red-400',
  warning: 'bg-[#1e293b] border-yellow-500/50 text-yellow-400',
  info:    'bg-[#1e293b] border-[#137fec]/50 text-[#137fec]',
};

const icons: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

export const Toast = ({
  type,
  message,
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`
      flex items-center gap-3 px-4 py-3
      border rounded-lg shadow-lg text-sm
      min-w-70 max-w-sm
      ${toastStyles[type]}
    `}>
      <span className="font-bold">{icons[type]}</span>
      <span className="flex-1 text-[#cbd5e1]">{message}</span>
      <button
        onClick={onClose}
        className="text-[#94a3b8] hover:text-white"
      >
        ✕
      </button>
    </div>
  );
};