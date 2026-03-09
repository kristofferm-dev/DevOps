import { supabase } from "../config/supabase.js";

export async function registrerBrukere(regBrukernavn, regPassord){
    return await supabase
    .from("Brukere")
    .insert([
        {
            Brukernavn: regBrukernavn,
            Passord: regPassord
        }
    ])
    .select();
}