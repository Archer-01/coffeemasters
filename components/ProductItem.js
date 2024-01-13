class ProductItem extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const { id, name, price, image } = JSON.parse(this.dataset.product)

		const template = document.getElementById('product-item-template')
		const instance = template.content.cloneNode(true)

		const link = instance.querySelector('a')

		link.addEventListener('click', (event) => {
			event.preventDefault()

			if (event.target.tagName.toLowerCase() === 'button') {
				app.store.addToCart({ id, name, price })
			} else {
				app.router.go(`/product/${id}`)
			}
		})
		link.href = `/product/${id}`

		instance.querySelector('img').src = `/data/images/${image}`
		instance.querySelector('h4').textContent = name
		instance.querySelector('p.price').textContent = `$${price.toFixed(2)}`

		this.appendChild(instance)
	}
}

customElements.define('product-item', ProductItem)
export default ProductItem
