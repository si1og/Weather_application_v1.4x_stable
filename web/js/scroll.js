
const header = document.querySelector(".header");

const page_scroll = 175;

window.addEventListener("load", () => {
	page_sctolled(page_scroll);
});

window.addEventListener("scroll", () => {
	page_sctolled(page_scroll);
});

let page_sctolled = (scroll) => {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		burger.style.top = `${burger.scrollHeight - window.pageYOffset - 22}px`; 
		return;
	}

	const settings = JSON.parse(localStorage.getItem("document-settings"));
	
	let burger_top = Math.round(header.clientHeight / 2 - burger.clientHeight / 2 - 1);

	if (!settings["fix-header"]) {
		header.classList.remove("scrolled");
		burger.style.top = `${-(window.pageYOffset + burger_top)}px`;
		return;
	}

	if (window.pageYOffset < header.clientHeight + page_scroll && window.pageYOffset > page_scroll - header.clientHeight) {
		burger.style.top = `${window.pageYOffset - page_scroll - burger.clientHeight - burger_top}px`;
	} else if (window.pageYOffset < header.clientHeight + page_scroll) {
		burger.style.top = `${-window.pageYOffset + burger_top}px`;
	} else {
		burger.style.top = `${burger_top}px`;
	}

	if (window.pageYOffset < scroll) {
		header.classList.remove("scrolled");
		header.style.top = `0px`;
		return false;
	} else if (window.pageYOffset > scroll) {
		header.classList.add("scrolled");
		if (-(header.clientHeight - (window.pageYOffset - page_scroll)) <= 0) {
			header.style.top = `${-(header.clientHeight - (window.pageYOffset - page_scroll))}px`;		
		} else if (header.style.top.split("px")[0] < 0) {
			header.style.top = `0px`;
		}
		return true;
	}
}

