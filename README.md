# 🎯 Intervue Bloom

An AI-powered interview preparation platform that helps candidates practice real interview scenarios and receive instant, personalized feedback to improve their performance.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7.0-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- 🤖 **AI-Powered Interviews** - Practice with an intelligent AI interviewer using VAPI voice AI
- 📊 **Instant Feedback** - Get detailed performance analysis and improvement suggestions
- 🎯 **Customizable Scenarios** - Choose from technical, behavioral, or mixed interview types
- 🛠️ **Tech Stack Specific** - Practice interviews tailored to your tech stack (React, Node.js, Python, etc.)
- 📈 **Progress Tracking** - Monitor your interview history and track improvement over time
- 🔐 **Secure Authentication** - Firebase-powered authentication with session management
- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS and shadcn/ui

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** React Hooks
- **Form Handling:** React Hook Form + Zod validation

### Backend
- **Runtime:** Next.js Server Actions
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **AI Integration:** VAPI AI, Google AI SDK

### DevOps
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Quality:** ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher (recommended for Firebase compatibility)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IamUtkarshRaj/Intervue_Bloom.git
   cd Intervue_Bloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration (Client)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # VAPI AI Configuration
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
   VAPI_PRIVATE_KEY=your_vapi_private_key

   # Google AI SDK
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** (Email/Password)
   - Create a **Firestore Database**
   - Download the service account JSON and add credentials to `.env.local`
   - Create the following Firestore indexes:
     - Collection: `interviews`
       - Fields: `userId` (Ascending), `createdAt` (Descending)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
intervue-bloom/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Authentication routes
│   │   ├── sign-in/          # Sign in page
│   │   └── sign-up/          # Sign up page
│   ├── (root)/               # Main application routes
│   │   ├── interview/        # Interview pages
│   │   └── page.tsx          # Home page
│   ├── api/                  # API routes
│   │   └── vapi/             # VAPI integration
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # UI components (shadcn)
│   ├── Agent.tsx             # AI interview agent
│   ├── AuthForm.tsx          # Authentication form
│   └── InterviewCard.tsx     # Interview card component
├── lib/                      # Utility libraries
│   ├── actions/              # Server actions
│   │   ├── auth.action.ts    # Authentication logic
│   │   └── general.action.ts # General data operations
│   ├── utils.ts              # Utility functions
│   └── vapi.sdk.ts           # VAPI SDK integration
├── firebase/                 # Firebase configuration
│   ├── admin.ts              # Firebase Admin SDK
│   └── client.ts             # Firebase Client SDK
├── constants/                # Application constants
├── types/                    # TypeScript type definitions
└── public/                   # Static assets
```

## 🎮 Usage

### Creating an Account
1. Navigate to the **Sign Up** page
2. Enter your name, email, and password
3. Click **Sign Up** to create your account

### Starting an Interview
1. Go to the **Interview** page
2. Select your interview preferences:
   - Role (e.g., Frontend Developer, Full Stack Developer)
   - Interview type (Technical, Behavioral, Mixed)
   - Experience level (Junior, Mid, Senior)
   - Tech stack (React, Node.js, Python, etc.)
   - Number of questions
3. Click **Start Interview** to begin
4. Interact with the AI interviewer via voice

### Viewing Feedback
1. After completing an interview, navigate to the **Feedback** page
2. Review your performance scores across different categories
3. Read strengths and areas for improvement
4. Use insights to prepare for future interviews

## 🔥 Firebase Setup Guide

### Required Collections

**users**
```typescript
{
  name: string;
  email: string;
  // Additional fields as needed
}
```

**interviews**
```typescript
{
  userId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  questions: string[];
  finalized: boolean;
  createdAt: Timestamp;
}
```

**feedback**
```typescript
{
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: Timestamp;
}
```

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Utkarsh Raj**
- GitHub: [@IamUtkarshRaj](https://github.com/IamUtkarshRaj)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [VAPI AI](https://vapi.ai/) - Voice AI integration
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

<p align="center">Made with ❤️ by Utkarsh Raj</p>
