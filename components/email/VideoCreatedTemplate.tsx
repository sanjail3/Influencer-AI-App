import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VideoCreatedTemplateProps {
  videoPageUrl: string;
  videoTitle: string;
  userName: string;
}

export const VideoCreatedTemplate = ({
  videoPageUrl,
  videoTitle,
  userName,
}: VideoCreatedTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your AI Video Ad is Ready! - Influencer AI</Preview>
      <Body style={main}>
        <Container>
          {/* Header with Logo */}
          <Section style={logo}>
            <Row>
              <Column align="center">
                <Text style={logoText}>Influencer AI</Text>
              </Column>
            </Row>
          </Section>

          <Section style={content}>
            {/* Welcome Message */}
            <Row>
              <Column>
                <Heading style={heading}>
                  Your AI Ad is Ready, {userName}! 🎬
                </Heading>
                <Text style={paragraph}>
                  Great news! Your video <span style={highlightText}>"{videoTitle}"</span> has been created and is ready for your review.
                </Text>
              </Column>
            </Row>

            {/* Video Section */}
            <Row>
              <Column style={videoContainer}>
                <Section style={videoIconContainer}>
                  <Row>
                    <Column align="center">
                      <div style={videoIcon}>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </Column>
                  </Row>
                  
                  <Row>
                    <Column>
                      <Text style={videoText}>
                        Your AI-powered advertisement is now available for viewing and downloading.
                      </Text>
                      <Section style={containerButton}>
                        <Button href={videoPageUrl} style={button}>
                          View Your Video →
                        </Button>
                      </Section>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>

            {/* What's Next Section */}
            <Row>
              <Column style={nextStepsContainer}>
                <Heading as="h2" style={nextStepsHeading}>
                  What's Next?
                </Heading>
                <Text style={checklistItem}>✓ Review your video</Text>
                <Text style={checklistItem}>✓ Download in your preferred format</Text>
                <Text style={checklistItem}>✓ Share directly to your marketing channels</Text>
              </Column>
            </Row>

            {/* Support Section */}
            <Row>
              <Column>
                <Text style={supportText}>
                  Need adjustments? Contact me at{' '}
                  <a href="mailto:sanjai@influencer-ai.in" style={link}>
                    sanjai@influencer-ai.in
                  </a>
                </Text>
              </Column>
            </Row>

            {/* Footer */}
            <Row>
              <Column>
                <Text style={footerText}>
                  © 2025 Influencer AI. All rights reserved.
                </Text>
                <Text style={footerLinks}>
                  <a href="#" style={link}>Privacy Policy</a>
                  {' • '}
                  <a href="#" style={link}>Terms of Service</a>
                  {' • '}
                  <a href="#" style={link}>Unsubscribe</a>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VideoCreatedTemplate;

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
  backgroundColor: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  padding: '24px',
  borderRadius: '8px',
  marginBottom: '32px',
};

const logoText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  textAlign: 'center' as const,
  margin: '0',
};

const content = {
  padding: '20px',
};

const heading = {
  fontSize: '30px',
  fontWeight: 'bold',
  color: '#1f2937',
  textAlign: 'center' as const,
  margin: '0 0 16px',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '28px',
  color: '#4b5563',
  textAlign: 'center' as const,
};

const highlightText = {
  fontWeight: 'bold',
  color: '#1f2937',
};

const videoContainer = {
  backgroundColor: '#f8fafc',
  backgroundImage: 'linear-gradient(to bottom right, #eff6ff, #f5f3ff)',
  borderRadius: '12px',
  padding: '32px',
  margin: '32px 0',
  border: '1px solid #e5e7eb',
};

const videoIconContainer = {
  textAlign: 'center' as const,
};

const videoIcon = {
  width: '64px',
  height: '64px',
  backgroundColor: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
};

const videoText = {
  fontSize: '16px',
  color: '#4b5563',
  textAlign: 'center' as const,
  margin: '16px 0',
};

const containerButton = {
  margin: '24px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#7c3aed',
  backgroundImage: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '16px 32px',
  textAlign: 'center' as const,
};

const nextStepsContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e7eb',
};

const nextStepsHeading = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0 0 16px',
};

const checklistItem = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '8px 0',
};

const supportText = {
  fontSize: '16px',
  color: '#4b5563',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
  paddingTop: '32px',
  margin: '32px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'none',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '0',
};

const footerLinks = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '8px 0 0',
};