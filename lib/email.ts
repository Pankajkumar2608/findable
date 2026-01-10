
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendFoundEmail = async (
  ownerEmail: string,
  itemName: string,
  finderMessage: string,
  location: string | undefined,
  replyLink: string
) => {
  try {
    await resend.emails.send({
      from: 'Findable <noreply@findable.app>', // Update this with a valid sender if available, or use a testing domain
      to: ownerEmail,
      subject: `Your ${itemName} has been found!`,
      html: `
        <h1>Good news! Someone found your ${itemName}</h1>
        <p><strong>Message from finder:</strong></p>
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
          ${finderMessage}
        </blockquote>
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
        <p>Click the link below to reply securely:</p>
        <a href="${replyLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Finder</a>
        <p><small>Your email address is kept private.</small></p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending found email:', error);
    return { success: false, error };
  }
};

export const sendReplyEmail = async (
  finderEmail: string,
  itemName: string,
  ownerMessage: string
) => {
  try {
    await resend.emails.send({
      from: 'Findable <noreply@findable.app>',
      to: finderEmail,
      subject: `Reply from owner of ${itemName}`,
      html: `
        <h1>New message regarding ${itemName}</h1>
        <p><strong>Message from owner:</strong></p>
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
          ${ownerMessage}
        </blockquote>
        <p>You can reply to this email thread to continue the conversation (if facilitated via email reply-to) or wait for further instructions.</p> 
        <p><small>Note: This system currently supports one-way web replies from owner. Finder receives this via email.</small></p>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending reply email:', error);
    return { success: false, error };
  }
};
