import { prisma } from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmailTemplate } from '@components/email/Welcome-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        // Parse the Clerk Webhook event
        const evt = (await req.json()) as WebhookEvent;

        const { id: clerkUserId } = evt.data;
        if (!clerkUserId)
            return NextResponse.json(
                { error: 'No user ID provided' },
                { status: 400 },
            );

        // Create or delete a user in the database based on the Clerk Webhook event
        let user = null;
        switch (evt.type) {
            case 'user.created': {
                const { email_addresses = [], first_name } = evt.data;
                const email = email_addresses?.[0]?.email_address ?? '';

                if (!email)
                    return NextResponse.json(
                        { error: 'No email provided' },
                        { status: 400 },
                    );

                // Upsert the user in the database
                user = await prisma.user.upsert({
                    where: {
                        clerkId: clerkUserId,
                    },
                    update: {
                        clerkId: clerkUserId,
                        email,
                    },
                    create: {
                        clerkId: clerkUserId,
                        username: email,
                        email,
                    },
                });

                console.log(user);

                // Send a welcome email
                try {
                    const { data, error } = await resend.emails.send({
                        from: 'sanjai@influencer-ai.in',
                        to: email,
                        subject: 'Welcome to Our Community',
                        react: WelcomeEmailTemplate({ firstName: first_name || 'User'}),
                    });

                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Welcome email sent:', data);
                    }
                } catch (emailError) {
                    console.error('Failed to send email:', emailError);
                }

                break;
            }
            case 'user.deleted': {
                user = await prisma.user.delete({
                    where: {
                        clerkId: clerkUserId,
                    },
                });
                break;
            }
            default:
                break;
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}