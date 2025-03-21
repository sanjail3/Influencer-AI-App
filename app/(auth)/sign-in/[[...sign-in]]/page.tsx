import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {  getCheckoutURL } from '@/lib/lemon-squeezy/actions'; // Adjust the import path as needed
import { useState } from 'react';

export default function Page() {
  // const searchParams = useSearchParams()
  // const router = useRouter()
  // const redirectTo = searchParams.get('redirect_to')
  // const planId = searchParams.get('plan_id')
  // const [checkoutUrl, setCheckoutUrl] = useState('')
  // const embed = searchParams.get('embed') === 'true'

  // Handle successful sign-up
  // const handleAfterSignUp = async () => {
  //   if (redirectTo === 'checkout' && planId) {
  //     try {
  //       const checkoutUrl = await getCheckoutURL(Number(planId), embed)
        
  //       if (embed && checkoutUrl) {
  //         window.LemonSqueezy.Url.Open(checkoutUrl)
  //       } else {
  //         router.push(checkoutUrl ?? '/')
  //       }
  //     } catch (error) {
  //       console.error('Checkout error:', error)
  //       toast.error('Failed to process checkout')
  //       router.push('/dashboard')
  //     }
  //   } else {
  //     router.push('/dashboard')
  //   }
  // }

  // Determine initial redirect URL (this will be overridden by handleAfterSignUp)
  // useEffect(() => {
  //   handleAfterSignUp()
  // }, [])
  // const redirectUrl = redirectTo === 'checkout' && planId
  //   ? `/checkout?plan=${planId}`
  //   : '/dashboard'

  return (
    <section className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(129,_8,_172,_0.4),_black)]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Image Section */}
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Sign up visual"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        </aside>

        {/* Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl lg:max-w-3xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-100">
                Join Our Community
              </h1>
              <p className="mt-3 text-lg text-gray-300">
                Create your account to get started
              </p>
            </div>

            {/* Centered Container for Clerk Component */}
            <div className="flex flex-col items-center justify-center">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-md",
                    card: "bg-transparent shadow-none w-full",
                    headerTitle: "text-2xl font-bold text-gray-100 text-center",
                    headerSubtitle: "text-gray-300 text-center",
                    formFieldLabel: "text-gray-300 font-medium",
                    formFieldInput:
                      "bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 w-full",
                    socialButtonsBlockButton:
                      "bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-700/50 w-full",
                    socialButtonsBlockButtonText: "text-gray-100",
                    dividerLine: "bg-gray-700",
                    dividerText: "text-gray-300",
                    footerActionText: "text-gray-300",
                    footerActionLink: "text-purple-400 hover:text-purple-300",
                    formButtonPrimary:
                      "bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors w-full",
                    form: "space-y-6",
                    formHeader: "text-center",
                  },
                }}
                forceRedirectUrl={"/dashboard"}
            
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}