async function regMaskin() {
    const maskinNavn = document.getElementById("maskinNavn").value;
    const serienummer = document.getElementById("serienummer").value;

    console.log(maskinNavn, serienummer);

    if (!maskinNavn || serienummer) {
        console.log("mangler maskinnavn eller serienummer.");
    }

    try {
        const maskinReq = await fetch("http://localhost:3000/api/maskiner/registrer",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ maskinNavn, serienummer })
            }
        );
    }
    catch (error) {
        console.log("Try feilet.");
    }
    fetchAllComputers();
}

async function fetchAllComputers() {
    try {
        const alleMaskinReq = await fetch("http://localhost:3000/api/maskiner/list");
        const alleMaskinRes = await alleMaskinReq.json();
        console.log(alleMaskinRes);
    }
    catch (error) {
        console.log("Feilet å hente maskiner.");
    }
}

document.addEventListener("DOMContentLoaded", fetchAllComputers);