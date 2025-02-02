import {WelcomeTemplate }from "@components/email/Welcome-template" 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
   
    const { data, error } = await resend.emails.send({
      from: 'sanjai.l2021ai@sece.ac.in',
      to: ['sanjaisam333@gmail.com'],
      subject: 'Hello world',
      react: WelcomeTemplate({ firstName: 'John' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
