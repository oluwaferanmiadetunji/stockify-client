/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const catchAsync = (
  fn: (
            arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> | any,
            arg1: Response<any, Record<string, any>>,
            arg2: NextFunction,
        ) => any,
) => (req: Request | any, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log('err', err);
        return next(err);
  });
};

export default catchAsync;
