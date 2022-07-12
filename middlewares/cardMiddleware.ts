import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

import {
    findById,
    findByTypeAndEmployeeId,
    TransactionTypes,
} from '../repositories/cardRepository.js';
import { expirationDateObj, getCardBalance } from '../services/cardsService.js';
import { decryptCVC } from '../utils/encryptionUtils.js';

export async function checkEmployeeHasCard(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const employeeId: number = req.body.employeeId;
    const cardType: TransactionTypes = req.body.cardType;

    const card = await findByTypeAndEmployeeId(cardType, employeeId);

    if (card) {
        throw {
            status: 409,
            message: `Employee already has a ${cardType} card`,
        };
    }

    next();
}

export async function checkCardIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const cardId: number = req.body.cardId;

    const card = await findById(cardId);

    if (!card) {
        throw {
            status: 404,
            message: `Card not found`,
        };
    }

    res.locals.card = card;

    next();
}

export function checkCardIsExpired(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { card } = res.locals;
    const expirationDate = expirationDateObj(card.expirationDate);

    if (dayjs().isAfter(expirationDate)) {
        throw {
            status: 412,
            message: `Card is expired`,
        };
    }

    next();
}

export function checkCardIsActive(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { card } = res.locals;

    if (card.password) {
        throw {
            status: 412,
            message: `Card is already active`,
        };
    }

    next();
}

export function checkCardIsInactive(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { card } = res.locals;

    if (!card.password) {
        throw {
            status: 412,
            message: `Card is not active`,
        };
    }

    next();
}

export function checkCardIsBlocked(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { card } = res.locals;

    if (card.isBlocked) {
        throw {
            status: 412,
            message: `Card is blocked`,
        };
    }

    next();
}

export function checkCardIsUnblocked(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { card } = res.locals;

    if (!card.isBlocked) {
        throw {
            status: 412,
            message: `Card is unlocked`,
        };
    }

    next();
}

export function validateCardCVC(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const card: { securityCode: string } = res.locals.card;
    const { securityCode }: { securityCode: string } = req.body;

    if (decryptCVC(card.securityCode) != securityCode) {
        throw {
            status: 401,
            message: `Wrong security code`,
        };
    }

    next();
}

export function validateCardPassword(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const card: { password: string } = res.locals.card;
    const { password }: { password: string } = req.body;

    if (!bcrypt.compareSync(password, card.password)) {
        throw {
            status: 401,
            message: `Wrong password`,
        };
    }

    next();
}

export async function checkCardBalance(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { cardId, purchaseAmount } = req.body;

    const cardBalance: number = await getCardBalance(cardId);

    if (cardBalance - purchaseAmount < 0) {
        throw {
            status: 400,
            message: `Card balance not sufficient for payment`,
        };
    }

    next();
}
