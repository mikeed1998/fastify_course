import { Content } from "pdfmake/interfaces";


export const ColumnsText: Content = [
    {
        text: 'Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus.',
        style: 'content',
        alignment: 'center'
    },
    {
        columns: [
            {
                text: 'Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus.',
                style: 'contentColumn',
                alignment: 'justify',
                width: '50%'
            },
            {
                text: 'Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus.',
                style: 'contentColumn',
                alignment: 'justify',
                width: '50%'
            }
        ],
        columnGap: 10,
        noWrap: false
    },
    {
        text: 'Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Hic unde natus ipsum placeat. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus. Repudiandae animi neque eligendi ad repellendus tenetur consectetur quidem necessitatibus.',
        style: 'contentColumn',
        alignment: 'justify',
        marginTop: 10
    }
];