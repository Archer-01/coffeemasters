const API = {
	URL: '/data/menu.json',
	loadMenu: async () => {
		const response = await fetch(API.URL)
		app.store.menu = await response.json()
	},
	getProductById: async (targetId) => {
		if (app.store.menu == null) {
			await loadData()
		}

		for (const category of app.store.menu) {
			for (const product of category.products) {
				if (product.id == targetId) {
					return product
				}
			}
		}
		return null
	},
}

export default API
