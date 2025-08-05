import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerLayout } from "./layouts/headerLayout.report";
import { footerLayout } from "./layouts/footerLayout.report";
import { invoiceReportStyles } from "./styles";
import { SimpleText } from "./sections/simple-text";


export const createInvoiceReport = (): TDocumentDefinitions => {
    return {
        header: headerLayout,
        content: SimpleText,
        footer: footerLayout,
        styles: invoiceReportStyles
    };
}

