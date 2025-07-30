import { FastifyReply, FastifyRequest } from "fastify";
import PdfPrinter from "pdfmake";
import fs from 'node:fs';


// reports.controller.ts
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
        
        // Enviar el PDF directamente sin crear archivo temporal
        return reply.send(pdfDoc);
    }
}