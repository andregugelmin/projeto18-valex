import { Request, Response, NextFunction } from 'express';
import {
    findByTypeAndEmployeeId,
    TransactionTypes,
} from '../repositories/cardRepository.js';

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
