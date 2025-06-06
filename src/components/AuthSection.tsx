
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface AuthSectionProps {
  ebayConnected: boolean;
  onConnect: () => void;
}

const AuthSection = ({ ebayConnected, onConnect }: AuthSectionProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
              e
            </div>
            Connect Your eBay Account
          </CardTitle>
          <CardDescription>
            Securely connect your eBay seller account to enable automatic listing creation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!ebayConnected ? (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">What happens when you connect?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Secure OAuth authentication with eBay</li>
                  <li>• Permission to create listings on your behalf</li>
                  <li>• Access to your seller account information</li>
                  <li>• Ability to upload photos and manage listings</li>
                </ul>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={onConnect}
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Connect to eBay
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  Redirects to eBay's secure authentication page
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Successfully Connected!</h3>
              <p className="text-green-600 mb-4">Your eBay seller account is now linked</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ready to create listings
              </Badge>
            </div>
          )}
          
          <div className="border-t pt-4">
            <p className="text-xs text-slate-500 text-center">
              🔒 Your credentials are encrypted and stored securely. We never store your eBay password.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSection;
