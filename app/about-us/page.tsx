import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | InkArt",
  description: "Learn about InkArt, our mission, team, and journey in providing unique customized artwork and products.",
};

export default function AboutUsPage() {
  return (
    <Container>
      <div className="py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Our Story
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            InkArt was founded with a vision to bring personalized art and products to everyone.
            What started as a small passion project has grown into a thriving community of artists and customers.
          </p>
         
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground">
              We believe that art should be accessible, personal, and meaningful. Our mission is to 
              empower people to express their individuality through custom artwork and products that 
              tell their unique stories.
            </p>
            <p className="text-muted-foreground">
              By connecting talented artists with customers seeking personalization, we`&apos;re building 
              a platform where creativity flourishes and every product tells a story.
            </p>
          </div>
         
        </section>

        {/* Values Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">Our Values</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quality Craftsmanship",
                description: "We're committed to producing premium quality products that are built to last."
              },
              {
                title: "Creative Freedom",
                description: "We believe in giving artists and customers the tools to express themselves freely."
              },
              {
                title: "Sustainability",
                description: "We strive to minimize our environmental impact through responsible production practices."
              },
              {
                title: "Community",
                description: "We foster a supportive community of artists and art enthusiasts."
              },
              {
                title: "Innovation",
                description: "We continuously explore new techniques and technologies to enhance our offerings."
              },
              {
                title: "Customer Satisfaction",
                description: "We put our customers first and ensure they're delighted with every purchase."
              }
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>



      
        {/* CTA Section */}
        <section className="text-center space-y-6 py-8 px-6 bg-muted rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Whether you`&apos;re an artist looking to showcase your work or a customer seeking personalized art,
            we`&apos;d love to welcome you to our growing community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Create an Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </Container>
  );
}
