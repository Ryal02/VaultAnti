import React from 'react';
import HomePage from './(auth)/login/page';
import Layout from './layout';
import { AuthProvider } from '@/app/middelware/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import AdminPage from '@/app/(user)/admin/page';

const page: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <AuthProvider>
        <Layout>
          <HomePage/>
        </Layout>
        {/* <AdminPage/> */}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default page;
