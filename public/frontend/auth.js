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
    }
    catch (error){
        console.log("Try virket ikke.");
    }
}