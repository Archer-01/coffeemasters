class MenuPage extends HTMLElement {
	constructor() {
		super()
		this.root = this.attachShadow({ mode: 'open' })

		const styles = document.createElement('style')
		this.root.appendChild(styles)

		async function loadCSS() {
			const response = await fetch('/components/MenuPage.css')
			const text = await response.text()
			styles.textContent = text
		}
		loadCSS()
	}

	connectedCallback() {
		const template = document.getElementById('menu-page-template')
		const instance = template.content.cloneNode(true)
		this.root.appendChild(instance)
	}
}

customElements.define('menu-page', MenuPage)
export default MenuPage
