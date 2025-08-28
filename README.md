# Vasquez Law Firm Website

**Last Updated:** January 11, 2025 - Environment Validation Added

## Recent Updates

- Added comprehensive environment variable validation
- Build-time checks for required variables
- Helpful error messages for missing configurations
- Interactive setup script for new developers

## Live Site

https://vasquez-law-website.vercel.app

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vasquez-law-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Interactive setup (recommended)
   npm run setup:env

   # Or manually copy and edit
   cp .env.example .env.local
   ```

4. **Validate your configuration**

   ```bash
   npm run validate:env
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables

The application requires several environment variables to function properly. See [ENV-SETUP-GUIDE.md](./ENV-SETUP-GUIDE.md) for detailed documentation.

### Required Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret (min 32 chars)
- `OPENAI_API_KEY` - OpenAI API key for chatbot
- `NEXT_PUBLIC_APP_URL` - Application URL

### Build-Time Validation

The build process automatically validates all required environment variables. If any are missing or invalid, the build will fail with helpful error messages explaining what needs to be configured.
