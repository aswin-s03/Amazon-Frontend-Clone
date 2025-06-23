import {cart, deleteFromCart, updateProductQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatMoney} from '../utils/money.js';
import {deliveryOptions} from '../../data/delivery-options.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

function getDeliveryDate(days) {
  return dayjs().add(days, 'days').format('dddd, MMMM D');
}

export function renderOrderSummary() {
  let cartInnerHTML = '';

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id)

    const deliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);

    const deliveryDate = getDeliveryDate(deliveryOption.days);

    if (product) {
      cartInnerHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryDate}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src=${product.image}>

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-price">
                ${product.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${product.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${product.id}">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}" data-product-id="${product.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(product.id, cartItem)}
            </div>
          </div>
        </div>
      `;
    }
  });

  function deliveryOptionsHTML(productId, cartItem) {
    let deliveryOptionsInnerHTML = '';
    deliveryOptions.forEach((option) => {
      const deliveryDate = getDeliveryDate(option.days);
      const price = option.priceCents === 0 ? 'FREE' : `$${formatMoney(option.priceCents)} -`;
      deliveryOptionsInnerHTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${productId}"
          data-delivery-option-id="${option.id}">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
            ${option.id === cartItem.deliveryOptionId ? 'checked' : ''}>
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${price} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return deliveryOptionsInnerHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartInnerHTML;

  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.getAttribute('data-product-id');
      deleteFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
    })
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productContainer = updateLink.closest('.product-quantity');
      const quantityLabel = productContainer.querySelector('.js-quantity-label');

      if (updateLink.innerHTML.trim() === 'Update') {
        updateLink.innerHTML = 'Save';
        quantityLabel.innerHTML = `<input type="number" class="quantity-input js-quantity-input" value="${quantityLabel.innerHTML}" min="1" max="10">`;
      } else {
        updateLink.innerHTML = 'Update';
        const newQuantity = productContainer.querySelector('.js-quantity-input').value;
        quantityLabel.innerHTML = newQuantity;
        const productId = updateLink.getAttribute('data-product-id');
        updateProductQuantity(productId, newQuantity);
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();