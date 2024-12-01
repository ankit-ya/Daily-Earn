import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-top: 30px;
  font-weight: 600;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.7;
  margin-top: 10px;
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: #3498db;
`;

const TermsOfService = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <Paragraph><HighlightText>Effective Date:</HighlightText> [20/11/2024]</Paragraph>

      <SectionTitle>1. Acceptance of Terms</SectionTitle>
      <Paragraph>By accessing or using the services provided by [Daily Earn] ("we", "our", "us"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use our services.</Paragraph>

      <SectionTitle>2. Account Creation and Security</SectionTitle>
      <Paragraph>You are responsible for maintaining the confidentiality of your account information, including your login credentials...</Paragraph>

      <SectionTitle>3. Services Provided</SectionTitle>
      <Paragraph>[Daily Earn] offers a platform where users can complete tasks to earn rewards, coins, or points. We reserve the right to modify, suspend, or discontinue any aspect of the services at any time, without notice, at our sole discretion.</Paragraph>

      <SectionTitle>4. No Warranty on Earnings, Payments, or Withdrawals</SectionTitle>
      <Paragraph>Earnings: The amount of rewards, coins, or points earned through completing tasks is determined at our sole discretion. We do not guarantee any specific income or amount of earnings for users.</Paragraph>
      <Paragraph>Payments and Withdrawals: We make no guarantee regarding the processing, approval, or timing of payments or withdrawals. Payments or withdrawals may be subject to delays, administrative review, or rejection.</Paragraph>
      <Paragraph>No Warranty: We do not warrant that the services will be error-free, uninterrupted, or free from any defects. We are not responsible for any loss of data, earnings, or any other damages resulting from system failures, interruptions, or any unforeseen events.</Paragraph>

      <SectionTitle>5. Limitations of Liability</SectionTitle>
      <Paragraph>No Liability for Losses: In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to loss of earnings, data, or reputation, even if we have been advised of the possibility of such damages.</Paragraph>
      <Paragraph>No Responsibility for Withdrawals: We are not responsible for any issues or disputes related to the withdrawal of funds, including delays, errors, or refusal of withdrawal requests.</Paragraph>

      <SectionTitle>6. Prohibited Activities</SectionTitle>
      <Paragraph>Users are prohibited from engaging in any fraudulent or illegal activities, including:</Paragraph>
      <ul>
        <li>Using automated systems or bots to manipulate tasks or earnings.</li>
        <li>Engaging in any form of hacking, exploitation, or unauthorized access to the platform.</li>
        <li>Violating any applicable laws or regulations. Any violation of these terms may result in the suspension or termination of your account.</li>
      </ul>

      <SectionTitle>7. Intellectual Property</SectionTitle>
      <Paragraph>All content and materials provided on [Daily Earn], including logos, trademarks, and software, are owned by us or our licensors. You may not use, copy, or distribute any of this content without our prior written consent.</Paragraph>

      <SectionTitle>8. Data Privacy</SectionTitle>
      <Paragraph>We collect and process your personal information as described in our <HighlightText>Privacy Policy</HighlightText>. By using our services, you consent to the collection and processing of your data in accordance with the Privacy Policy.</Paragraph>

      <SectionTitle>9. Termination</SectionTitle>
      <Paragraph>We reserve the right to suspend or terminate your account at any time, without notice, if we believe you have violated these Terms. You may terminate your account by contacting us directly.</Paragraph>

      <SectionTitle>10. Indemnification</SectionTitle>
      <Paragraph>You agree to indemnify and hold harmless [Daily Earn], its affiliates, employees, and agents from any claims, damages, losses, liabilities, or expenses arising out of your use of our services or your violation of these Terms.</Paragraph>

      <SectionTitle>11. Dispute Resolution</SectionTitle>
      <Paragraph>Any disputes related to these Terms or the use of our services will be resolved through binding arbitration, and the arbitration will be conducted in [Your Jurisdiction].</Paragraph>

      <SectionTitle>12. Force Majeure</SectionTitle>
      <Paragraph>We are not responsible for any failure or delay in performance of our services due to causes beyond our reasonable control, including but not limited to natural disasters, technological failures, or government actions.</Paragraph>

      <SectionTitle>13. Changes to the Terms</SectionTitle>
      <Paragraph>We reserve the right to update or change these Terms at any time. Any changes will be posted on this page with an updated effective date. It is your responsibility to review these Terms periodically.</Paragraph>

      <SectionTitle>14. Contact Information</SectionTitle>
      <Paragraph>If you have any questions about these Terms or our services, please contact us at [Your Contact Email].</Paragraph>
    </Container>
  );
};

export default TermsOfService;
