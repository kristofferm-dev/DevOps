import { registrerBrukere } from "../models/authModels.js";
import { loggInnBruker } from "../models/authModels.js";
import { hashThePassword } from "../services/authService.js";
import { checkHashedPassword } from "../services/authService.js";
import { genererToken } from "../services/authService.js";

// Export av data fra login
export async function registrer(req, res) {
    const { regBrukernavn, regPassord } = req.body;    //Body fra frontend

    console.log("authController brukernavn: ", regBrukernavn);
    console.log("authController passord: ", regPassord)

    const hashpassord = await hashThePassword(regPassord);

    console.log("authController hashpassword", hashpassord);

    const { data: registrerBruker } = await registrerBrukere(regBrukernavn, hashpassord);

    console.log("authController test levering av database", registrerBruker);

    if (registrerBruker) {
        console.log("authController registrer: Bruker registrert.");
        return res.json({ success: true });
    }
    else {
        console.log("authController registrer: Bruker ikke registrert.");
        return res.json({ success: false });
    }
}

export async function login(req, res) {
    const { logBrukernavn, logPassord } = req.body;    //Body fra frontend

    console.log("authController logBrukernavn: ", logBrukernavn);
    console.log("authController logPassord: ", logPassord);

    const { data: logBrukere } = await loggInnBruker(logBrukernavn, logPassord);

    console.log("authController logBrukere (Info fra database)", logBrukere);

    const sjekketPassord = await checkHashedPassword(logPassord, logBrukere.Passord);

    console.log("authController sjekk passord", sjekketPassord);

    if (sjekketPassord.success === true) {
        const tokenPayLoad = {
            sub: String(logBrukere.BrukerID),
            username: logBrukere.Brukernavn
        }

        const generertJWT = await genererToken(tokenPayLoad);

        console.log(generertJWT);

        return res.cookie("jwt", generertJWT, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 20
        })
            .json({
                success: true,
                user:
                {
                    id: tokenPayLoad.sub,
                    username: tokenPayLoad.username
                },
            });
    }
    else {
        console.log("authController bruker ikke logget inn.");
        return res.json({ success: false });
    }
}

export async function verifiser(req, res) {
    res.json({
        loggedIn: true,
        user: req.user
    });
}

export function logout(req, res) {
    return res.cookie("jwt", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 0,
        path: "/"
    }
    )
        .json({
            success: true,
            message: "Utlogget"
        });
}