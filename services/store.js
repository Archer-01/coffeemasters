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

export default store
