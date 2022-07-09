import { Request, Response, NextFunction } from 'express';
import { findByApiKey } from '../repositories/companyRepository.js';

export async function apiKeyValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const API_KEY: string = req.header('x-api-key');

    if (!API_KEY) {
        throw { status: 401, message: 'Undefined API Key' };
    }

    const company = await findByApiKey(API_KEY);

    if (!company) {
        throw { status: 401, message: 'Wrong API Key' };
    }

    res.locals.company = company;
    next();
}
