class OrderPage extends HTMLElement {
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
		}
	}
}

customElements.define('order-page', OrderPage)
export default OrderPage
