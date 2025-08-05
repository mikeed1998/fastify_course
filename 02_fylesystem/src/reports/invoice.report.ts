import { TDocumentDefinitions, TDocumentInformation } from "pdfmake/interfaces";
import { headerLayout } from "./layouts/headerLayout.report";
import { footerLayout } from "./layouts/footerLayout.report";
import { invoiceReportStyles } from "./styles";
import { SimpleText } from "./sections/simple-text";
import { ColumnsText } from "./sections/columns-text";
import { tables } from "./sections/tables";
import { qrcode } from "./sections/qrcode";


interface Metadata extends TDocumentInformation {
    premiun: boolean
};

export const createInvoiceReport = (): TDocumentDefinitions => {
    return {
        info: {
            title: 'Invoice Report',
            subject: 'Invoice Report',
            author: 'Yirsis Serrano',
            producer: 'Yirsis Serrano',
            creator: 'Yirsis Serrano',
            keywords: 'Invoice, report, pdf',
            modDate: new Date(),
            premiun: false,
        } as Metadata,
        watermark: {
            text: 'Invoice App',
            color: '#333',
            opacity: 0.1,
            angle: 0,
            bold: true,
            italics: true
        },
        language: 'es-MX',
        compress: true,
        header: headerLayout,
        content: qrcode,
        footer: footerLayout,
        styles: invoiceReportStyles
    };
}

