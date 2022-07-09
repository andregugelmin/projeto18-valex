import { Request, Response } from 'express';
import { TransactionTypes } from '../repositories/cardRepository.js';
import {
    insertCardInDatabase,
    updatePasswordCard,
} from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const { employee } = res.locals;
    const cardType: TransactionTypes = req.body.cardType;

    await insertCardInDatabase(employee.id, employee.fullName, cardType);

    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { card } = res.locals;
    const { password } = req.body;

    await updatePasswordCard(card.id, password);

    res.sendStatus(200);
}
