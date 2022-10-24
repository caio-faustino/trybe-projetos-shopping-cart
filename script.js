// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

/**
* Função responsável por criar o carrinho de compras global */
const globalCartItems = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const productList = async () => {
  const search = await fetchProducts('computador');
  const itemsClass = document.querySelector('.items');
  console.log(itemsClass);
  const { results } = search;
  results.forEach(({ id, title, thumbnail }) => {
    const objectElement = createProductItemElement({
      id,
      title,
      thumbnail,
    });
    itemsClass.appendChild(objectElement);
  });
};

const dealClick = async (event) => {
  const ids = event.target.parentNode.firstChild.innerText;
  const response = await fetchItem(ids);
  const { id, title, price } = response;
  const objectElement = {
    id,
    title,
    price,
  };
  globalCartItems.appendChild(createCartItemElement(objectElement));
  const getInfoList = globalCartItems.innerHTML;
  saveCartItems(getInfoList);
};

const addCart = async () => {
  const getButton = document.querySelectorAll('.item__add');
  getButton.forEach((button) => {
    button.addEventListener('click', dealClick);
  });
};

const listRemove = () => {
  const getList = document.querySelectorAll('.cart__item');
  if (getList.length > 0) {
    getList.forEach((results2) => {
      results2.addEventListener('click', (event) => {
        event.target.remove();
        const getInfoList = globalCartItems.innerHTML;
        saveCartItems(getInfoList);
      });
    });
  } else {
    localStorage.clear();
  }
};

const dealRemoveAll = () => {
  globalCartItems.innerHTML = '';
  localStorage.clear();
};

const removeAll = () => {
  const classeBtn = document.querySelector('.empty-cart');
  classeBtn.addEventListener('click', dealRemoveAll);
};

window.onload = async () => {
  await productList();
  addCart();
  const getStorage = getSavedCartItems();
  const gettingList = document.querySelector('.cart__items');
  gettingList.innerHTML = getStorage;
  listRemove();
  removeAll();
};