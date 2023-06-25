import Container from "@/components/layout/Container";

const page = () => {
  return (
    <Container>
      <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="my-4 text-md text-gray-500">
        Ink Art respects your privacy. This Privacy Policy describes how we
        collect, use, and share your personal information when you visit or make
        a purchase from our website.
      </p>
      <h3 className="text-lg text-gray-500">
        What personal information do we collect?
      </h3>{" "}
      <p className="my-4 text-md text-gray-500">
        We collect the following personal information from you when you visit
        our website:
      </p>
      <ul className="mt-2 text-md text-gray-500">
        <li className=" text-md text-gray-500">Your name and email address</li>
        <li className=" text-md text-gray-500">
          Your shipping and billing address
        </li>
        <li className=" text-md text-gray-500">Your payment information</li>
        <li className=" text-md text-gray-500">Your IP address</li>
        <li className=" text-md text-gray-500">Your browsing activity</li>
      </ul>{" "}
      <p className="my-4 text-md text-gray-500">
        We also collect information about your interactions with our website,
        such as the pages you visit, the products you view, and the searches you
        conduct.
      </p>{" "}
      <h3 className="text-lg text-gray-500">
        How do we use your personal information?
      </h3>{" "}
      <p className="my-4 text-md text-gray-500">
        We use your personal information to:
      </p>{" "}
      <ul className="mt-2 text-md text-gray-500">
        <li className=" text-md text-gray-500">
          Process your orders and fulfill your requests
        </li>
        <li className=" text-md text-gray-500">
          Communicate with you about your orders, products, and services
        </li>
        <li className=" text-md text-gray-500">
          Provide you with customer support
        </li>
        <li className=" text-md text-gray-500">
          Personalize your experience on our website
        </li>
        <li className=" text-md text-gray-500">
          Send you marketing and promotional materials
        </li>
        <li className=" text-md text-gray-500">
          Improve our website and services
        </li>
        <li className=" text-md text-gray-500">
          Comply with our legal obligations
        </li>
      </ul>{" "}
      <h3 className="text-lg text-gray-500">
        Who do we share your personal information with?
      </h3>{" "}
      <p className="my-4 text-md text-gray-500">
        We may share your personal information with the following third parties:
      </p>{" "}
      <ul className="mt-2 text-md text-gray-500">
        <li className=" text-md text-gray-500">Our payment processors</li>
        <li className=" text-md text-gray-500">Our shipping partners</li>
        <li className=" text-md text-gray-500">Our marketing partners</li>
        <li className=" text-md text-gray-500">Our analytics providers</li>
      </ul>{" "}
    </Container>
  );
};
export default page;
