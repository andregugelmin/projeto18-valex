import Joi from 'joi';

export const balanceCardSchema = Joi.object({
    cardId: Joi.number().required(),
});

export const rechargeCardSchema = Joi.object({
    cardId: Joi.number().required(),
    rechargeAmount: Joi.number().integer().min(1).required(),
});

export const purchaseSchema = Joi.object({
    cardId: Joi.number().required(),
    password: Joi.string().length(4).required(),
    purchaseAmount: Joi.number().integer().min(1).required(),
    businessId: Joi.number().required(),
});
