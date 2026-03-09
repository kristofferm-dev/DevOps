import { supabase } from "../config/supabase.js";

export async function registrerBrukere(brukernavn, passord){
    return await supabase
    .from("Brukere")
    .insert([
        {
            Brukernavn: brukernavn,
            Passord: passord
        }
    ])
    .select();
}