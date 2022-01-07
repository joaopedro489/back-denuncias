const Report = require('../models/Report');
const axios = require('axios');
const NodeCache = require('node-cache');
const Denunciator = require('../models/Denunciator');
require('../config/dotenv')();
const DenunciatorController = require('./DenunciatorController');
const AddressController = require('./AddressController');
const myCache = new NodeCache();

const store = async(req, res) => {
	try {
		let denunciator = await Denunciator.findOne({where: {cpf: req.body.denunciante.cpf}});
		if(!denunciator) 
			denunciator = await DenunciatorController.store(req.body.denunciante);

		const key = req.body.latitude.toString() + req.body.longitude.toString();
		let address = await myCache.get(key);
		if(!address){
			address = await getAddress(req, key);
			if(!address)
				return res.status(500).json({
					error: {
						message: "Endereço não encontrado para essa localidade.",
						code: "02"
					}
				});
		}
		const data = {
			title: req.body.denuncia.titulo,
			description: req.body.denuncia.descricao
		}
		const report = await Report.create(data);
		
		//await Report.update({AddressId: address.id}, {where: {id: report.id}});
		report.setAddress(address);
		report.setDenunciator(denunciator);
		report.reload();

		return res.status(201).json({
			data: {
				latitude: req.latitude,
				longitude: req.longitude,
				denunciante: {
					nome: denunciator.name,
					cpf: denunciator.cpf
				},
				denuncia: {
					titulo: report.title,
					descricao: report.description	
				},
				endereco: {
					logradouro: address.street,
					bairro: address.district,
					cidade:	address.city,
					estado: address.state,
					pais: address.country,
					cep: address.cep		  
				}
			}
		});
	} catch (err) {
		console.log(err + "!");
		return res.status(500).json({
			error: {
				message: "Request inválido.",
				code: "01"
			}
		});
	}
}

const getAddress = async (data, key) => {
	try {
		const apikey = process.env.MAP_KEY;
		const url = axios.create({
			baseURL: 'http://www.mapquestapi.com/geocoding/v1',
		});
		let response = await url.post('reverse?key=' + apikey, {
			location: {
			  latLng: {
				lat: data.body.latitude,
				lng: data.body.longitude
			  }
			},
			options: {
			  thumbMaps: false
			},
			includeNearestIntersection: true,
			includeRoadMetadata: true
		});
		response = response.data;
		if(response.results.length === 0)
			return 0;
		const dataApi = response.results[0].locations;
		const address = AddressController.store(dataApi[0]);
		await myCache.set(key, address);
		return address;
	} catch (err) {
		throw err + '!';
	}
}

module.exports = {
	store
}