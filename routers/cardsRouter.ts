import { Router } from 'express';
import { createCard } from '../controllers/cardsController.js';
import { apiKeyValidation } from '../middlewares/apiKeyMiddleware.js';
import { checkEmployeeHasCard } from '../middlewares/cardMiddleware.js';
import { checkEmployeeIsRegistered } from '../middlewares/employeeMiddleware.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { createCardSchema } from '../schemas/cardsSchema.js';

const cardsRouter = Router();

cardsRouter.post(
    '/card',
    validateSchema(createCardSchema),
    apiKeyValidation,
    checkEmployeeIsRegistered,
    checkEmployeeHasCard,
    createCard
);

export default cardsRouter;
