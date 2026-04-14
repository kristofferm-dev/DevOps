import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashThePassword(regPassord) {

    console.log("authService passord i klartekst: ", regPassord);

    try {
        return await bcrypt.hash(regPassord, 10)
    }
    catch(error) {
        console.log("Hashing feilet.");
    }
}

export async function checkHashedPassword(logPassord, hashedPassword) {

    console.log("authService login passord: ", logPassord);

    const validerPassord = await bcrypt.compare(logPassord, hashedPassword);

    if (!validerPassord) {
        return { success: false };
    }
    else {
        return { success: true };
    }
}

export async function genererToken(tokenPayLoad) {
    try {
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES;

        const token = jwt.sign(tokenPayLoad, secret, {expiresIn, audience: "app", issuer: "DEVOPS"});

        return token;
    }
    catch (err) {
        throw err;
    }
}