const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json");
const expect = chai.expect
chai.use(chaiHttp, chaiJson);
/*
const dbtest = app.dbfortest;
const closeconn = app.closeconn;
*/

describe("Backend Server Tests", function() {

	/*
	before(function(done) {
		//dbtest; 
		//console.log("Connected!");
		done();
   	}); 
	*/

	describe('Testing Everything after database has connected', function()
	{
		it("root route should not be declared", function(done) {
			chai
			.request(app)
			.get("/")
			.end((err, res) => {
			expect(res).to.have.status(404);
			done();
			});
		});

		it("/api by itself should not be accessible", function(done) {
			chai
			.request(app)
			.post("/api")
			.end((err, res) => {
			expect(res).to.have.status(404);
			done();
			});
		});

		it("valid email and password", function(done) {
			chai
			.request(app)
			.post("/api/users/login")
			//INSERT A REAL EMAIL ADDRESS AND PASSWORD FROM YOUR DATABASE HERE!
			.send({ email: 'validemail', password: 'validpass' })
			.end((err, res) => {
			expect(res).to.have.status(200);
			done();
			});
		});	
	
		it("valid email and invalid password", function(done) {
			chai
			.request(app)
			.post("/api/users/login")
			.send({ email: 'validuseremailhere', password: 'invalidpass' })
			.end((err, res) => {
			expect(res).to.have.status(401);
			done();
			});
		});

		it("user has a valid jwt, changes name using user settings, leaves password blank", function(done) {
			chai
			.request(app)
			.post("/api/users/update-user")
			//USE A VALID JWT HERE! THIS CAN BE GATHERED FROM 
			//THE AUTHORIZATION Request Header so long as the token is valid
			//(replace with text, 'Bear jwt')
			.set('Authorization', 'Bear jwt')
			.send({ name: 'fullname', confirmPassword: '' })
			.end((err, res) => {
			expect(res).to.have.status(201);
			done();
			});
		});

		it("user has a valid jwt, changes name using user settings, changes password", function(done) {
			chai
			.request(app)
			.post("/api/users/update-user")
			//USE A VALID JWT HERE! THIS CAN BE GATHERED FROM 
			//EITHER LOCAL STORAGE IN CHROME/FIREFOX, OR CAN BE 
			//GATHERED THROUGH A CURL REQUEST
			//(replace with text, 'Bear jwt')
			.set('Authorization', 'Bear jwt')
			.send({ name: 'fullname', confirmPassword: 'newpass' })
			.end((err, res) => {
			expect(res).to.have.status(201);
			done();
			});
		});

		it("user has an invalid or malformed jwt, tries to change name and password", function(done) {
			chai
			.request(app)
			.post("/api/users/update-user")
			//USE A VALID JWT HERE! THIS CAN BE GATHERED FROM 
			//EITHER LOCAL STORAGE IN CHROME/FIREFOX, OR CAN BE 
			//GATHERED THROUGH A CURL REQUEST
			//(replace with text, 'Bear jwt')
			.set('Authorization', 'Bear jwt')
			.send({ name: 'fullname', confirmPassword: 'newpass' })
			.end((err, res) => {
			expect(res).to.have.status(401);
			done();
			});
		});

		it("user attempts to get group member info directly, but doesn't have a jwt, so access will be denied", function(done) {
			chai
			.request(app)
			.get("/api/member/all-scouts")
			.end((err, res) => {
			expect(res).to.have.status(401);
			done();
			});
		});
	});

	//After all tests are finished, state that we are completely done 
	after(function(done){
		//closeconn;
		done();
	});
});
