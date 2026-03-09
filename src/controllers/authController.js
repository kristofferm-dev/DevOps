import { registrerBrukere } from "../models/authModels.js";

// Export av data fra login
export async function registrer(req, res) {
    const {regBrukernavn, regPassord} = req.body;    //Body fra frontend

    console.log("authController brukernavn: ", regBrukernavn);
    console.log("authController passord: ", regPassord)

    const { data: registrerBruker } = await registrerBrukere(regBrukernavn, regPassord);

    console.log("authController test levering av database", registrerBruker);

    if(registrerBruker) {
        console.log(" authController registrer: Bruker registrert.");
        return res.json({ success: true }); 
    }
    else {
        console.log("authController registrer: Bruker ikke registrert.");
        return res.json({ success: false });
    }
}