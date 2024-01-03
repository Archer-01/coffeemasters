import API from '../services/api.js'

class DetailsPage extends HTMLElement {
	constructor() {
		super()
		this.root = this.attachShadow({ mode: 'open' })

		const styles = document.createElement('style')
		this.root.appendChild(styles)

		async function loadCSS() {
			const response = await fetch('/components/DetailsPage.css')
			const css = await response.text()
			styles.textContent = css
		}
		loadCSS()
	}

	async connectedCallback() {
		const template = document.getElementById('details-page-template')
		const instance = template.content.cloneNode(true)
		const product = await API.getProductById(this.dataset.id)

		instance.querySelector('h2').textContent = product.name
		instance.querySelector('img').src = `/data/images/${product.image}`
		instance.querySelector('p.description').textContent =
			product.description
		instance.querySelector('p.price').textContent =
			`$${product.price.toFixed(2)}`

		this.root.appendChild(instance)
	}
}

customElements.define('details-page', DetailsPage)
export default DetailsPage
