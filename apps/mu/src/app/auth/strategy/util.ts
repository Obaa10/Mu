import { Request } from 'express';

export const extractJWTFromCookie = (req: Request, tokenKey: string) => {
    if (
        req.cookies &&
        tokenKey in req.cookies &&
        req.cookies[tokenKey].length > 0
    ) {
        return req.cookies[tokenKey];
    }
    return null;
}