// src/app/api/webhook/clerk/route.ts
import { prisma } from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Type guard function to check if the object has email_addresses
function hasEmailAddresses(obj: any): obj is { email_addresses: string[] } {
    return obj && typeof obj.email_addresses !== 'undefined';
}

export async function POST(req: Request) {
    try {
        // Parse the Clerk Webhook event
        const evt = (await req.json()) as WebhookEvent;
        const eventType = evt.type;
        const { id: clerkUserId } = evt.data;

        if (!clerkUserId) {
            return NextResponse.json(
                { error: 'No user ID provided' },
                { status: 400 }
            );
        }

        if (!hasEmailAddresses(evt.data)) {
            return NextResponse.json(
                { error: 'No email addresses found' },
                { status: 400 }
            );
        }

        const { email_addresses } = evt.data;

        // Handle user creation
        if (eventType === 'user.created') {
            if (!hasEmailAddresses(evt.data)) {
                return NextResponse.json(
                    { error: 'No email addresses found' },
                    { status: 400 }
                );
            }

            const primaryEmail = evt.data.email_addresses[0]?.email_address;

            if (!primaryEmail) {
                return NextResponse.json(
                    { error: 'No email address found' },
                    { status: 400 }
                );
            }

            const newUser = await prisma.user.create({
                data: {
                    clerkId: clerkUserId,
                    email: primaryEmail,
                    credits: 10, // Default credits
                }
            });

            // Create initial credit transaction
            await prisma.transaction.create({
                data: {
                    userId: newUser.id,
                    amount: 10,
                    type: 'PLAN_CREDIT',
                    description: 'Welcome credits',
                }
            });

            return NextResponse.json(
                { message: 'User created successfully', user: newUser },
                { status: 201 }
            );
        }

        // Handle user deletion
        if (eventType === 'user.deleted') {
            const deletedUser = await prisma.user.delete({
                where: { clerkId: clerkUserId }
            });

            return NextResponse.json(
                { message: 'User deleted successfully', user: deletedUser },
                { status: 200 }
            );
        }

        // Handle user updates
        if (eventType === 'user.updated') {
            if (!hasEmailAddresses(evt.data)) {
                return NextResponse.json(
                    { error: 'No email addresses found' },
                    { status: 400 }
                );
            }

            const primaryEmail = evt.data.email_addresses[0]?.email_address;

            if (!primaryEmail) {
                return NextResponse.json(
                    { error: 'No email address found' },
                    { status: 400 }
                );
            }

            const updatedUser = await prisma.user.update({
                where: { clerkId: clerkUserId },
                data: { email: primaryEmail }
            });

            return NextResponse.json(
                { message: 'User updated successfully', user: updatedUser },
                { status: 200 }
            );
        }

        // Default response for unhandled event types
        return NextResponse.json(
            { message: 'Webhook received but no action taken' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Configure CORS if needed
export const config = {
    api: {
        bodyParser: false,
    },
};