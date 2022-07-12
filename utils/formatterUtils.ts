import dayjs from 'dayjs';

export function formattedExpirationDate() {
    const date = dayjs().add(5, 'year').format('MM/YY');

    return date;
}

export function formattedEmployeeName(name: string) {
    const nameArray: string[] = name.split(' ');
    let formatedName: string = '';
    nameArray.forEach((element, index) => {
        if (index === 0 || index === nameArray.length - 1)
            formatedName += element;
        else if (element.length > 2) formatedName += element[0];
        formatedName += ' ';
    });

    return formatedName.trim();
}
