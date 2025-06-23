export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  if(!cart) {
    cart = [{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }, {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: '1'
    }];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let productExists = false;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.quantity += 1;
      productExists = true;
      return;
    }
  });
  if (!productExists) {
    cart.push({
    id: productId,
    quantity: 1,
    deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function deleteFromCart(productId) {
  cart.forEach((cartItem, index) => {
    if(cartItem.id === productId) {
      cart.splice(index, 1);
      return;
    }
  });
  saveToStorage();
}

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += parseInt(cartItem.quantity);
  });
  return cartQuantity;
}

export function updateProductQuantity(productId, quantity) {
  cart.forEach((cartItem) => {
    if(cartItem.id === productId) {
      cartItem.quantity = quantity;
      return;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const product = cart.find((cartItem) => cartItem.id === productId);
  product.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}