import { Request, Response } from 'express';
import {
    getCardBalance,
    getCardPayments,
    getCardRecharges,
} from '../services/cardsService.js';
import {
    insertPaymentCard,
    insertRechargeCard,
} from '../services/transactionsService.js';

export async function cardBalance(req: Request, res: Response) {
    const { cardId } = req.body;
    const cardBalance = await getCardBalance(cardId);
    const cardRecharges = await getCardRecharges(cardId);
    const cardPayments = await getCardPayments(cardId);

    return res.status(200).send({
        balance: cardBalance,
        transactions: cardPayments,
        recharges: cardRecharges,
    });
}

export async function rechargeCard(req: Request, res: Response) {
    const {
        cardId,
        rechargeAmount,
    }: { cardId: number; rechargeAmount: number } = req.body;
    await insertRechargeCard(cardId, rechargeAmount);

    return res.sendStatus(201);
}

export async function purchase(req: Request, res: Response) {
    const {
        cardId,
        purchaseAmount,
        businessId,
    }: { cardId: number; purchaseAmount: number; businessId: number } =
        req.body;

    await insertPaymentCard(cardId, purchaseAmount, businessId);

    return res.sendStatus(201);
}
