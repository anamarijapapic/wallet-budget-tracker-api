const { expect } = require('chai');
const categoryRepo = require('../repo/category');

describe('Category Routes', () => {
  let createdCategory;

  before(async () => {
    createdCategory = await categoryRepo.create({
      name: 'My Category (Test)',
    });
  });

  describe('GET /categories', () => {
    it('should fetch all categories', async () => {
      const response = await global.api.get('/categories').expect(200);

      console.log(response.body);

      expect(response.body).to.be.an('array');
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        'id',
        'name',
        'created_at',
        'updated_at',
      ]);
    });
  });

  describe('GET /categories/:categoryId', () => {
    it('should fetch the category by id', async () => {
      const response = await global.api
        .get(`/categories/${createdCategory.id}`)
        .expect(200);

      expect(response.body).to.deep.equal(createdCategory);
    });
  });

  describe('POST /categories', () => {
    it('should require authorization', async () => {
      await global.api.post(`/categories`).expect(401);
    });

    it('should create a new category', async () => {
      const name = 'My New Category (Test)';

      const response = await global.api
        .post('/categories')
        .auth(global.authToken, { type: 'bearer' })
        .send({ name })
        .expect(200);

      console.log(response.body);

      expect(response.body.name).to.deep.equal(name);
    });
  });

  describe('DELETE /categories/:categoryId', () => {
    it('should require authorization', async () => {
      await global.api.delete(`/categories/${createdCategory.id}`).expect(401);
    });

    it('should delete the category by id', async () => {
      const response = await global.api
        .delete(`/categories/${createdCategory.id}`)
        .auth(global.authToken, { type: 'bearer' })
        .expect(200);

      expect(response.body > 0).to.be.true;

      await global.api.get(`/categories/${createdCategory.id}`).expect(404);
    });
  });
});
