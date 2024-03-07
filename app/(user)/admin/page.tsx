'use client';

import React, { useEffect, useState } from 'react';
import DashboardPage from './Dashboard/page';
import { useRouter  } from 'next/navigation';
import { AuthProvider } from '@/app/middelware/AuthContext';

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('yourAuthToken');
    setUser(token);
  }, []);

  if(user) {
    return (
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      );
  } else {
    router.push('/login');
  }
};

export default AdminPage;
