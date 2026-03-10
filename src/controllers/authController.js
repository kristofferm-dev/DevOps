import { registrerBrukere } from "../models/authModels.js";
import { loggInnBruker } from "../models/authModels.js";
import { hashThePassword } from "../services/authService.js";

// Export av data fra login
export async function registrer(req, res) {
    const {regBrukernavn, regPassord} = req.body;    //Body fra frontend

    console.log("authController brukernavn: ", regBrukernavn);
    console.log("authController passord: ", regPassord)

    const hashpassord = await hashThePassword(regPassord);

    console.log("authController hashpassword", hashpassord);

    const { data: registrerBruker } = await registrerBrukere(regBrukernavn, hashpassord);

    console.log("authController test levering av database", registrerBruker);

    if(registrerBruker) {
        console.log("authController registrer: Bruker registrert.");
        return res.json({ success: true }); 
    }
    else {
        console.log("authController registrer: Bruker ikke registrert.");
        return res.json({ success: false });
    }
}

export async function login(req, res) {
    const {logBrukernavn, logPassord} = req.body;    //Body fra frontend

    console.log("authController logBrukernavn: ", logBrukernavn);
    console.log("authController logPassord: ", logPassord)

    const { data: logBrukere } = await loggInnBruker(logBrukernavn, logPassord);

    console.log("authController logBrukere (Info fra database)", logBrukere);

    if(logBrukere) {
        console.log("authController bruker logget inn.");
        return res.json({ success: true }); 
    }
    else {
        console.log("authController bruker ikke logget inn.");
        return res.json({ success: false });
    }
}