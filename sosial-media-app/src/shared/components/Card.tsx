// shared/components/Card.tsx
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingMap = {
  none: 'p-0',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-6',
};

export const Card = ({
  padding = 'md',
  hoverable = false,
  className = '',
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={`
        bg-[#1e293b] border border-[#334155] rounded-lg
        ${paddingMap[padding]}
        ${hoverable ? 'hover:bg-[#263548] transition-colors duration-200 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};