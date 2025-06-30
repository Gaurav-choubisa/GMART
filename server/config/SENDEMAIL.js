import { Resend } from 'resend';
import 'dotenv/config';

if (!process.env.RESEND_API) {
  console.log('RESEND_API environment variable is not set');
}

// Create Resend client instance with your API key
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async (sendto, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'GMART <onboarding@resend.dev>',
      to: [sendto],
      subject: subject,
      html: html,
    });
    if (error) {
      console.error('Error from resend:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.log('Error sending email:', error);
    return null;
  }
}

export default sendEmail;
