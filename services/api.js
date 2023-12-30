const API = {
	URL: '/data/menu.json',
	loadMenu: async () => {
		const response = await fetch(API.URL)
		const menu = await response.json()
		return menu
	},
}

export default API
