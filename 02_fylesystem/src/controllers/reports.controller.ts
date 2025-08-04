import { FastifyReply, FastifyRequest } from "fastify";
import PdfPrinter from "pdfmake";
import { Readable } from 'node:stream';

export class ReportsController {
    private printer;

    constructor() {
        const fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };

        this.printer = new PdfPrinter(fonts);
    }

    getInvoice = async (request: FastifyRequest, reply: FastifyReply) => {
        const docDefinition = {
            content: [
                { text: 'Hello World', fontSize: 20 }
            ]
        };
        
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
        
        // Configurar headers correctamente
        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'inline; filename=invoice.pdf');
        
        // Convertir el PDF a un stream legible
        const pdfStream = new Readable();
        pdfStream._read = () => {}; // Método _read vacío requerido
        
        pdfDoc.on('data', (chunk) => pdfStream.push(chunk));
        pdfDoc.on('end', () => pdfStream.push(null));
        
        pdfDoc.end();
        
        return reply.send(pdfStream);
    }
}