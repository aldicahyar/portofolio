"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  _gotcha: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof ContactSchema>;

interface ContactResponse {
  success: boolean;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactResponse> {
  const result = ContactSchema.safeParse(data);

  if (!result.success) {
    // Get the first error message
    const formattedError = result.error.format();
    const errorMessage = 
      formattedError.name?._errors[0] || 
      formattedError.email?._errors[0] || 
      formattedError.message?._errors[0] || 
      "Invalid input";
      
    return {
      success: false,
      message: errorMessage,
    };
  }

  const { name, email, message, _gotcha } = result.data;

  // Honeypot check: If _gotcha is filled, it's a bot.
  // Return fake success to fool the bot.
  if (_gotcha) {
    console.log("Honeypot caught a bot:", { name, email, _gotcha });
    return {
      success: true,
      message: "Message sent successfully!",
    };
  }

  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (no API key configured):", { name, email, message });
      return {
        success: true,
        message: "Message received! (Demo mode - email not sent)",
      };
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aldicahyaramadhan1@gmail.com",
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #fafafa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #ff6b00; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background: #111; padding: 16px; border-radius: 4px; border-left: 3px solid #ff6b00; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #ff6b00;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong style="color: #ff6b00;">Email:</strong> ${email}</p>
          </div>
          <div style="background: #111; padding: 16px; border-radius: 4px; margin-bottom: 16px;">
            <p style="color: #ff6b00; margin: 0 0 8px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
