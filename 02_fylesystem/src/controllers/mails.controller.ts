import { FastifyReply, FastifyRequest } from 'fastify';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export class MailController {

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    sendMail = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const options: Mail.Options = {
                from: `${process.env.EMAIL}`,
                to: ['mikeed1998@gmail.com'],
                subject: 'Hello',
                html: `
                    <div style="background-color: #333; padding: 18px; text-align: center; width: 300px;">
                        <h1 style="color: snow; font-weight: normal;"> Welcome to 
                            <b>H2Code</b>
                        </h1>
                        <img src="https://cdn.pixabay.com/photo/2025/04/30/13/05/cat-9569386_1280.jpg" alt="img" width="250">
                        <a href="https://michcvdev.com" style="display: block; margin-top: 16px; text-decoration: none; color: snow; background-color: orange; padding: 5px; text-align: center; border-radius: 10px;">Open Link</a>
                    </div>
                `,
            };

            this.transporter.sendMail(options);

            return { message: 'mail sent' };
        } catch (error) {
            reply.code(500).send({ message: 'Internal Server Error' });
        }
    }

}