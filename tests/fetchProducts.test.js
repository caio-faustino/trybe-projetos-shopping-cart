require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('its a function', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('call computador', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('endpoint', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  it('provide url', async () => {
    await expect(() => fetchProducts()).rejects.toThrow('You must provide an url');
  })
});