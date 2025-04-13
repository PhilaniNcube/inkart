"use server";

import { z } from "zod";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

// Create a Resend client instance
const resend = new Resend(process.env.RESEND_API_KEY);

// Define validation schema for contact form
const ContactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

// Define return type for the form submission
type ContactFormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
};

/**
 * Server action to send contact form emails
 */
export async function sendContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    // Parse form data with Zod schema
    const validationResult = ContactFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    // If validation fails, return errors
    if (!validationResult.success) {
        return {
            success: false,
            message: "Please check your inputs and try again.",
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    // Validation passed, extract form data
    const { name, email, subject, message } = validationResult.data;

    try {
        // Send email using Resend
        const emailResult = await resend.emails.send({
            from: `Contact Form <info@inkart.store>`,
            to: "info@inkart.store", // Your company's receiving email
            subject: `Contact Form: ${subject}`,

            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `,
        });

        // Optional: Send confirmation email to the user
        await resend.emails.send({
            from: `InkArt <info@inkart.store>`,
            to: email,
            subject: "We've received your message - InkArt",
            text: `
Hello ${name},

Thank you for contacting InkArt. We've received your message and will get back to you shortly.

Your message details:
Subject: ${subject}

Best regards,
The InkArt Team
+27 65 944 6989
info@inkart.store
      `,
        });

        // Revalidate the contact-us page to reflect changes
        revalidatePath("/contact-us");

        // Return success state
        return {
            success: true,
            message: "Thank you! Your message has been sent successfully.",
        };
    } catch (error) {
        console.error("Failed to send contact form email:", error);

        // Return error state
        return {
            success: false,
            message: "Failed to send your message. Please try again later.",
        };
    }
}
