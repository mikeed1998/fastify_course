import { Content } from "pdfmake/interfaces";


export const qrcode: Content = [
    {
        text: 'Visit My WebSite',
        style: 'content',
        alignment: 'center',
        link: 'https://yirsis-serrano.com'
    },
    {
        qr: 'https://yirsis-serrano.com',
        fit: 85,
        alignment: 'center'
    },
]