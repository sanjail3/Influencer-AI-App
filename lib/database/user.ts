import { auth } from '@clerk/nextjs/server'
import prisma from '../db'

export async function getUserCredits() {
 const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId
    },
    select: {
      credits: true,
      subscription: {
        select: {
          plan: {
            select: {
              credits: true
            }
          }
        }
      }
    }
  })

  if (!user) {
    return null
  }

  return {
    currentCredits: user.credits,
    maxCredits: user.subscription?.plan?.credits ?? 10 // Default to 100 if no subscription
  }
}