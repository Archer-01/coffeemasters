import Router from '../services/router.js'
import store from '../services/store.js'

class OrderItem extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const template = document.getElementById('order-item-template')
		const instance = template.content.cloneNode(true)

		const { id, quantity, name, price } = JSON.parse(this.dataset.item)

		instance.querySelector('p.qty').textContent = `${quantity}x`
		instance.querySelector('p.name').textContent = name
		instance.querySelector('p.price').textContent = `$${price.toFixed(2)}`

		instance
			.querySelector('a.delete-button')
			.addEventListener('click', (event) => {
				event.preventDefault()
				store.removeFromCart(id)
			})

		this.appendChild(instance)
	}
}

customElements.define('order-item', OrderItem)
export default OrderItem
