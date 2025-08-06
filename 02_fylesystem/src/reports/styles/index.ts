import { StyleDictionary } from "pdfmake/interfaces";
import { footerStyle } from "./footer.style";
import { contentStyle } from "./content.style";


export const invoiceReportStyles: StyleDictionary = {
    ... footerStyle,
    ... contentStyle
}