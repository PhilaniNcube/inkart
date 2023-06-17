import * as React from "react";

interface EmailTemplateProps {
  first_name: string;
  last_name: string;
  email: string;
  order_id: string;
  address: string;
  city: string;
  state: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  first_name,
  last_name,
  email,
  order_id,
  address,
  city,
  state
}) => (
  <div>
    <h1>Hello, {first_name} {last_name}!</h1>
    <p>
      Thank you for your order. We will get back to you as soon as
      possible. Once we have confiremed the payment your order will be dispatched. Please see your delivery details below. If they are incorrect please send us an email at info@inkart.store
    </p>
    <p>
      <strong>Order ID:</strong> {order_id}
    </p>
    <table>
      <thead>
        <tr>
          <th>Detail</th>
          <th>Info</th>

        </tr>
      </thead>
      <tbody>
        <tr>
            <td>First Name</td>
            <td>{first_name}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{last_name}</td>
        </tr>
        <tr>
         <td>Email</td>
         <td>{email}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>City</td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{state}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default EmailTemplate;
