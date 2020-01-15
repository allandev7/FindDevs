module.exports = function strigArray(texto) {
    return texto.split(',').map(tech => tech.trim())
}
