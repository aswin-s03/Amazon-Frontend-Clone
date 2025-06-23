import {cart, getCartQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/delivery-options.js';
import { formatMoney } from '../utils/money.js';

export function renderPaymentSummary() {
	let costOfItems = 0;
	let ShippingCost = 0;


	cart.forEach((cartItem) => {
		const product = getProduct(cartItem.id);
		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

		costOfItems += product.priceCents * cartItem.quantity;
		ShippingCost += deliveryOption.priceCents;
	});

	const totalBeforeTax = costOfItems + ShippingCost;
	const estimatedTax = totalBeforeTax * 0.1;
	const total = totalBeforeTax + estimatedTax;

	const paymentSummaryHTML = `
		<div class="payment-summary-title">
			Order Summary
		</div>

		<div class="payment-summary-row">
			<div>Items (${getCartQuantity()}):</div>
			<div class="payment-summary-money">$${formatMoney(costOfItems)}</div>
		</div>

		<div class="payment-summary-row">
			<div>Shipping &amp; handling:</div>
			<div class="payment-summary-money">$${formatMoney(ShippingCost)}</div>
		</div>

		<div class="payment-summary-row subtotal-row">
			<div>Total before tax:</div>
			<div class="payment-summary-money">$${formatMoney(totalBeforeTax)}</div>
		</div>

		<div class="payment-summary-row">
			<div>Estimated tax (10%):</div>
			<div class="payment-summary-money">$${formatMoney(estimatedTax)}</div>
		</div>

		<div class="payment-summary-row total-row">
			<div>Order total:</div>
			<div class="payment-summary-money">$${formatMoney(total)}</div>
		</div>

		<button class="place-order-button button-primary">
			Place your order
		</button>
	`;
	document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}