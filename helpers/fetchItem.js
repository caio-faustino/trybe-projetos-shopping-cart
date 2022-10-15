const fetchItem = async (search) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const reply = await fetch(url);
    const data = await reply.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}