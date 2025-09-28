
#CitiZEntry

## 1. Overview

**CitiZEntry** is a comprehensive Progressive Web App (PWA) designed to enhance tourist safety through advanced monitoring, incident response, and digital identity management. The application leverages AI-powered anomaly detection, geo-fencing technology, and real-time tracking to create a secure ecosystem for tourists visiting high-risk or remote areas.

The app serves three primary user groups:
- **Tourists** seeking safety assurance during their travels.
- **Law Enforcement Agencies** requiring real-time monitoring capabilities.
- **Tourism Department Officials** managing visitor safety operations.

The key problems addressed include inadequate tourist safety monitoring in remote areas, delayed emergency response times, lack of digital identity verification for visitors, and insufficient data-driven insights for authorities to prevent incidents and manage tourist safety proactively.

## 2. Core Features

- **Digital Tourist Identity Management**: Blockchain-based digital ID generation, KYC integration, and secure verification at entry points.
- **AI-Powered Safety Monitoring**: Dynamic Tourist Safety Score calculation, anomaly detection (location drop-offs, inactivity), and route deviation alerts.
- **Geo-Location & Emergency Features**: Real-time GPS tracking, geo-fencing alerts, a panic button with instant location sharing, and emergency contact notifications.
- **Authority Dashboard & Response System**: Real-time tourist heat maps, a digital ID verification portal, automated E-FIR generation, and incident management tools.
- **Multilingual Support**: Support for 10+ Indian regional languages plus English to ensure accessibility for a diverse user base.

## 3. Tech Stack

### Framework
- **Next.js**: A React framework for production-grade applications, used for routing, server-side rendering, and API endpoints.

### Frontend
- **React 18**: For building the user interface with modern features.
- **TypeScript**: Provides static typing for robust and maintainable code.
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
- **ShadCN UI**: A collection of reusable, accessible, and composable UI components.
- **React Hook Form & Zod**: For streamlined and type-safe form handling and validation.
- **Recharts**: For creating interactive charts in the authority dashboard.

### Backend & AI
- **Genkit (from Google)**: The core TypeScript-based framework for building all AI features, powered by Google's Gemini models. This is used for the AI chatbot, safety score calculations, and other intelligent flows.
- **Firebase Authentication**: Manages secure user registration and login for tourists.
- **Next.js API Routes**: Hosts backend logic, such as the endpoint for the AI chatbot.

## 4. Getting Started

To get the project running locally, follow these steps:

1.  **Install Dependencies:**
    Open your terminal and run the following command to install all the necessary packages.
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    Once the installation is complete, start the development server.
    ```bash
    npm run dev
    ```

3.  **Open the Application:**
    Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## 5. Project Structure

- `src/app/`: Contains all the pages and routes for the application, following the Next.js App Router structure.
- `src/components/`: Houses all the reusable UI components, primarily built with ShadCN UI.
- `src/ai/`: Includes all the Genkit flows that power the AI features, such as the chatbot and safety score logic.
- `src/lib/`: Contains utility functions, Firebase configuration, and other shared code.
- `src/locales/`: Stores the JSON files for internationalization (i18n), enabling multilingual support.

