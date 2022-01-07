const request = require('supertest');
const app = require('../src/index');
const Denunciator = require('../src/models/Denunciator');
const Report = require('../src/models/Report');
const Address = require('../src/models/Address');

describe("Make Report", () => {
	it("should create a report", async () => {
		const report = {
			latitude: -9.56921,
			longitude: -36.76422,
			denunciante: {
			  	nome: "José de Oliveira",
				cpf: "95761638037"
			},
			denuncia: {
			  titulo: "Esgoto a céu aberto",
			  descricao: "Existe um esgoto a céu aberto nesta localidade."
			}
		};
		const response = await request(app).post('/v1/denuncias').send(report);
		expect(response.status).toBe(201);
		await Denunciator.destroy({where:{cpf:response.body.data.denunciante.cpf}});
		const addressDB = await Address.findOne({
			where: { cep: response.body.data.endereco.cep },
			order: [ [ 'createdAt', 'DESC' ]],
		});
		await addressDB.destroy();
		const reportDB = await Report.findOne({
			titulo: { title: response.body.data.denuncia.titulo },
			order: [ [ 'createdAt', 'DESC' ]],
		});
		await reportDB.destroy();
	});
});

