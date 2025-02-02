// components/email/SubscriptionCreatedTemplate.tsx
import React from 'react';

interface SubscriptionCreatedTemplateProps {
    name: string;
    planName: string;
    price: string;
    interval: string | null;
    intervalCount: number | null;
}

export const SubscriptionCreatedTemplate: React.FC<SubscriptionCreatedTemplateProps> = ({
    name,
    planName,
    price,
    interval,
    intervalCount,
}) => {
    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <p>Thank you for subscribing to <strong>{planName}</strong>.</p>
            <p>
                Your subscription is active at <strong>${price}</strong> per{' '}
                {intervalCount} {interval}(s).
            </p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br />The Team</p>
        </div>
    );
};