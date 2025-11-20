import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className={`w-full max-w-md bg-white min-h-screen shadow-xl relative overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
};
