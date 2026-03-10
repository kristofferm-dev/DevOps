import bcrypt from "bcryptjs";

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