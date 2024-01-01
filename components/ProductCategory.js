class ProductCategory extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const template = document.getElementById('product-category-template')
		const instance = template.content.cloneNode(true)

		const { name, products } = JSON.parse(this.dataset.category)

		const heading = instance.querySelector('h3')
		heading.textContent = name

		const list = instance.querySelector('ul.category')
		for (const product of products) {
			const item = document.createElement('li')
			item.textContent = product.name
			list.appendChild(item)
		}

		this.appendChild(instance)
	}
}

customElements.define('product-category', ProductCategory)
export default ProductCategory
