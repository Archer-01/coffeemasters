const Router = {
	init() {
		document.querySelectorAll('a.navlink').forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault()

				const path = link.getAttribute('href')
				const addToHistory = window.location.pathname !== path
				Router.go(path, addToHistory)
			})
		})

		window.addEventListener('popstate', (event) => {
			if (!event.state) {
				window.history.back()
			}
			Router.go(event.state.path, false)
		})

		Router.go(window.location.pathname)
	},
	go(path, addToHistory = true) {
		if (addToHistory) {
			window.history.pushState({ path }, null, path)
		}

		let content = null

		switch (path) {
			case '/':
				content = document.createElement('menu-page')
				break
			case '/order':
				content = document.createElement('h1')
				content.textContent = 'Order Page'
				break
			default:
				if (path.startsWith('/product/')) {
					content = document.createElement('h1')
					const productId = path.split('/')[2]
					content.textContent = `Product no.${productId}`
				}
				break
		}

		if (content !== null) {
			const main = document.querySelector('main')
			main.innerHTML = null
			main.appendChild(content)
		}
	},
}

export default Router
