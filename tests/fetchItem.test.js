require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('its a function', () => {
    expect(typeof fetchItem).toBe('function')
  })
  it('call MLB1615760527', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('endpoint', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it('provide url', async () => {
    await expect(() => fetchItem()).rejects.toThrow('You must provide an url');
  })
});