const store = {
	menu: null,
	cart: [],

	addToCart(product) {
		const productInCart = this.cart.find((item) => item.id === product.id)

		if (productInCart) {
			++productInCart.quantity
		} else {
			app.store.cart = [...app.store.cart, { ...product, quantity: 1 }]
		}

		window.dispatchEvent(new Event('CartChange'))
	},
	removeFromCart(targetId) {
		app.store.cart = store.cart.filter((item) => item.id !== targetId)
	},
}

const proxiedStore = new Proxy(store, {
	set(target, property, value) {
		target[property] = value

		if (property === 'cart') {
			window.dispatchEvent(new Event('CartChange'))
		}

		return true
	},
})

export default proxiedStore
