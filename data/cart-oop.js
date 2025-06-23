function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if(!this.cartItems) {
        this.cartItems = [{
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: '1'
        }];
      }
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart(productId) {
      let productExists = false;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.id === productId) {
          cartItem.quantity += 1;
          productExists = true;
          return;
        }
      });
      if (!productExists) {
        this.cartItems.push({
        id: productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
  
    deleteFromCart(productId) {
      this.cartItems.forEach((cartItem, index) => {
        if(cartItem.id === productId) {
          this.cartItems.splice(index, 1);
          return;
        }
      });
      this.saveToStorage();
    },
  
    getCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += parseInt(cartItem.quantity);
      });
      return cartQuantity;
    },
  
    updateProductQuantity(productId, quantity) {
      this.cartItems.forEach((cartItem) => {
        if(cartItem.id === productId) {
          cartItem.quantity = quantity;
          return;
        }
      });
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId) {
      const product = this.cartItems.find((cartItem) => cartItem.id === productId);
      product.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  };
  return cart;
}

const cart = Cart();
const businessCart = Cart();

cart.loadFromStorage('cart-oop');

businessCart.loadFromStorage('cart-business');

businessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

console.log(cart);
console.log(businessCart);