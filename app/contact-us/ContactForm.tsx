"use client";

import { sendContactForm } from "@/app/actions/contact";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useActionState } from "react";


// Initial state for the contact form
const initialState = {
    success: false,
    message: "",
    errors: {},
};



export default function ContactForm() {
    // Use form state to manage the state of the form submission
    const [state, formAction, isPending] = useActionState(sendContactForm, initialState);

    return (
        <form action={formAction} className="space-y-4">
            {/* Form Status Messages */}
            {state.message && (
                <Alert
                    variant={state.success ? "default" : "destructive"}
                    className={state.success ? "bg-green-50 text-green-800 border-green-200" : undefined}
                >
                    {state.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name Field */}
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        aria-invalid={!!state.errors?.name}
                        aria-describedby={state.errors?.name ? "name-error" : undefined}
                    />
                    {state.errors?.name && (
                        <p id="name-error" className="text-sm text-red-500">
                            {state.errors.name[0]}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        aria-invalid={!!state.errors?.email}
                        aria-describedby={state.errors?.email ? "email-error" : undefined}
                    />
                    {state.errors?.email && (
                        <p id="email-error" className="text-sm text-red-500">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    aria-invalid={!!state.errors?.subject}
                    aria-describedby={state.errors?.subject ? "subject-error" : undefined}
                />
                {state.errors?.subject && (
                    <p id="subject-error" className="text-sm text-red-500">
                        {state.errors.subject[0]}
                    </p>
                )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    aria-invalid={!!state.errors?.message}
                    aria-describedby={state.errors?.message ? "message-error" : undefined}
                />
                {state.errors?.message && (
                    <p id="message-error" className="text-sm text-red-500">
                        {state.errors.message[0]}
                    </p>
                )}
            </div>

            {/* Submit Button with loading state */}
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    );
}
