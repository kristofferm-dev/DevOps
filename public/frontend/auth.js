async function autentisering() {
    const brukernavn = document.getElementById("brukernavn").value;

    console.log("Dette er brukernavnet som er skrevet inn: ", brukernavn);

    if(!brukernavn){
        console.log("Mangler brukernavn.");
    }

    try{
        const authReq = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ brukernavn })
        });

        const authRes = await authReq.json();
    }
    catch (error){
        console.log("Try virket ikke.");
    }
}