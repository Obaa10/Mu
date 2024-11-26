export type JwtPayload = {
    userId: number;
    email?: string;
};

export type JwtPayloadWithToken = JwtPayload & {
    token: string;
};