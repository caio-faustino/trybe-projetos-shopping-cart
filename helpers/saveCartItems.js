const saveCartItems = (event) => 
  localStorage.setItem('cartItems', event);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}