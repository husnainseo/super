export interface IActivationToken {
    token: string,
    OTP: string
};


export interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: boolean | "lax" | "strict" | "none" | undefined;
    secure?: boolean;
};