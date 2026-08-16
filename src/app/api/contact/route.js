import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword || smtpPassword === 'your_app_password') {
      console.error('SMTP credentials are not configured.');
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: smtpEmail,
      to: smtpEmail,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1f2937;">New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <h3 style="color: #1f2937;">Message</h3>
          <p style="background: #f9fafb; padding: 20px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
