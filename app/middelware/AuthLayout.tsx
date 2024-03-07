import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
        <div className='h-screen bg-gray-800 p-6'>
        {/* Your common layout components */}
        {children}
        </div>
  );
};

export default AuthLayout;
