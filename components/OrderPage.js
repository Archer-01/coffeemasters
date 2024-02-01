class OrderPage extends HTMLElement {
	#user = {
		name: '',
		phone: '',
		email: '',
	}

	constructor() {
		super()
		this.root = this.attachShadow({ mode: 'open' })

		const styles = document.createElement('style')
		this.root.appendChild(styles)

		const section = document.createElement('section')
		this.root.appendChild(section)

		async function loadCSS() {
			const response = await fetch('/components/OrderPage.css')
			const css = await response.text()
			styles.textContent = css
		}
		loadCSS()
	}

	connectedCallback() {
		window.addEventListener('CartChange', () => {
			this.render()
		})
		this.render()
	}

	render() {
		const section = this.root.querySelector('section')
		section.innerHTML = ''

		if (app.store.cart.length === 0) {
			const template = document.getElementById('empty-order-template')
			const instance = template.content.cloneNode(true)
			section.appendChild(instance)
		} else {
			const template = document.getElementById('order-page-template')
			const instance = template.content.cloneNode(true)
			section.appendChild(instance)

			const itemsList = this.root.querySelector('ul')
			app.store.cart.forEach((item) => {
				const orderItem = document.createElement('order-item')
				orderItem.dataset.item = JSON.stringify(item)
				itemsList.appendChild(orderItem)
			})

			// Create total list item
			{
				const total = app.store.cart.reduce(
					(acc, item) => acc + item.quantity * item.price,
					0,
				)

				const template = document.getElementById('total-order-template')
				const instance = template.content.cloneNode(true)
				instance.querySelector('p.price-total').textContent =
					`$${total.toFixed(2)}`

				itemsList.appendChild(instance)
			}

			// Create form
			{
				const template = document.getElementById('order-form-template')
				const instance = template.content.cloneNode(true)
				section.appendChild(instance)

				const form = section.querySelector('form')

				form.addEventListener('submit', (event) => {
					event.preventDefault()
					window.alert(`Thanks for your order ${this.#user.name}`)
					this.#user.name = ''
					this.#user.phone = ''
					this.#user.email = ''
					// TODO: Send order to server
				})

				this.#user = new Proxy(this.#user, {
					set(target, property, value) {
						target[property] = value
						form.elements[property].value = value
						return true
					},
				})

				Array.from(form.elements).forEach((element) => {
					element.addEventListener('change', (event) => {
						this.#user[event.target.name] = event.target.value
					})
				})
			}
		}
	}
}

customElements.define('order-page', OrderPage)
export default OrderPage
