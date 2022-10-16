const ENTER_KEY_CODE = 13;

const nameID = $("#name");
const searchBar = $("#searchBar");
const searchButton = $("#searchButton");

searchBar.on("keypress", (e) => {
    if (e.key == ENTER_KEY_CODE) {
        fetchUser(searchBar.value);
    }
});

searchButton.on("click", () => {
    const value = searchBar.value;
    fetchUser(value);
});


async function fetchUser(name) {
    try {
        const response = await fetch(`/getData/?name=${name}`);
        const json = await response.json();

        const jsonResult = json[0];
        nameID.innerText = `${jsonResult.name}`;

    } catch (err) {
        console.log(err);
    }  
}

fetchUser(searchBar.value);