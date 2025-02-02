// components/email/VideoCreatedTemplate.tsx
import React from 'react';

interface VideoCreatedTemplateProps {
  videoPageUrl: string;
  videoTitle: string;
  userName: string;
}

export const VideoCreatedTemplate: React.FC<VideoCreatedTemplateProps> = ({
  videoPageUrl,
  videoTitle,
  userName,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ color: '#4F46E5' }}>Hello, {userName}!</h1>
      <p>We are excited to let you know that your video <strong>{videoTitle}</strong> is ready.</p>
      <p>You can view and download your video by clicking the link below:</p>
      <a
        href={videoPageUrl}
        style={{
          display: 'inline-block',
          margin: '20px 0',
          padding: '10px 20px',
          backgroundColor: '#4F46E5',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        View Your Video
      </a>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br />The Team</p>
    </div>
  );
};