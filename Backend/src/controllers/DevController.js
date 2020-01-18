const axios = require('axios');
const Dev = require('../models/Dev')
const converterStringArray = require('../utils/converterStringArray');
const {findConnections, sendMessage} = require('../websocket')
// store = gravar, index = listar, show = mostrar um, update = update, destroy = deletar

module.exports = {

    async index(req, resp){
        const devs = await Dev.find();
        return resp.json(devs);
    },

    async store(req, resp) {

        const { github, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github}`);

            //se o nome nao existir pega o login
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techArray = converterStringArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            const dev = await Dev.create({
                //shortSintax nome da propriedade é o mesmo do valor, logo nao precisa informar o valor
                name,
                github,
                bio,
                avatarUrl: avatar_url,
                techs: techArray,
                location
            })

            //filtrando em até 10 km de distancia 
            // e que há pelo menos uma tech em comum

            const sendSocketMessageTo = findConnections({latitude, longitude}, techArray);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

            return resp.json(dev);
        }else{
            return resp.json({err: "Usuario já cadastrado"});
        }
        return resp.json({err: "Usuario já cadastrado"});
    }
};