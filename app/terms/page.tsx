import LegalLayout from "@/components/legal/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 6, 2026">
        
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using <strong>Career Assistant</strong>, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use the application. These terms act as a legal 
          agreement between you and the platform.
        </p>

      <section>
        <h2>2. Use of the Service</h2>
        <p>
          This application is designed to help you track and manage your career journey. You are granted 
          a limited, non-exclusive, and non-transferable license to use the service for personal purposes.
        </p>
        <p>You agree <strong>NOT</strong> to:</p>
        <ul>
          <li>Use the service for any unlawful or fraudulent activities.</li>
          <li>Attempt to bypass security measures or "hack" into other users' accounts.</li>
          <li>Upload viruses, malware, or any code that could damage the application.</li>
          <li>Use automated systems (bots/scrapers) to extract data from the platform.</li>
        </ul>
      </section>

      <section>
        <h2>3. User Accounts & Security</h2>
        <p>
          To use certain features, you may need to create an account. You are responsible for:
        </p>
        <ul>
          <li>Maintaining the confidentiality of your login credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Ensuring your account information remains accurate and up-to-date.</li>
        </ul>
      </section>

      <section>
        <h2>4. User Content & Data</h2>
        <p>
          You retain full ownership of all data you upload, including job application details, CVs, 
          and cover letters. By uploading content, you grant us a limited license to host and display 
          that data solely to provide the services to you.
        </p>
        <blockquote>
          <strong>Note:</strong> We do not claim ownership over your career data, and we will never 
          sell your personal information to third parties.
        </blockquote>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          The service is provided on an "as is" and "as available" basis. While we strive for 100% 
          uptime and accuracy, <strong>Career Assistant</strong> is not liable for:
        </p>
        <ul>
          <li>Loss of data due to technical failures beyond our control.</li>
          <li>Direct or indirect damages resulting from your use of the application.</li>
          <li>Failure to secure a job or interview through the use of the platform.</li>
        </ul>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the service at any time, 
          without notice, if we believe you have violated these Terms of Service.
        </p>
      </section>

      <section>
        <h2>7. Changes to Terms</h2>
        <p>
          We may update these terms from time to time to reflect changes in our service or legal 
          obligations. We will notify you of any significant changes by posting the new terms on 
          this page.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact our support team at 
          <span className="text-blue-600 dark:text-blue-400 font-bold"> project2025php@gmail.com</span>.
        </p>
      </section>
    </LegalLayout>
  );
}