import { faker } from '@faker-js/faker';
import { insert, TransactionTypes } from '../repositories/cardRepository.js';
import { encryptCVC } from '../utils/encryptionUtils.js';
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
