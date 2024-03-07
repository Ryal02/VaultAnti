import React from 'react';
import Layout from '../../layout';
import Login from './login';
import { AuthProvider } from '@/app/middelware/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const page: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <AuthProvider>
          <Layout>
              <Login/>
          </Layout>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default page;
