
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, FileImage, Camera } from "lucide-react";

interface UploadSectionProps {
  onNext: () => void;
}

const UploadSection = ({ onNext }: UploadSectionProps) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [psaCertNumber, setPsaCertNumber] = React.useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="raw" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="raw" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Raw Cards
          </TabsTrigger>
          <TabsTrigger value="graded" className="flex items-center gap-2">
            <FileImage className="w-4 h-4" />
            PSA Graded Cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="raw">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Upload Raw Card Photos</CardTitle>
              <CardDescription>
                Upload clear photos of your ungraded cards. Our AI will automatically identify the player, year, set, and condition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Drop your card photos here
                </h3>
                <p className="text-slate-600 mb-4">
                  or click to browse your files
                </p>
                <Input 
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </Label>
                <p className="text-xs text-slate-500 mt-3">
                  Supports JPG, PNG, WEBP up to 10MB each
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <FileImage className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-600 truncate">{file.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {(file.size / 1024 / 1024).toFixed(1)}MB
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button onClick={onNext} className="mt-6 w-full">
                    Process Cards with AI
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graded">
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>PSA Certification Number</CardTitle>
                <CardDescription>
                  Enter the PSA certification number to automatically retrieve official photos and card details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="psa-cert">PSA Certification Number</Label>
                    <Input 
                      id="psa-cert"
                      placeholder="e.g., 12345678"
                      value={psaCertNumber}
                      onChange={(e) => setPsaCertNumber(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Found on the PSA label, usually 8-9 digits
                    </p>
                  </div>
                  
                  {psaCertNumber && (
                    <Button onClick={onNext} className="w-full">
                      Retrieve Card Details from PSA
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-slate-500">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px bg-slate-300 flex-1"></div>
                <span className="text-sm">OR</span>
                <div className="h-px bg-slate-300 flex-1"></div>
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Upload PSA Slab Photos</CardTitle>
                <CardDescription>
                  Upload photos of your PSA slabs and we'll extract the certification number automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                  <FileImage className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 mb-3">Upload clear photos of PSA labels</p>
                  <Input 
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="psa-upload"
                  />
                  <Label htmlFor="psa-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose PSA Photos
                    </Button>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadSection;
