import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { sendContactForm } from "@/app/actions/contact";
import ContactForm from "./ContactForm";



export const metadata: Metadata = {
  title: "Contact Us | InkArt",
  description: "Get in touch with the InkArt team. We're here to help with any questions or inquiries about our customized products and services.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions or need assistance? We`&apos;re here to help. Reach out to our team and we`&apos;ll get back to you as soon as possible.
          </p>
        </section>

        {/* Contact Information + Form Section */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information Card */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Whether you have a question about our products, custom orders, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex p-4 rounded-lg border bg-card">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+27659446989" className="hover:text-primary">+27 65 944 6989</a>
                  </p>
                  <p className="text-sm text-muted-foreground">Monday-Friday, 9am-5pm SAST</p>
                </div>
              </div>

              <div className="flex p-4 rounded-lg border bg-card">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@inkart.store" className="hover:text-primary">info@inkart.store</a>
                  </p>
                  <p className="text-sm text-muted-foreground">We`&apos;ll respond as soon as possible</p>
                </div>
              </div>

              <div className="flex p-4 rounded-lg border bg-card">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Johannesburg, South Africa</p>
                  <p className="text-sm text-muted-foreground">Serving customers worldwide</p>
                </div>
              </div>
            </div>

            {/* Social Media and FAQ Links */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com/inkartstore" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://instagram.com/inkartstore" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://twitter.com/inkartstore" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
              <p>
                Check our <a href="/faq" className="text-primary hover:underline">FAQ section</a> for quick answers to common questions.
              </p>
            </div>
          </div>          {/* Contact Form */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping typically takes 3-7 business days within South Africa, and 10-15 business days for international orders. Express shipping options are also available at checkout."
              },
              {
                question: "Can I customize my order?",
                answer: "Yes! Most of our products can be customized. Visit our customization page to upload your designs or work with our design team."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of delivery for unused items in original packaging. Custom orders cannot be returned unless there's a defect."
              },
              {
                question: "Do you offer wholesale pricing?",
                answer: "Yes, we offer wholesale options for businesses. Please contact us directly at info@inkart.store for wholesale inquiries."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
         
        </section>

      
      </div>
    </Container>
  );
}
