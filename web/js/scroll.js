
const header = document.querySelector(".header");

const page_scroll = 170;

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
	
	if (!settings["fix-header"]) {
		header.classList.remove("scrolled");
		burger.style.transform = "";
		header.style.top = "0px";
		burger.style.top = `${-(window.pageYOffset - 15)}px`;
		return;
	}

	if (window.pageYOffset < header.clientHeight + page_scroll && window.pageYOffset > page_scroll - header.clientHeight) {
		burger.style.top = `${window.pageYOffset - page_scroll - burger.clientHeight - 8}px`;
	} else if (window.pageYOffset < header.clientHeight + page_scroll) {
		burger.style.top = `${-window.pageYOffset + 15}px`;
	} else {
		burger.style.top = `15px`;
	}

	if (window.pageYOffset < scroll) {
		header.classList.remove("scrolled");
		burger.style.transform = "";
		header.style.top = `0px`;
		return false;
	} else if (window.pageYOffset > scroll) {
		header.classList.add("scrolled");
		burger.style.transform = "translateY(-5px)";
		if (-(header.clientHeight - (window.pageYOffset - page_scroll)) <= 0) {
			header.style.top = `${-(header.clientHeight - (window.pageYOffset - page_scroll))}px`;		
		} else if (header.style.top.split("px")[0] < 0) {
			header.style.top = `0px`;
		}
		return true;
	}
}

