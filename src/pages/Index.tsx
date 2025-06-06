
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import AuthSection from '@/components/AuthSection';
import UploadSection from '@/components/UploadSection';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">🎯</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Welcome to CardLister
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Automatically list your sports trading cards on eBay with AI-powered identification and listing creation
          </p>
        </div>

        <div className="space-y-12">
          <AuthSection ebayConnected={false} onConnect={() => console.log('Connect eBay')} />
          <UploadSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
