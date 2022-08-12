import Joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { pickQueryParams } from '../utils/helpers';
import ApiError from '../utils/ApiError';

const validate = (schema: { [x: string]: any }) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pickQueryParams(schema, ['params', 'query', 'body']);
    const object = pickQueryParams(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

export default validate;
