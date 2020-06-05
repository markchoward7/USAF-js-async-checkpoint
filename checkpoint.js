const fetch = require("node-fetch")
const fs = require("fs")

// Read the txt file and send the results to the getData function as an array of strings
fs.readFile("pokemon.txt", function(err, data) {
    getData(data.toString().split("\n"))
})
// Takes an array of strings from the file and uses fetch to get the data from the pokeapi
// Then pulls the type data into an object which will be printed to console after a bit of formatting
function getData(pokemonArray) {
    for (const pokemon of pokemonArray) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon).then(function (response) {
            return response.json()
        }).catch(() => {}).then(function (json) {
            // Initialize the data object
            data = {}
            data[pokemon] = ""
            // For each type the pokemon has, add it to the object's value as a string
            for (const type of json.types) {
                if (data[pokemon] !== "") {
                    data[pokemon] += ", "
                }
                data[pokemon] += type.type.name
            }
            // Format the data and print to console
            console.log(pokemon.charAt(0).toUpperCase() + pokemon.slice(1) + ": " + data[pokemon])
        }).catch(() => {})
    }
}