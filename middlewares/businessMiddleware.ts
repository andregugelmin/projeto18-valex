import { Request, Response, NextFunction } from 'express';
import { findById } from '../repositories/businessRepository.js';

export async function checkBusinessIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const businessId: number = req.body.businessId;

    const business = await findById(businessId);

    if (!business) {
        throw {
            status: 404,
            message: `Business id not registered`,
        };
    }

    res.locals.business = business;

    next();
}

export async function compareBusinessAndCardType(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { business } = res.locals;
    const { card } = res.locals;

    if (business.type != card.type) {
        throw {
            status: 406,
            message: `Business type differs from card's type`,
        };
    }

    next();
}
