import Container from "@/components/layout/Container";

const page = () => {
  return (
    <Container>
      <div className="w-full">
        <h1 className="text-4xl font-bold text-gray-900">
          Terms and Conditions
        </h1>
        <h3 className="text-lg text-gray-500">Welcome to Ink Art!</h3>
        <p className="my-4 text-md text-gray-500">
          These terms and conditions (the &apos;Terms&apos;) govern your use of
          the Ink Art website (the &apos;Website&apos;) and any products or
          services offered on the Website (the &apos;Services&apos;). By using
          the Website or Services, you agree to be bound by these Terms.
        </p>
        <h3 className="text-lg text-gray-500">1. Intellectual Property</h3>
        <p className="my-4 text-md text-gray-500">
          All content on the Website, including but not limited to text, images,
          graphics, logos, button icons, software, music, sound, and videos
          (collectively, the &apos;Content&apos;), is the property of Ink Art or
          its licensors and is protected by copyright, trademark, and other
          intellectual property laws. You may not use the Content without the
          express written permission of Ink Art.
        </p>
        <h3 className="text-lg text-gray-500">2. User Content</h3>
        <p className="my-4 text-md text-gray-500">
          If you submit any content to the Website, such as reviews, comments,
          or images (collectively, &apos;User Content&apos;), you grant Ink Art
          a non-exclusive, royalty-free, perpetual, irrevocable, and
          sublicensable right to use, reproduce, modify, adapt, publish,
          translate, create derivative works from, distribute, and display such
          User Content in any media or format, now known or hereafter devised.
          You represent and warrant that you own or have the necessary rights to
          submit User Content to the Website and that such User Content does not
          violate the intellectual property or other rights of any third party.
        </p>
        <h3 className="text-lg text-gray-500">3. Purchases</h3>
        <p className="my-4 text-md text-gray-500">
          If you purchase any products or services from the Website, you agree
          to the terms and conditions of the applicable purchase agreement.
        </p>
        <h3 className="text-lg text-gray-500">4. Shipping</h3>
        <p className="my-4 text-md text-gray-500">
          All shipping costs are included in the final price of the order. Ink
          Art will ship products to the address provided by the customer.
        </p>
        <h3 className="text-lg text-gray-500">5. Returns</h3>
        <p className="my-4 text-md text-gray-500">
          Ink Art offers a 30-day return policy for all products. To return a
          product, please contact Ink Art customer service.
        </p>
        <h3 className="text-lg text-gray-500">6. Liability</h3>
        <p className="my-4 text-md text-gray-500">
          Ink Art is not liable for any damages or losses, whether direct,
          indirect, incidental, consequential, or punitive, arising out of or in
          connection with your use of the Website or Services.
        </p>
        <h3 className="text-lg text-gray-500">7. Governing Law</h3>
        <p className="my-4 text-md text-gray-500">
          These Terms are governed by and construed in accordance with the laws
          of the State of California. Any disputes arising out of or in
          connection with these Terms shall be resolved by binding arbitration
          in accordance with the rules of the American Arbitration Association.
        </p>
        <h3 className="text-lg text-gray-500">8. Entire Agreement</h3>
        <p className="my-4 text-md text-gray-500">
          These Terms constitute the entire agreement between you and Ink Art
          regarding your use of the Website and Services. These Terms supersede
          all prior or contemporaneous communications, representations, or
          agreements, whether oral or written.
        </p>
        <h3 className="text-lg text-gray-500">9. Changes to the Terms</h3>
        <p className="my-4 text-md text-gray-500">
          Ink Art may modify these Terms at any time. The most current version
          of the Terms will be posted on the Website.
        </p>
        <h3 className="text-lg text-gray-500">10. Contact Us</h3>
        <p className="my-4 text-md text-gray-500">
          If you have any questions about these Terms, please contact Ink Art
          customer service at info@inkart.store.
        </p>
      </div>
    </Container>
  );
};
export default page;
