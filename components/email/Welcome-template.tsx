import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface LoginEmailProps {
  firstName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const WelcomeEmailTemplate = ({
  firstName
  
}: LoginEmailProps)  => {
  

  return (
    <Html>
      <Head />
      <Preview>Thanks for Joining ❤️</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${baseUrl}/static/yelp-logo.png`} />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={`${baseUrl}/static/yelp-header.png`}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Welcome aboard, {firstName}! 🚀,
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                <Text style={paragraph}>
                  Get ready to transform your marketing with AI-powered ads that capture attention and drive results.
                </Text>
                 
                </Heading>



              </Column>
            </Row>
              <Row>
              <Column style={stepsContainer}>
                <Heading as="h2" style={stepsHeading}>
                  Create Your First AI Ad in 3 Simple Steps
                </Heading>

                {/* Step 1 */}
                <Section style={step}>
                  <Row>
                    <Column style={stepNumber}>1</Column>
                    <Column style={stepContent}>
                      <Text style={stepTitle}>Add Your Website</Text>
                      <Text style={stepDescription}>
                        Connect your brand's digital presence in one click
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {/* Step 2 */}
                <Section style={step}>
                  <Row>
                    <Column style={stepNumber}>2</Column>
                    <Column style={stepContent}>
                      <Text style={stepTitle}>Pick Your Script Style</Text>
                      <Text style={stepDescription}>
                        Choose from our curated collection of high-converting templates
                      </Text>
                    </Column>
                  </Row>
                </Section>

                {/* Step 3 */}
                <Section style={step}>
                  <Row>
                    <Column style={stepNumber}>3</Column>
                    <Column style={stepContent}>
                      <Text style={stepTitle}>Select AI Characters</Text>
                      <Text style={stepDescription}>
                        Bring your ad to life with our diverse AI presenter lineup
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>

            {/* CTA Button */}
            <Row>
              <Column align="center" style={containerButton}>
                <Button href="https://www.influencer-ai.in/dashboard" style={button}>
                  Create Your First AI Ad →
                </Button>
              </Column>
            </Row>

            {/* Support Section */}
            <Row>
              <Column>
                <Text style={supportText}>
                  Questions? Contact me at{' '}
                  <a href="mailto:sanjai@influencer-ai.in" style={link}>
                    sanjai@influencer-ai.in
                  </a>
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${baseUrl}/static/yelp-footer.png`}
            />
          </Section>

          <Section>
          <Row>
              <Column>
                <Text style={supportText}>
                  Questions? Contact me at{' '}
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



const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};




const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};


const logoText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  textAlign: 'center' as const,
  margin: '0',
};



const heading = {
  fontSize: '30px',
  fontWeight: 'bold',
  color: '#1f2937',
  textAlign: 'center' as const,
  margin: '0 0 16px',
};



const stepsContainer = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  padding: '32px',
  margin: '32px 0',
};

const stepsHeading = {
  fontSize: '24px',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const step = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const stepNumber = {
  width: '40px',
  height: '40px',
  backgroundColor: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  borderRadius: '50%',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  lineHeight: '40px',
};

const stepContent = {
  paddingLeft: '16px',
};

const stepTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0',
};

const stepDescription = {
  fontSize: '14px',
  color: '#4b5563',
  margin: '4px 0 0',
};

const containerButton = {
  margin: '32px 0',
};

const button = {
  backgroundColor: '#7c3aed',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '16px 32px',
  textAlign: 'center' as const,
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
