import { Router } from 'express';
import {
    activateCard,
    blockCard,
    createCard,
    unblockCard,
} from '../controllers/cardsController.js';
import { apiKeyValidation } from '../middlewares/apiKeyMiddleware.js';
import {
    checkCardIsActive,
    checkCardIsBlocked,
    checkCardIsExpired,
    checkCardIsRegistered,
    checkCardIsUnblocked,
    checkEmployeeHasCard,
    validateCardCVC,
    validateCardPassword,
} from '../middlewares/cardMiddleware.js';
import { checkEmployeeIsRegistered } from '../middlewares/employeeMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import {
    activateCardSchema,
    createCardSchema,
} from '../schemas/cardsSchema.js';

const cardsRouter = Router();

cardsRouter.post(
    '/card',
    validateSchema(createCardSchema),
    apiKeyValidation,
    checkEmployeeIsRegistered,
    checkEmployeeHasCard,
    createCard
);

cardsRouter.post(
    '/activate',
    validateSchema(activateCardSchema),
    checkCardIsRegistered,
    checkCardIsExpired,
    checkCardIsActive,
    validateCardCVC,
    activateCard
);

cardsRouter.post(
    '/block',
    checkCardIsRegistered,
    checkCardIsExpired,
    checkCardIsBlocked,
    validateCardPassword,
    blockCard
);

cardsRouter.post(
    '/unblock',
    checkCardIsRegistered,
    checkCardIsExpired,
    checkCardIsUnblocked,
    validateCardPassword,
    unblockCard
);

export default cardsRouter;
