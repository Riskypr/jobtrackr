# JobTrackr

JobTrackr is a modern job application tracking application built with Next.js, designed to help job seekers manage their career opportunities efficiently. Track applications, update timelines, monitor statuses, and leverage AI-powered features to streamline the job search process.

## Features

- **Centralized Dashboard**: Manage all job applications in one intuitive workspace
- **Timeline & Reminders**: Automated notifications for interviews, follow-ups, and deadlines
- **AI Smart Parser**: Automatically extract job details (company name, position, location, requirements) from job descriptions
- **AI Cover Letter Generator**: Generate personalized cover letters tailored to specific jobs and companies
- **Status Tracking**: Update and monitor application progress with visual timelines
- **Analytics**: View application statistics and conversion rates
- **Secure Authentication**: Google SSO integration for safe access
- **Export Functionality**: Export cover letters to .doc files

## Tech Stack

### Core Dependencies
- **Next.js 16.2.4** - React framework for production
- **React 19.2.4** - UI library
- **Prisma** - Database ORM and migration tool
- **NextAuth.js** - Authentication library with Google SSO
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Recharts** - Chart library for analytics

### AI & External Services
- **@google/genai** - Google Generative AI for smart parsing and cover letter generation

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- A database (PostgreSQL recommended for production)
- Google OAuth credentials for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobtrackr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Database
   DATABASE_URL="your-database-connection-string"

   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Google AI
   GOOGLE_AI_API_KEY="your-google-ai-api-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started
1. Visit the homepage and click "Sign Up" to create an account using Google SSO
2. Once logged in, you'll be redirected to the dashboard

### Adding a Job Application
1. Click the "Add Job" button (floating button or in the jobs section)
2. Use the AI Smart Parser: Copy and paste the job description
3. The AI will automatically extract:
   - Company name
   - Position title
   - Location
   - Job requirements
4. Review and edit the extracted information if needed
5. Save the job application

### Managing Applications
- **Dashboard**: View all applications with status overview
- **Timeline**: Track progress and set reminders for important dates
- **Status Updates**: Update application status (Applied, Interviewing, Offer, Rejected, etc.)
- **Analytics**: Monitor application trends and success rates

### Using AI Cover Letter
1. Navigate to the AI Cover Letter section
2. Select a job application
3. The AI will generate a personalized cover letter based on:
   - Job requirements
   - Company information
   - Your profile details
4. Edit and customize the generated letter
5. Export to .doc file for use

### Additional Features
- **Profile Management**: Update your personal information for better AI suggestions
- **Settings**: Customize app preferences and notifications
- **Dark/Light Mode**: Toggle between themes

## Project Structure

```
jobtrackr/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── utils/                 # Helper functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
