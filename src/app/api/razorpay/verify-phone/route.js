import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("Verify Error: Missing RAZORPAY_KEY_SECRET in environment variables.");
      return NextResponse.json({ error: "Payment service is not configured." }, { status: 500 });
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      name, 
      phone, 
      query 
    } = await request.json();

    // Verify Signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch:", { expected: expectedSignature, received: razorpay_signature });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Set up Nodemailer
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (smtpEmail && smtpPassword && smtpPassword !== 'your_app_password') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

      const mailOptions = {
        from: smtpEmail,
        to: smtpEmail, // Sending to Deepali's inbox
        subject: `New Phone Consultation Request - Payment Verified (₹200)`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #16a34a;">New Phone Consultation Request</h2>
            <p><strong>Razorpay Payment ID:</strong> ${razorpay_payment_id}</p>
            <p><strong>Service Purchased:</strong> Solving Queries (Phone Consultation) - ₹200</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <h3 style="color: #1f2937;">Client Details for Callback</h3>
            <ul style="background: #f9fafb; padding: 20px; border-radius: 8px; list-style: none; margin: 0;">
              <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
              <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
            </ul>
            <br />
            <h3 style="color: #1f2937;">Query/Message</h3>
            <p style="background: #fdf2f8; padding: 20px; border-radius: 8px; font-style: italic;">
              ${query || 'No specific query provided.'}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.log('Skipping email send: SMTP credentials not configured. Payment was still verified successfully.');
    }

    return NextResponse.json({ message: "Verification & Email successful" }, { status: 200 });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Something went wrong during verification" }, { status: 500 });
  }
}
