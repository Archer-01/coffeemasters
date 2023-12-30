import API from './services/api.js'
import store from './services/store.js'

window.app = {
	store,
	router: null,
}

window.addEventListener('DOMContentLoaded', async () => {
	app.store.menu = await API.loadMenu()
	console.log('Menu loaded', app.store.menu)
})
