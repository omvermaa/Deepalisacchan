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

    const formData = await request.formData();
    
    // Payment specific details
    const razorpay_order_id = formData.get('razorpay_order_id');
    const razorpay_payment_id = formData.get('razorpay_payment_id');
    const razorpay_signature = formData.get('razorpay_signature');
    
    // User details
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const height = formData.get('height');
    const weight = formData.get('weight');
    const goal = formData.get('goal');
    const diet = formData.get('diet');
    const medicalHistory = formData.get('medicalHistory');
    
    // File
    const file = formData.get('file');

    // Verify Signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch:", { expected: expectedSignature, received: razorpay_signature });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Process file if present
    const attachments = [];
    if (file && file.size > 0 && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
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
        subject: `New Diet Consultation Request - Payment Verified`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #16a34a;">New Client Consultation Details</h2>
            <p><strong>Razorpay Payment ID:</strong> ${razorpay_payment_id}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <h3 style="color: #1f2937;">Client Profile</h3>
            <ul style="background: #f9fafb; padding: 20px; border-radius: 8px; list-style: none; margin: 0;">
              <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
              <li style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</li>
              <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
              <li style="margin-bottom: 10px;"><strong>Age:</strong> ${age}</li>
              <li style="margin-bottom: 10px;"><strong>Gender:</strong> ${gender}</li>
              <li style="margin-bottom: 10px;"><strong>Height:</strong> ${height} cm</li>
              <li style="margin-bottom: 10px;"><strong>Weight:</strong> ${weight} kg</li>
              <li style="margin-bottom: 10px;"><strong>Goal:</strong> ${goal}</li>
              <li style="margin-bottom: 10px;"><strong>Diet:</strong> ${diet}</li>
            </ul>
            <br />
            <h3 style="color: #1f2937;">Medical History</h3>
            <p style="background: #fdf2f8; padding: 20px; border-radius: 8px; font-style: italic;">
              ${medicalHistory || 'None provided.'}
            </p>
            <br />
            <p style="color: #6b7280; font-size: 14px;"><em>Check attachments for any uploaded medical records.</em></p>
          </div>
        `,
        attachments,
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
