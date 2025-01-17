import { prisma } from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

interface EmailAddress {
    email_address: string;
    id: string;
    verification: any;
}

// Updated type guard
function hasEmailAddresses(obj: any): obj is { email_addresses: EmailAddress[] } {
    return obj && Array.isArray(obj.email_addresses) && obj.email_addresses.length > 0;
}

export async function POST(req: Request) {
    try {
        console.log('Received webhook');
        const evt = (await req.json()) as WebhookEvent;
        const eventType = evt.type;
        const { id: clerkUserId } = evt.data;

        if (!clerkUserId) {
            return NextResponse.json(
                { error: 'No user ID provided' },
                { status: 400 }
            );
        }

        // Single email check at the beginning
        if (!hasEmailAddresses(evt.data)) {
            return NextResponse.json(
                { error: 'No email addresses found' },
                { status: 400 }
            );
        }

        const primaryEmail = evt.data.email_addresses[0].email_address;

        if (eventType === 'user.created') {
            const newUser = await prisma.user.create({
                data: {
                    clerkId: clerkUserId,
                    email: primaryEmail,
                    credits: 10,
                }
            });

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

        if (eventType === 'user.deleted') {
            const deletedUser = await prisma.user.delete({
                where: { clerkId: clerkUserId }
            });

            return NextResponse.json(
                { message: 'User deleted successfully', user: deletedUser },
                { status: 200 }
            );
        }

        if (eventType === 'user.updated') {
            const updatedUser = await prisma.user.update({
                where: { clerkId: clerkUserId },
                data: { email: primaryEmail }
            });

            return NextResponse.json(
                { message: 'User updated successfully', user: updatedUser },
                { status: 200 }
            );
        }

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

export const config = {
    api: {
        bodyParser: false,
    },
};