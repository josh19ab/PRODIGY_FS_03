import {
  Button,
  Html,
  Head,
  Preview,
  Body,
  Text,
  Container,
  Section,
  Row,
  Column,
  Img,
} from "@react-email/components";
import { IndianRupee } from "lucide-react";
import * as React from "react";

export const EmailTemplate = ({ firstName, email, products, amount }) => {
  // Ensure amount is a number and format it
  const formattedAmount =
    typeof amount === "number"
      ? amount.toFixed(2)
      : parseFloat(amount).toFixed(2);

  return (
    <Html>
      <Head>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 20px;
              max-width: 600px;
              margin: auto;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #e0e0e0;
            }
            .footer {
              text-align: center;
              padding: 20px 0;
              border-top: 2px solid #e0e0e0;
              margin-top: 20px;
              font-size: 12px;
              color: #777;
            }
            .product-list {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .product-list th, .product-list td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #e0e0e0;
            }
            .product-list th {
              background-color: #f8f8f8;
            }
            .product {
              display: flex;
              align-items: center;
            }
            .product-image {
              width: 50px;
              height: 50px;
              border-radius: 5px;
              margin-right: 10px;
            }
            .total {
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
              display:flex;
              justify-content: flex-end;
            }
            .button {
              display: inline-block;
              background-color: #007bff; 
              color: #ffffff; 
              padding: 15px 30px; 
              text-decoration: none;
              border-radius: 4px; 
              text-align: center;
              margin-top: 20px;
              font-weight: bold; 
              font-size: 16px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
              transition: background-color 0.3s ease; 
              }

            .button:hover {
                background-color: #0056b3; 
            }
          `}
        </style>
      </Head>
      <Preview>Your order receipt from our e-commerce store</Preview>
      <Body>
        <Container className="container">
          <Section className="header">
            <h1>UrbanKicks</h1>
            <p>Thank you for your purchase, {firstName}!</p>
          </Section>
          <Section>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            <Text>Here are the details of your order:</Text>
          </Section>
          <Section>
            <table className="product-list">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Product</th>
                  <th style={{ width: "25%" }}>Price</th>
                  <th style={{ width: "25%" }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="product">
                      {product.url && (
                        <Img
                          src={product.url}
                          alt="Product image"
                          className="product-image"
                        />
                      )}
                      <Text>{product.name}</Text>
                    </td>
                    <td>
                      <Text>
                        <IndianRupee /> {product.price.toFixed(2)}
                      </Text>
                    </td>
                    <td>
                      <Text>{product.quantity || 1}</Text>{" "}
                      {/* Assuming quantity is available */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
          <Section>
            <Text className="total">
              <Text>Total Amount:</Text>
              <Text>
                <IndianRupee /> {formattedAmount}
              </Text>
            </Text>
          </Section>
          <Section className="footer">
            <Text>Thank You For Shopping From UrbanKicks.</Text>
            <Button href="https://e-commerce-jo.vercel.app" className="button">
              Continue Shopping
            </Button>
            <Text>If you have any questions, feel free to contact us.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
