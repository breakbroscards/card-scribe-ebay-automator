
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileImage, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import UploadSection from "@/components/UploadSection";
import AuthSection from "@/components/AuthSection";

const Index = () => {
  const [ebayConnected, setEbayConnected] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);

  const steps = [
    { id: 1, title: "Connect eBay", description: "Authenticate your eBay seller account" },
    { id: 2, title: "Upload Cards", description: "Upload photos or enter PSA numbers" },
    { id: 3, title: "Review Listing", description: "Verify and approve your listing details" },
    { id: 4, title: "List on eBay", description: "Publish your listing to eBay" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Sports Card Auto-Lister
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Automatically create professional eBay listings for your sports trading cards using AI-powered photo recognition and PSA database integration.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-colors ${
                  step.id <= activeStep ? 'bg-blue-600' : 'bg-slate-300'
                }`}>
                  {step.id < activeStep ? <Check className="w-6 h-6" /> : step.id}
                </div>
                <div className="text-center mt-3">
                  <h3 className="font-medium text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute w-24 h-0.5 mt-6 transition-colors ${
                    step.id < activeStep ? 'bg-blue-600' : 'bg-slate-300'
                  }`} style={{ left: `${(index + 1) * 25}%` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {activeStep === 1 && (
            <AuthSection 
              ebayConnected={ebayConnected}
              onConnect={() => {
                setEbayConnected(true);
                setActiveStep(2);
              }}
            />
          )}

          {activeStep === 2 && (
            <UploadSection 
              onNext={() => setActiveStep(3)}
            />
          )}

          {activeStep >= 3 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Listing Ready for Review
                </CardTitle>
                <CardDescription>
                  Your card listing has been prepared. Review the details below before publishing to eBay.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Coming Soon!</h3>
                  <p className="text-slate-600">
                    The listing review and eBay publication features are in development.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">AI Photo Recognition</h3>
              <p className="text-sm text-slate-600">
                Upload photos of raw cards and our AI automatically identifies player, year, set, and condition.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">PSA Integration</h3>
              <p className="text-sm text-slate-600">
                Enter PSA cert numbers to automatically pull official photos and card details from PSA database.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">eBay Auto-List</h3>
              <p className="text-sm text-slate-600">
                Review and approve AI-generated listings, then publish directly to your eBay seller account.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
