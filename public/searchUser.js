const ENTER_KEY_CODE = 13;

const nameID = $("#name");
const genderID = $("#gender");
const weightID = $("#weight");
const heightID = $("#height");
const BMIValueID = $("#BMIValue");
const BMIStatusID = $("#BMIStatus");
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

        if (result) {
            nameID.text(`${result.name}`);
            genderID.text(`${result.gender}`);
            weightID.text(`${result.weight}`);
            heightID.text(`${result.height}`);
            BMIValueID.text(`${result.BMIValue}`);
            BMIStatusID.text(`${result.BMIStatus}`);
        } else {
            nameID.text("no record of this user was found.");
        } 
    } catch (err) {
        console.log(err);
    }  
}