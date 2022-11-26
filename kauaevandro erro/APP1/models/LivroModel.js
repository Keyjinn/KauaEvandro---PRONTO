const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const livroSchema = Schema({
    codigo : Number,
    nome: String,
    preco : Number
})

module.exports = mongoose.model("Livro", livroSchema);