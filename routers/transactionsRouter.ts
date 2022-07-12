import { Router } from 'express';
import {
    cardBalance,
    purchase,
    rechargeCard,
} from '../controllers/transactionsController.js';
import { apiKeyValidation } from '../middlewares/apiKeyMiddleware.js';
import {
    checkBusinessIsRegistered,
    compareBusinessAndCardType,
} from '../middlewares/businessMiddleware.js';
import {
    checkCardBalance,
    checkCardIsBlocked,
    checkCardIsExpired,
    checkCardIsInactive,
    checkCardIsRegistered,
    validateCardPassword,
} from '../middlewares/cardMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import {
    balanceCardSchema,
    purchaseSchema,
    rechargeCardSchema,
} from '../schemas/transactionsSchema.js';

const transactionsRouter = Router();

transactionsRouter.get(
    '/balance',
    validateSchema(balanceCardSchema),
    checkCardIsRegistered,
    cardBalance
);

transactionsRouter.post(
    '/recharge',
    validateSchema(rechargeCardSchema),
    apiKeyValidation,
    checkCardIsRegistered,
    checkCardIsInactive,
    checkCardIsExpired,
    rechargeCard
);

transactionsRouter.post(
    '/purchase',
    validateSchema(purchaseSchema),
    checkCardIsRegistered,
    checkCardIsInactive,
    checkCardIsExpired,
    checkCardIsBlocked,
    validateCardPassword,
    checkBusinessIsRegistered,
    compareBusinessAndCardType,
    checkCardBalance,
    purchase
);

export default transactionsRouter;
