# Advertising Analytics Dashboard

The Advertising Analytics Dashboard is a comprehensive solution for tracking and analyzing advertising data from multiple platforms. This project is designed to provide actionable insights into marketing performance, enabling businesses to optimize their ad spend and strategies.

## Features

- **Tracking Data**: Consolidate and visualize advertising data from multiple sources.
- **Supported Platforms**:
  - Google Analytics
  - Google Ads
  - Meta Ads (Facebook/Instagram)
  - Bing Ads
  - TikTok Ads
  - X Ads (formerly Twitter)
  - LinkedIn Ads
  - Pinterest Ads
  - Snapchat Ads
  - Amazon Ads
  - Spotify Ads
  - Mailchimp
  - Cyberimpact
- **Authentication**: Secure login using Firebase Authentication (Google Sign-In only).
- **Backend**: Firebase Firestore for database management.
- **API Integration**: Retrieve and aggregate data from various advertising dashboards using Python Flask.
- **Frontend**: Built with Next.js 15 using TypeScript, Tailwind CSS, and the App Router.
- **Deployment**: Hosted on Vercel, accessible at [advertisinganalyticsdashboard.com](https://advertisinganalyticsdashboard.com).
- **Email Support**: Contact us at [contact@advertisinganalyticsdashboard.com](mailto:contact@advertisinganalyticsdashboard.com).

---

## Technologies Used

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint

### Backend

- **Framework**: Python Flask
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (Google Sign-In only)

### Deployment

- **Hosting**: Vercel
- **Domain**: [advertisinganalyticsdashboard.com](https://advertisinganalyticsdashboard.com)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Python](https://www.python.org/) 3.8+
- Firebase account with Firestore and Authentication configured
- Vercel account for deployment
- Cloudflare account for domain and email setup

---

### Installation

#### 1. Clone the Repository

```bash
$ git clone https://github.com/Neilsmahajan/advertising-analytics-dashboard.git
$ cd advertising-analytics-dashboard
```

#### 2. Install Dependencies

```bash
# Install frontend dependencies
$ npm install
```

#### 3. Set Up Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore and Firebase Authentication (Google Sign-In).
- Download the Firebase configuration JSON and place it in the `src/config` directory.

#### 4. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### 5. Start the Development Server

```bash
$ npm run dev
```

Navigate to `http://localhost:3000` in your browser.

---

## Firebase Functions Python Backend Setup

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For inquiries or support, please email [contact@advertisinganalyticsdashboard.com](mailto:contact@advertisinganalyticsdashboard.com).
