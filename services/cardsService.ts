import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import {
    CardUpdateData,
    insert,
    TransactionTypes,
    update,
} from '../repositories/cardRepository.js';
import { findByCardId as findByCardIdRecharge } from '../repositories/rechargeRepository.js';
import { findByCardId as findByCardIdPayment } from '../repositories/paymentRepository.js';
import { encryptCVC, encryptPassword } from '../utils/encryptionUtils.js';
import {
    formattedEmployeeName,
    formattedExpirationDate,
} from '../utils/formatterUtils.js';

export async function insertCardInDatabase(
    employeeId: number,
    employeeName: string,
    cardType: TransactionTypes,
    cardCVC: string
) {
    const cardholderName = formattedEmployeeName(employeeName);
    const expirationDate = formattedExpirationDate();
    const cardNumber: string = faker.finance.creditCardNumber(
        '####-####-####-####'
    );
    const securityCode = encryptCVC(cardCVC);
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

export async function updateBlockCard(cardId: number, isBlocking: boolean) {
    const blockData: CardUpdateData = {
        isBlocked: isBlocking,
    };
    await update(cardId, blockData);
}

export async function getCardRecharges(cardId: number) {
    const cardRecharges = await findByCardIdRecharge(cardId);
    return cardRecharges;
}

export async function getCardPayments(cardId: number) {
    const cardPayments = await findByCardIdPayment(cardId);
    return cardPayments;
}

export async function getCardBalance(cardId: number) {
    const cardRecharges = await getCardRecharges(cardId);
    const cardPayments = await getCardPayments(cardId);
    let rechargeAmount: number = 0;
    let paymentAmount: number = 0;

    if (cardRecharges.length > 0) {
        cardRecharges.forEach((element) => {
            rechargeAmount += element.amount;
        });
    }

    if (cardPayments.length > 0) {
        cardPayments.forEach((element) => {
            paymentAmount += element.amount;
        });
    }

    return rechargeAmount - paymentAmount;
}
