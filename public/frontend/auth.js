async function autentisering() {
    const brukernavn = document.getElementById("brukernavn").value;
    const passord = document.getElementById("passord").value;

    console.log("Dette er brukernavnet som er skrevet inn: ", brukernavn);
    console.log("Dett er passordet som er skrevet inn: ", passord);

    if(!brukernavn){
        console.log("Mangler brukernavn.");
    }

    if(!passord){
        console.log("Mangler passord.");
    }

    try{
        const authReq = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ brukernavn, passord })
        });

        const authRes = await authReq.json();
    }
    catch (error){
        console.log("Try virket ikke.");
    }
}