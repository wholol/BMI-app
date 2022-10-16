const ENTER_KEY_CODE = 13;

const nameID = $("#name");
const searchBar = $("#searchBar");
const searchButton = $("#searchButton");

searchBar.on("keypress", (e) => {
    if (e.which === ENTER_KEY_CODE) {
        e.preventDefault();
        const value = searchBar.val();
        fetchUser(value);
    }
});

searchButton.on("click", () => {
    const value = searchBar.val();
    fetchUser(value);
});

async function fetchUser(name) {
    try {
        const response = await fetch(`/getData/?name=${name}`);
        const json = await response.json();
        console.log(json[0].name);
        nameID.text(`${json[0].name}`);

    } catch (err) {
        console.log(err);
    }  
}