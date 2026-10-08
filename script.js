// keep the footer year current
document.getElementById('year').textContent = new Date().getFullYear()

// highlight the nav link of the section being read
const navLinks = [...document.querySelectorAll('.nav a')]
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')))

const setActive = active => {
	navLinks.forEach((link, i) => {
		if (sections[i] === active) link.setAttribute('aria-current', 'true')
		else link.removeAttribute('aria-current')
	})
}

const updateActive = () => {
	const atBottom =
		window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
	if (atBottom) {
		setActive(sections[sections.length - 1])
		return
	}
	const readingLine = window.innerHeight * 0.4
	const passed = sections.filter(section => section.getBoundingClientRect().top <= readingLine)
	setActive(passed.length ? passed[passed.length - 1] : sections[0])
}

let ticking = false
const onScroll = () => {
	if (ticking) return
	ticking = true
	requestAnimationFrame(() => {
		updateActive()
		ticking = false
	})
}

window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onScroll)
updateActive()
