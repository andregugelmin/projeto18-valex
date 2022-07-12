import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { TransactionTypes } from '../repositories/cardRepository.js';
import {
    insertCardInDatabase,
    updateBlockCard,
    updatePasswordCard,
} from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const { employee } = res.locals;
    const cardType: TransactionTypes = req.body.cardType;
    const cardCVC = faker.finance.creditCardCVV();
    await insertCardInDatabase(
        employee.id,
        employee.fullName,
        cardType,
        cardCVC
    );

    res.status(201).send({ cardCVC });
}

export async function activateCard(req: Request, res: Response) {
    const { card } = res.locals;
    const { password } = req.body;

    await updatePasswordCard(card.id, password);

    res.sendStatus(200);
}

export async function blockCard(req: Request, res: Response) {
    const { card } = res.locals;

    await updateBlockCard(card.id, true);

    res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
    const { card } = res.locals;

    await updateBlockCard(card.id, false);

    res.sendStatus(200);
}
