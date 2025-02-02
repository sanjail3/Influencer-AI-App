"use client"
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { LoadingSpinner } from "./LoadingSpinner";
import { ScriptSelector } from "./ScriptSelector";
import { generateScripts } from '@/lib/api/scriptApi';
import { Script } from '@/lib/types/script';
import Image from 'next/image';
import { MediaUpload } from '@/components/ui/file-upload';

interface ProductFormProps {
  productInfo: {
    product_name: string;
    product_description: string;
    problem_their_solving: string;
    unique_selling_point: string;
    features: string;
    pricing: string;
  };
  screenshot: string;
  onBack: () => void;
  screenshot_data: string;
  projectId?: string | null;
}

export function ProductForm({ productInfo, screenshot, onBack, screenshot_data, projectId }: ProductFormProps) {
  const [formData, setFormData] = useState(productInfo);
  const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const [scriptData, setscriptData] = useState({
    product_info: { ...productInfo },
    duration: 30,
    language: "English",
    tone: "professional",
    target_audience: "diabetes patients",
  });

  const formFields = [
    { key: 'product_name', rows: 2, placeholder: 'Enter the product name...' },
    { key: 'product_description', rows: 4, placeholder: 'Describe the product...' },
    { key: 'problem_their_solving', rows: 3, placeholder: 'What problem does it solve?...' },
    { key: 'unique_selling_point', rows: 3, placeholder: 'What makes it unique?...' },
    { key: 'features', rows: 3, placeholder: 'List the key features...' },
    { key: 'pricing', rows: 2, placeholder: 'Enter the pricing details...' }
  ];

  const handleNext = async () => {
    setIsGeneratingScripts(true);
    try {
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file: File) => {
          formData.append("files", file);
        });
        formData.append("projectId", projectId || "");

        const response = await fetch("/api/fileupload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          alert("Files uploaded successfully!");
        } else {
          alert("Failed to upload files.");
        }
      }
      const response = await generateScripts(scriptData);
      setScripts(response.scripts);
    } catch (error) {
      console.error('Error generating scripts:', error);
    } finally {
      setIsGeneratingScripts(false);
    }
  };

  if (isGeneratingScripts) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner text="Generating scripts..." />
      </div>
    );
  }

  if (scripts.length > 0) {
    return (
      <ScriptSelector
        scripts={scripts}
        onBack={() => setScripts([])}
        onRegenerate={handleNext}
        screenshot_data={screenshot_data}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <BackgroundGradient className="rounded-[22px] p-1">
        <Card className="border-0 p-6 sm:p-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-center text-2xl sm:text-3xl mb-8 font-bold text-foreground/90">Product Details</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {formFields.slice(0, 3).map(({ key, rows, placeholder }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium font-bold">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                  <Textarea
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full resize-none border border-purple-600/40 rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={rows}
                    placeholder={placeholder}
                  />
                  {key === 'problem_their_solving' && (
                    <div className="space-y-2">
                      <div className="w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <MediaUpload onChange={handleFileUpload} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="aspect-video rounded-lg border border-purple-600/40 shadow-lg shadow-purple-900/20 overflow-hidden mb-6">
                <div className="relative w-full h-full">
                  <Image
                    src={screenshot}
                    alt="Product screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {formFields.slice(3).map(({ key, rows, placeholder }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">
                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                  <Textarea
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full resize-none border border-purple-600/40 rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={rows}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-foreground/90 hover:text-foreground hover:bg-foreground/10"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#d550ac] to-[#7773FA] text-white hover:opacity-90 transition-opacity"
            >
              Next
            </Button>
          </div>
        </Card>
      </BackgroundGradient>
    </div>
  );
}