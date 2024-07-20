import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  console.log(body); // Log the request body for debugging

  try {
    const { email, userName, products, amount } = body; // Destructure the necessary fields

    // Log the input values for debugging
    console.log("Email:", email);
    console.log("User Name:", userName);
    console.log("Total Amount:", amount);

    // Ensure EmailTemplate returns a valid HTML string
    const emailContent = EmailTemplate({
      firstName: userName, // Assuming userName is passed as firstName
      email: email,
      products: products, // Include products in the template
      amount: amount,
    });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Order Invoice Details",
      react: emailContent, // Use the rendered email content
    });

    if (error) {
      console.error("Error sending email:", error); // Log the error
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error in POST handler:", error); // Log the error
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
