// shared/components/Button.tsx
import { ButtonHTMLAttributes } from 'react';
import type { Size, Variant } from '@/shared/types';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  rounded?: 'lg' | 'full';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<Variant, string> = {
  primary:   'bg-[#137fec] hover:bg-[#0d66c2] text-white',
  secondary: 'bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155]',
  ghost:     'bg-transparent hover:bg-[#1e293b] text-[#cbd5e1]',
  danger:    'bg-[#ef4444] hover:bg-[#dc2626] text-white',
};

const sizeStyles: Record<Size, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  rounded = 'lg',
  icon,
  iconPosition = 'left',
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#137fec] focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0d1117]
        ${rounded === 'full' ? 'rounded-full' : 'rounded-lg'}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
        </>
      )}
    </button>
  );
};