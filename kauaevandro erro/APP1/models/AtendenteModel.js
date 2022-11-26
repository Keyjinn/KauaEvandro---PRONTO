const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const atendenteSchema = Schema({

    nome: String,
    email: String,
    senha : String
})

module.exports = mongoose.model("Atendente", atendenteSchema);