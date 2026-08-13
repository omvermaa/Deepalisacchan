# Project Overview
**Project Name:** Dietician Deepali Sachan - Portfolio & Consultation Platform
**Description:** A full-stack web application for Dietician Deepali Sachan (13+ years of experience). The platform showcases her expertise, offers a free BMI calculator with health insights, and includes a premium, gamified (MCQ-style) consultation form where users can submit their health details, upload medical records, and pay via Razorpay to request a personalized diet plan.
**Tech Stack:** Next.js (App Router), JavaScript (Strictly NO TypeScript), Tailwind CSS, Framer Motion (for intuitive UI/animations), Razorpay (Payments), Nodemailer (Email notifications).

---

## 1. Tech Stack & Setup Instructions
- **Framework:** Next.js 14+ (App Router)
- **Language:** JavaScript (`.js` and `.jsx` files only. DO NOT use TypeScript).
- **Styling:** Tailwind CSS for a neat, professional, and modern UI.
- **Icons:** `lucide-react`
- **Animations:** `framer-motion` (specifically for the MCQ puzzle-like form transitions).
- **Backend/API:** Next.js Route Handlers (`app/api/...`)
- **Key Dependencies:** `razorpay`, `nodemailer`, `formidable` (or Next.js native API for file uploads), `framer-motion`, `axios`.

---

## 2. Page Structure & UI Requirements

### A. Global UI/UX
- **Theme:** Clean, clinical yet welcoming (suggested palette: soft greens, whites, and neutral grays).
- **Navigation:** Header with Logo, Home, About, Contact, and a prominent "Get Custom Diet Plan" CTA button.

### B. Home Page (`/`)
- **Hero Section:** 
  - Headline highlighting "13+ Years of Expertise in Diet & Nutrition".
  - Subheadline focusing on personalized health goals.
  - A dedicated "Google Reviews" badge/section linking to her Google Business Profile. Design this as a beautiful carousel or grid of 5-star review cards.
- **BMI Calculator Section (Free Tool):**
  - Inputs: Age, Gender, Height (cm), Weight (kg).
  - Output: Calculates BMI.
  - Value Add: Based on the BMI result and Age, conditionally render a clean card showing "Potential Positives" (Goods) and "Areas to Work On" (Bads). 

### C. About Page (`/about`)
- Showcase Deepali Sachan’s journey, her philosophy on nutrition, certifications, and her 13+ years of success stories. Keep the typography clean and readable.

### D. Contact Page (`/contact`)
- Simple contact form (Name, Email, Message) and display of clinic location, phone number, email, and Google Maps embed or link to the business listing.

### E. Paid Consultation Page (`/consultation`)
- **Gamified "Puzzle/MCQ" Form Component:**
  - Build a multi-step form using `framer-motion` to slide between questions like a quiz.
  - **Step 1:** Basic Body Stats (Age, Height, Weight, Gender).
  - **Step 2:** Goal Selection (Weight loss, Weight gain, PCOS, Diabetes, etc. - Visual clickable cards).
  - **Step 3:** Current Diet (Veg, Non-Veg, Vegan, Keto - Visual cards).
  - **Step 4:** Medical History & File Upload (Text area for history, File input for optional medical records).
  - **Step 5 (The Lock Screen):** Once data is entered, show a sleek UI prompt: *"Your personalized diet plan request is locked and ready. Proceed to pay to send your details to Dietician Deepali."*
  - **Step 6:** Razorpay Checkout Integration.

---

## 3. Backend & API Logic (Next.js API Routes)

### A. Razorpay Integration
1. **Create Order API (`/api/razorpay/create-order`):**
   - Initialize Razorpay instance with `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
   - Create an order for the consultation fee (e.g., INR 1500) and return the `order_id` to the frontend.

### B. Payment Verification & Email Service
2. **Verify Payment & Send Email API (`/api/razorpay/verify`):**
   - Receive Razorpay payment details (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`) AND the user's form data (JSON + file attachments).
   - Verify the signature using the Razorpay Secret.
   - **If verification succeeds:** Trigger Nodemailer.

3. **Nodemailer Setup:**
   - Configure Nodemailer with SMTP credentials (e.g., Gmail App Password) stored in `.env`.
   - Compile the user data into a clean, organized HTML email.
   - Attach the uploaded medical records (using buffers) to the email.
   - Send the email to Deepali's inbox so she receives a complete, organized dossier of the client immediately after successful payment.
   - Return a success response to the frontend to redirect the user to a "Thank You" page.

---

## 4. Environment Variables Needed (`.env.local`)
Please remind the developer to set these up:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
SMTP_EMAIL="deepali_business_email@gmail.com"
SMTP_PASSWORD="your_app_password"