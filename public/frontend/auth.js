async function registrer() {
    const regBrukernavn = document.getElementById("regBrukernavn").value;
    const regPassord = document.getElementById("regPassord").value;

    const regStatusMsg = document.getElementById("regStatus");

    console.log("Dette er brukernavnet som er skrevet inn: ", regBrukernavn);
    console.log("Dett er passordet som er skrevet inn: ", regPassord);

    if(!regBrukernavn){
        console.log("Mangler brukernavn.");
    }

    if(!regPassord){
        console.log("Mangler passord.");
    }

    try{
        const authReq = await fetch("http://localhost:3000/api/auth/registrer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ regBrukernavn, regPassord })
        });

        const authRes = await authReq.json();
        console.log(authRes);

        if(authRes.success === true) {
            regStatusMsg.textContent = "Bruker registrert";
            regStatusMsg.style.color = "green";
        }
        else {
            regStatusMsg.textContent = "Bruker ikke registrert";
            regStatusMsg.style.color = "red";
        }
    }
    catch (error){
        console.log("Try virket ikke.");
    }
}

async function authenticate() {
    const logBrukernavn = document.getElementById("brukernavn").value;
    const logPassord = document.getElementById("passord").value;

    const logStatusMsg = document.getElementById("status");

    console.log("Dette er brukernavnet som er skrevet inn: ", logBrukernavn);
    console.log("Dett er passordet som er skrevet inn: ", logPassord);

    if(!logBrukernavn){
        console.log("Mangler brukernavn.");
    }

    if(!logPassord){
        console.log("Mangler passord.");
    }

    try{
        const logReq = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ logBrukernavn, logPassord })
        });

        const logRes = await logReq.json();
        console.log(logRes);

        if(logRes.success === true) {
            logStatusMsg.textContent = "Bruker funnet!";
            logStatusMsg.style.color = "green";
        }
        else {
            logStatusMsg.textContent = "Bruker ikke funnet.";
            logStatusMsg.style.color = "red";
        }
    }
    catch (error){
        console.log("Try virket ikke.");
    }
}