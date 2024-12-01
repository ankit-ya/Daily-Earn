import React from 'react';
import styled from 'styled-components';

const PrivacyPolicyContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-top: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
`;

const SectionContent = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-top: 10px;
`;

const Link = styled.a`
  color: #3498db;
  text-decoration: none;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyContainer>
      <Title>Privacy Policy</Title>
      <SectionTitle>1. Introduction</SectionTitle>
      <SectionContent>We value your privacy. This policy explains how we collect, use, and protect your personal data.</SectionContent>

      <SectionTitle>2. Information Collection</SectionTitle>
      <SectionContent>We collect personal information, such as your name, email, and transaction data when you use our services.</SectionContent>

      <SectionTitle>3. Use of Information</SectionTitle>
      <SectionContent>Your information is used to provide our services, improve the user experience, and process transactions.</SectionContent>

      <SectionTitle>4. Data Security</SectionTitle>
      <SectionContent>We use secure measures to protect your data from unauthorized access or misuse.</SectionContent>

      <SectionTitle>5. User Rights</SectionTitle>
      <SectionContent>You have the right to access, update, and delete your personal information at any time.</SectionContent>

      <SectionTitle>6. Admin Protection</SectionTitle>
      <SectionContent>We ensure that admin data is protected by implementing strict access controls and security protocols.</SectionContent>

      <SectionTitle>7. Changes to the Policy</SectionTitle>
      <SectionContent>We may update this Privacy Policy from time to time. We will notify you of any significant changes.</SectionContent>

      <SectionTitle>8. Contact Us</SectionTitle>
      <SectionContent>If you have any questions about this policy, please contact us at <Link href="mailto:support@dailyearn.com">support@dailyearn.com</Link>.</SectionContent>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
