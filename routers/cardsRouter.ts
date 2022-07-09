import { Router } from 'express';
import { activateCard, createCard } from '../controllers/cardsController.js';
import { apiKeyValidation } from '../middlewares/apiKeyMiddleware.js';
import {
    checkCardIsActive,
    checkCardIsExpired,
    checkCardIsRegistered,
    checkEmployeeHasCard,
    validateCardCVC,
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

export default cardsRouter;
