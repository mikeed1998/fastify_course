import { FastifyReply, FastifyRequest } from "fastify";
import PdfPrinter from "pdfmake";
import fs from 'node:fs';
import { createInvoiceReport } from './../reports/invoice.report';


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

        const docDefinition = createInvoiceReport();
        
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
        
        // Configurar headers correctamente
        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'inline');

        pdfDoc.pipe(fs.createWriteStream('reports/invoice.pdf'));
        pdfDoc.pipe(reply.raw);
        pdfDoc.end();
        
        return reply.send(fs.createReadStream('reports/invoice.pdf', 'utf-8'));
    }

    getClientInvoiceByProductId = async (
        request: FastifyRequest, 
        reply: FastifyReply
    ) => {

        const { id } = request.params as { id: string };

        const docDefinition = createInvoiceReport();
        
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
        
        // Configurar headers correctamente
        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'inline');

        pdfDoc.pipe(fs.createWriteStream('reports/invoice.pdf'));
        pdfDoc.pipe(reply.raw);
        pdfDoc.end();
        
        return reply.send(fs.createReadStream('reports/invoice.pdf', 'utf-8'));
    }
}