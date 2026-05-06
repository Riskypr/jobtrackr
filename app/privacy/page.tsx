import LegalLayout from "@/components/legal/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 6, 2026">
      <h2>1. Information We Collect</h2>
      <p>
        We collect information that you voluntarily provide to us when you register on the App, 
        including personal info and career-related data.
      </p>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, and account credentials.</li>
        <li><strong>Career Data:</strong> Job history, application status, and uploaded CVs.</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>
        Your data is used strictly to provide the features of this application. We do not sell 
        your personal data to third parties for marketing purposes.
      </p>

      <h2>3. Data Security</h2>
      <p>
        We implement robust security measures to protect your information. However, please remember 
        that no method of transmission over the internet is 100% secure.
      </p>

      <h2>4. Your Choices</h2>
      <p>
        You can review, change, or terminate your account at any time through your dashboard 
        profile settings.
      </p>
    </LegalLayout>
  );
}