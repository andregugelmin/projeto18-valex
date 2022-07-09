import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import {
    CardUpdateData,
    insert,
    TransactionTypes,
    update,
} from '../repositories/cardRepository.js';
import { encryptCVC, encryptPassword } from '../utils/encryptionUtils.js';
import {
    formattedEmployeeName,
    formattedExpirationDate,
} from '../utils/formatterUtils.js';

export async function insertCardInDatabase(
    employeeId: number,
    employeeName: string,
    cardType: TransactionTypes
) {
    const cardholderName = formattedEmployeeName(employeeName);
    const expirationDate = formattedExpirationDate();
    const cardNumber: string = faker.finance.creditCardNumber(
        '####-####-####-####'
    );
    const securityCode = encryptCVC(faker.finance.creditCardCVV());
    const type = cardType;

    await insert({
        employeeId,
        number: cardNumber,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type,
    });
}

export function expirationDateObj(date: string) {
    const cardDateArray = date.split('/');
    const expirationDate = dayjs(`${cardDateArray[0]}/31/${cardDateArray[1]}`);
    return expirationDate;
}

export async function updatePasswordCard(cardId: number, password: string) {
    const encryptedPasswordData: CardUpdateData = {
        password: encryptPassword(password),
    };
    await update(cardId, encryptedPasswordData);
}
