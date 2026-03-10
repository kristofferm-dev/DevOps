import { supabase } from "../config/supabase.js";

export async function registrerBrukere(regBrukernavn, hashpassord){
    return await supabase
    .from("Brukere")
    .insert([
        {
            Brukernavn: regBrukernavn,
            Passord: hashpassord
        }
    ])
    .select();
}

export async function loggInnBruker(logBrukernavn, logPassord){
    return await supabase
    .from("Brukere")
    .select("BrukerID, Brukernavn, Passord")
    .eq("Brukernavn", logBrukernavn)
    .single();
}