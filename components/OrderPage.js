class OrderPage extends HTMLElement {
	constructor() {
		super()
		this.root = this.attachShadow({ mode: 'open' })

		const styles = document.createElement('style')
		this.root.appendChild(styles)

		async function loadCSS() {
			const response = await fetch('/components/OrderPage.css')
			const css = await response.text()
			styles.textContent = css
		}
		loadCSS()
	}

	connectedCallback() {
		const template = document.getElementById('empty-order-template')
		const instance = template.content.cloneNode(true)
		this.root.appendChild(instance)
	}
}

customElements.define('order-page', OrderPage)
export default OrderPage
