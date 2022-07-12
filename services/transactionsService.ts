import {
    insert as insertPayment,
    PaymentInsertData,
} from '../repositories/paymentRepository.js';
import {
    insert as insertRecharge,
    RechargeInsertData,
} from '../repositories/rechargeRepository.js';

export async function insertRechargeCard(cardId: number, amount: number) {
    const rechargeData: RechargeInsertData = {
        cardId,
        amount,
    };

    await insertRecharge(rechargeData);
}

export async function insertPaymentCard(
    cardId: number,
    amount: number,
    businessId: number
) {
    const paymentData: PaymentInsertData = {
        cardId,
        amount,
        businessId,
    };

    await insertPayment(paymentData);
}
