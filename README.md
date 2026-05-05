# CFO Farms Application

A modern React application for CFO Farms with admin dashboard and contact functionality.

## Features

- 🏠 Landing page with company information
- 📊 Admin dashboard for managing cereal prices
- 🔐 Secure login system for admin access
- 📧 Contact form with email delivery
- 📱 Responsive design with Tailwind CSS

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install EmailJS for contact form functionality:
   ```bash
   npm install @emailjs/browser
   ```

### EmailJS Setup for Contact Form

The contact form uses EmailJS to send emails to `cfoenterprise2021@gmail.com`. Follow these steps to set it up:

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)

2. **Create an Email service:**
   - Go to Email Services in your EmailJS dashboard
   - Choose Gmail (or your preferred provider)
   - Connect your email account
   - Note the Service ID

3. **Create an Email template:**
   - Go to Email Templates
   - Create a new template with these variables:
     ```
     Subject: {{subject}}
     To: cfoenterprise2021@gmail.com

     New contact form submission from CFO Farms website:

     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     Message: {{message}}
     ```
   - Note the Template ID

4. **Get your Public Key:**
   - Go to Account → General
   - Copy your Public Key

5. **Update the contact form configuration:**
   - Open `src/components/ContactSection.jsx`
   - Replace the placeholder values:
     ```javascript
     emailjs.init({
       publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with your actual public key
     });

     await emailjs.send(
       'YOUR_EMAILJS_SERVICE_ID', // Replace with your service ID
       'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your template ID
       templateParams
     );
     ```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Admin Access

- **Email:** admin@cfofarms.com
- **Password:** admin123

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- EmailJS
- Lucide React (icons)
- Radix UI components

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── lib/                # Utilities and context
├── utils/              # Helper functions
└── main.jsx           # Application entry point
```