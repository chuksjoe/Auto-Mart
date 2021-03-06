import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../api/v1/index';

require('dotenv').config();
require('custom-env').env(true);

chai.use(chaiHttp);
chai.should();
// testing to ensure the server is running
describe('Check Server and Frontend page endpoints', () => {
	it(`should test that server is running on port ${process.env.PORT}`, () => {
		app.port.should.be.eql(parseInt(process.env.PORT, 10));
	});
	it('should connect to the root endpoint', (done) => {
		chai.request(app)
		.get('/api/v1')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the index page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/index')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the sign up page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/signup')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the sign in page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/signin')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the admin page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/admin')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the marketplace page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/marketplace')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the post new ad page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/post-new-ad')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the my posted ads page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/my-posted-ads')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the purchase history page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/purchase-history')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the sales history page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/sales-history')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the users list page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/users-list')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should connect to the api doc page endpoint', (done) => {
		chai.request(app)
		.get('/api/v1/api-doc')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
	it('should redirect to index page if a wrong endpoint is entered', (done) => {
		chai.request(app)
		.get('/random-endpoint')
		.end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
	});
});

// testing the user sign up and sign in endpoints
describe('Testing User endpoints', () => {
	const user1 = {
		first_name: 'ChuksJoe',
		last_name: 'Orjiakor',
		email: 'chuksjos@live.com',
		password: 'testing@123',
		is_admin: true,
		street: '15 Aborishade road, Lawanson',
		city: 'Surulere',
		state: 'Lagos',
		country: 'Nigeria',
		phone: '08131172617',
		zip: '234-001',
	};
	const user2 = {
		first_name: 'Emmanuel',
		last_name: 'Ejiofor',
		email: 'emma@live.com',
		password: 'testing@123',
		is_admin: false,
		street: '3 Cole street, Ikate',
		city: 'Surulere',
		state: 'Lagos',
		country: 'Nigeria',
		phone: '08131172617',
		zip: '234-001',
	};
	const user3 = {
		first_name: 'Tolulope',
		last_name: 'Bakare',
		email: 'tolu@live.com',
		password: 'testing@123',
		is_admin: false,
		street: '',
		city: '',
		state: '',
		country: '',
		phone: '',
		zip: '',
	};
	const user4 = {
		first_name: 'Edet',
		last_name: 'Akpan',
		email: 'edet@live.com',
		password: 'testing@123',
		is_admin: false,
		street: '3 Cole street, Ikate',
		city: 'Surulere',
		state: 'Lagos',
		country: 'Nigeria',
		phone: '08131172617',
		zip: '234-001',
	};

	let adminToken = null;
	let adminId = null;
	let user1Token = null;
	let user2Token = null;
	let user2Id = null;

	it('should create new user-1 account when valid entries are supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signup').send(user1)
		.end((err, res) => {
			const { data } = res.body;
			adminToken = data.token;
			adminId = data.id;
      expect(res).to.have.status(201);
      expect(data).to.include({
        id: adminId,
        token: adminToken,
        email: 'chuksjos@live.com',
        first_name: 'ChuksJoe',
      });
      done();
    });
	});
	it('should create new user-2 account when valid entries are supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signup').send(user2)
		.end((err, res) => {
			user1Token = res.body.data.token;
			expect(res).to.have.status(201);
      done();
    });
	});
	it('should create new user-3 account when valid entries are supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signup').send(user3)
		.end((err, res) => {
			user2Token = res.body.data.token;
			user2Id = res.body.data.id;
      expect(res).to.have.status(201);
      done();
    });
	});
	it('should create new user-4 account when valid entries are supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signup').send(user4)
		.end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
	});
	it('should not create new user account if email supplied is already used by another user', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signup').send(user1)
		.end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal(`A user with this e-mail (${user1.email}) already exists.`);
      done();
    });
	});
	it('should not create new user account if any of the required entries are not supplied', (done) => {
		// required entries: first_name, last_name, email, password, is_admin
		user1.first_name = '';
		user1.email = '';
		chai.request(app)
		.post('/api/v1/auth/signup').send(user1)
		.end((err, res) => {
      expect(res).to.have.status(206);
      expect(res.body.error).to.equal('Some required fields are not properly filled.');
      done();
    });
	});

	// testing the api endpoint for user sign in
	it('should allow a user to sign into their account if they supply valid credentials', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signin').type('form').send({ email: 'edet@live.com', password: 'testing@123' })
		.end((err, res) => {
			const { data } = res.body;
			res.should.have.status(200);
			expect(data).to.include({
        id: data.id,
        token: data.token,
        email: 'edet@live.com',
        first_name: 'Edet',
      });
			done();
		});
	});
	it('should not allow a user to sign in if they supply invalid password', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signin').type('form').send({ email: 'chuksjos@live.com', password: 'wrongpassword' })
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Invalid Username or Password!');
			done();
		});
	});
	it('should not allow a user to sign in if they supply invalid email', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signin').type('form').send({ email: 'chukswho@live.com', password: 'wrongpassword' })
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Invalid Username or Password!');
			done();
		});
	});
	it('should not allow a user to sign in if no email is supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signin').type('form').send({ email: '', password: 'fffvffss' })
		.end((err, res) => {
			res.should.have.status(206);
			expect(res.body.error).to.equal('email field cannot be empty.');
			done();
		});
	});
	it('should not allow a user to sign in if no password is supplied', (done) => {
		chai.request(app)
		.post('/api/v1/auth/signin').type('form').send({ email: 'chukswho@live.com', password: '' })
		.end((err, res) => {
			res.should.have.status(206);
			expect(res.body.error).to.equal('password field cannot be empty.');
			done();
		});
	});

	// testing the endpoint that returns list of all registered users
	it('should return list of all registered users if the user is an admin', (done) => {
		chai.request(app)
		.get('/api/v1/user').set('authorization', `Bearer ${adminToken}`)
		.end((err, res) => {
			const { data } = res.body;
			res.should.have.status(200);
			expect(data.length).to.equal(4);
			data[0].should.have.property('is_admin');
			data[0].should.have.property('first_name');
			data[0].should.have.property('last_name');
			done();
		});
	});
	it('should not return list of all registered users if the user is not an admin', (done) => {
		chai.request(app)
		.get('/api/v1/user').set('authorization', `Bearer ${user1Token}`)
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Unauthorized Access. Reserved only for admins.');
			done();
		});
	});

	// testing the endpoint for getting a user's details
	it('should return details of a registered user', (done) => {
		chai.request(app)
		.get(`/api/v1/user/${user2Id}`).set('authorization', `Bearer ${user1Token}`)
		.end((err, res) => {
			res.should.have.status(200);
			const { data } = res.body;
			data.should.have.property('is_admin');
			data.should.have.property('first_name');
			data.should.have.property('last_name');
		});
		done();
	});
	it('should return an error if the user does not exist', (done) => {
		chai.request(app)
		.get('/api/v1/user/544544')
		.set('authorization', `Bearer ${adminToken}`)
		.end((err, res) => {
			res.should.have.status(404);
			expect(res.body.error).to.equal('User not found in database.');
			done();
		});
	});
	it('should return an error if the user id is not an integer', (done) => {
		chai.request(app)
		.get('/api/v1/user/544544dddc')
		.set('authorization', `Bearer ${adminToken}`)
		.end((err, res) => {
			res.should.have.status(400);
			expect(res.body.error).to.equal('Invalid User ID.');
			done();
		});
	});

	// testing the endpoint that aids password reset
	it('should not reset password if the user does not exists', (done) => {
		chai.request(app)
		.post('/api/v1/user/fake@yahoo.com/reset_password')
		.end((err, res) => {
			res.should.have.status(404);
			expect(res.body.error).to.equal('User with the email fake@yahoo.com does not exist.');
			done();
		});
	});
	it('should not reset password if the supplied password is incorrect', (done) => {
		chai.request(app)
		.post('/api/v1/user/edet@live.com/reset_password').send({ password: 'wrongPass', new_password: 'this1wontenter' })
		.end((err, res) => {
			res.should.have.status(400);
			expect(res.body.error).to.equal('Incorrect password!');
			done();
		});
	});
	it('should not reset password if the supplied password is incorrect', (done) => {
		chai.request(app)
		.post('/api/v1/user/edet@live.com/reset_password').send({ password: 'wrongPass', new_password: '' })
		.end((err, res) => {
			res.should.have.status(206);
			expect(res.body.error).to.equal('new password cannot be empty.');
			done();
		});
	});
	it('should reset password if the supplied password is correct', (done) => {
		chai.request(app)
		.post('/api/v1/user/edet@live.com/reset_password').send({ password: 'testing@123', new_password: 'newPass4edet' })
		.end((err, res) => {
			res.should.have.status(204);
			done();
		});
	});
	it('should still reset password if no body is passed', (done) => {
		chai.request(app)
		.post('/api/v1/user/edet@live.com/reset_password')
		.end((err, res) => {
			res.should.have.status(204);
			done();
		});
	});

	// testing api endpoint for updating user's details
	it('should not allow a user to update another user\'s details', (done) => {
		chai.request(app)
		.patch('/api/v1/user/emma@live.com/update_details')
		.set('Authorization', `Token ${user2Token}`)
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Unauthorized Access. Reserved only for resource owner or an admin.');
			done();
		});
	});
	it('should return an error message if the email is not registered', (done) => {
		chai.request(app)
		.patch('/api/v1/user/toluf@live.com/update_details')
		.set('Authorization', `Token ${adminToken}`)
		.end((err, res) => {
			res.should.have.status(404);
			expect(res.body.error).to.equal('User not found in database.');
			done();
		});
	});
	it('should return an error message if a user tries to upgrade him/herslef to an admin', (done) => {
		chai.request(app)
		.patch('/api/v1/user/emma@live.com/update_details')
		.set('Authorization', `Token ${user1Token}`)
		.send({ is_admin: true })
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Unauthorized Access. Reserved only for admins.');
			done();
		});
	});
	it('should return an error message if the new phone number is invalid', (done) => {
		chai.request(app)
		.patch('/api/v1/user/emma@live.com/update_details')
		.set('Authorization', `Token ${user1Token}`)
		.send({ phone: '089free0000000' })
		.end((err, res) => {
			res.should.have.status(400);
			expect(res.body.error).to.equal('Your phone number is badly formed.');
			done();
		});
	});
	it('should successfully update a user\'s details if no rule is bridged', (done) => {
		chai.request(app)
		.patch('/api/v1/user/emma@live.com/update_details')
		.set('Authorization', `Token ${user1Token}`)
		.send({ phone: '08089000000', street: '4 Zamba street', city: 'Surulere' })
		.end((err, res) => {
			res.should.have.status(200);
			expect(res.body.data.phone).to.equal('08089000000');
			done();
		});
	});

	// testing api endpoint for deleting a user's account
	it('should return an error message if the user is not an admin or account owner', (done) => {
		chai.request(app)
		.delete('/api/v1/user/tolu@live.com')
		.set('Authorization', `Token ${user1Token}`)
		.end((err, res) => {
			res.should.have.status(401);
			expect(res.body.error).to.equal('Unauthorized Access. Reserved only for resource owner or an admin.');
			done();
		});
	});
	it('should return an error message if the user does not exist', (done) => {
		chai.request(app)
		.delete('/api/v1/user/tolufass@live.com')
		.set('Authorization', `Token ${adminToken}`)
		.end((err, res) => {
			res.should.have.status(404);
			expect(res.body.error).to.equal('User not found in database.');
			done();
		});
	});
	it('should successfully delete a user\'s account as an admin', (done) => {
		chai.request(app)
		.delete('/api/v1/user/edet@live.com')
		.set('Authorization', `Token ${adminToken}`)
		.end((err, res) => {
			res.should.have.status(200);
			expect(res.body.data).to.equal('User (Edet Akpan) successfully deleted.');
			done();
		});
	});
});
