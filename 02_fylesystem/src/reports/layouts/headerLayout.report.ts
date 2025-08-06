import { Content } from "pdfmake/interfaces"
import { DateFormatter } from "../../helpers/dataFormatter";


export const headerLayout: Content = [
    {
        columns: [
            {
                text: 'Invoice Report',
                alignment: 'center',
                fontSize: 16,
                bold: true
            },
            {
                text: DateFormatter.formatDate(),
                alignment: 'right',
                marginRight: 20,
                marginTop: 5,
                bold: true
            }
        ],
        columnGap: 10,
        marginTop: 15,
    }
];