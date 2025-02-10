import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, CreditCard } from "lucide-react";
import { Toaster, toast } from "sonner";


interface CreateProjectDialogProps {
  children?: React.ReactNode;
}

export function CreateProjectDialog({ children }: CreateProjectDialogProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isCheckingCredits, setIsCheckingCredits] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const checkCredits = async () => {
    setIsCheckingCredits(true);
    try {
      const response = await fetch('/api/user/credits');
      if (!response.ok) throw new Error('Failed to fetch credits');
      const credits = await response.json();
      
      if (credits.current < 5) {
        toast(
          <div className="flex flex-col gap-2">
            <p>You need at least 5 credits to create an AI ad. You currently have {credits.current} credits.</p>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                router.push('/pricing');
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 
                hover:to-pink-400 w-full mt-2"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Get More Credits
            </Button>
          </div>
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking credits:', error);
      toast.error(
 "Failed to check credits. Please try again.",
    );
      return false;
    } finally {
      setIsCheckingCredits(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (projectName.trim().length < 3) {
      setError('Project name must be at least 3 characters long');
      return;
    }

    const hasEnoughCredits = await checkCredits();
    if (!hasEnoughCredits) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          websiteUrl: '',
        }),
      });

      if (!response.ok) throw new Error('Failed to create project');

      const project = await response.json();
      setIsDialogOpen(false);
      router.push(`/create/video?projectId=${project.id}`);
    } catch (error) {
      setError('Failed to create project. Please try again.');
      console.error('Error creating project:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 
            hover:to-pink-400 transition-all duration-300 text-white font-semibold px-6 py-2 
            rounded-lg shadow-lg hover:shadow-purple-500/20 transform hover:scale-105"
          >
            Create Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[95vw] mx-auto bg-gradient-to-b from-[#8108ac]/10 to-black/95 
        border border-purple-500/20 shadow-xl rounded-xl backdrop-blur-sm">
        <form onSubmit={handleCreate} className="space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 
              to-purple-400 bg-clip-text text-transparent">
              Create New Project
            </DialogTitle>
            <DialogDescription className="font-medium bg-gradient-to-r from-purple-300 via-pink-400 
              to-purple-400 bg-clip-text text-transparent">
              Begin your creative journey with a new project
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 
                bg-clip-text text-transparent text-sm"
              >
                Project Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    setError('');
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your project name"
                  required
                  maxLength={50}
                  className={`bg-black/50 border-2 transition-all duration-300 text-white 
                    placeholder:text-gray-400 rounded-lg ${
                    isFocused 
                      ? 'border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                      : 'border-purple-500/30'
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  {projectName.length}/50
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="sm:flex-row flex-col gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto border-2 border-purple-500/30 text-purple-300 
                hover:bg-purple-500/20 hover:text-white transition-all duration-300 
                hover:border-purple-400"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isCheckingCredits}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 
                hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 
                disabled:cursor-not-allowed transition-all duration-300 font-semibold text-white
                shadow-lg hover:shadow-purple-500/20 transform hover:scale-105"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : isCheckingCredits ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Credits...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}