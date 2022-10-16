const nameID = document.querySelector("#name");

async function fetchUser(name) {
    const response = await fetch(`/getData/?name=jeremy`);
    console.log(response.json());
    nameID.innerText = `${name}`;
}

fetchUser("jerry");