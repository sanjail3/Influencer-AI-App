"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePageHeader } from "@/components/create/CreatePageHeader";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/create/LoadingSpinner";
import { ProductForm } from "@/components/create/ProductForm";
import { ApiResponse } from "@/lib/types/product";
import { fetchProductInfo } from "@/lib/api/productApi";
import { formStyles } from '@/lib/styles/formStyles';
import SparklesText from "@/components/ui/sparkles-text";
import AiButton from "@/components/ui/ai-button";
import {useVideoState} from "@/hooks/useVideoState";






export default function CreateVideoPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ApiResponse | null>(null);


  const [error, setError] = useState('');
  const { videoData, updateVideoData } = useVideoState();

 

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const data = await fetchProductInfo(url);
      console.log(data);
      setProductData(data);
     
      
    } catch (err) {
      setError('Failed to fetch product information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen create-page-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <CreatePageHeader 
          title="AI Video Ads" 
          subtitle="Generate videos from your product links" 
        />
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <LoadingSpinner text="Analyzing product..." />
          </div>
        ) : productData ? (
          
          <ProductForm 
            productInfo={productData.product_information[0]}
            // onUpdateData={(productData) => videoFlow.updateVideoData({
            //   screenshot_path: productData.screenshot.data
            // })}
            screenshot={productData.screenshot.data}
            onBack={() => setProductData(null)}
            screenshot_data={productData.screenshot.data}
          />
        ) : (
          <div className="max-w-3xl mx-auto mt-12 sm:mt-24">
      <BackgroundGradient className="rounded-[22px] p-1"> {/* Minimal padding on gradient */}
        <div className=" dark:bg-zinc-900 rounded-[20px]"> {/* Inner container */}
          <Card className="p-6 sm:p-12 border-0 dark:bg-zinc-900 bg-purple"> {/* Remove card border */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl mb-4 font-bold">
                Share your <SparklesText text="Product Link" />
              </h2>
              <p className="text-white dark:text-purple-200/90 text-base sm:text-lg font-bold">
                Create engaging video ads with AI in just a few clicks
              </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-purple-400" />
              </div>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your product URL here..."
                className="h-14 pl-12 pr-32 text-lg rounded-lg border border-purple-300 dark:border-purple-800"
              />
              
            </div>
            <div className="flex items-center justify-center">
              <AiButton  text="Analyse Product" onClick={handleSubmit} />
              </div>
            
            {error && (
              <p className="text-red-400 text-center mt-4 text-sm">{error}</p>
            )}
          </Card>
        </div>
      </BackgroundGradient>
    </div>
        )}
      </div>
    </div>
  );
}