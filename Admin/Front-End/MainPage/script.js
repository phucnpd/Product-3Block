console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const previousOneCardEl = cardsContainerEl.querySelector(".previousOne--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");
	const nextOneCardEl = cardsContainerEl.querySelector(".nextOne--card");
	const nextTwoCardEl = cardsContainerEl.querySelector(".nextTwo--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const previousOneBgImageEl = appBgContainerEl.querySelector(".previousOne--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
	const nextOneBgImageEl = appBgContainerEl.querySelector(".nextOne--image");
	const nextTwoBgImageEl = appBgContainerEl.querySelector(".nextTwo--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		previousOneCardEl.classList.remove("previousOne--card");
		nextCardEl.classList.remove("next--card");
		nextOneCardEl.classList.remove("nextOne--card");
		nextTwoCardEl.classList.remove("nextTwo--card");


		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		previousOneBgImageEl.classList.remove("previousOne--image");
		nextBgImageEl.classList.remove("next--image");
		nextOneBgImageEl.classList.remove("nextOne--image");
		nextTwoBgImageEl.classList.remove("nextTwo--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousOneCardEl.classList.add("nextTwo--card");
			previousCardEl.classList.add("previousOne--card");
			nextCardEl.classList.add("current--card");
			nextOneCardEl.classList.add("next--card");
			nextTwoCardEl.classList.add("nextOne--card");


			currentBgImageEl.classList.add("previous--image");
			previousOneBgImageEl.classList.add("nextTwo--image");
			previousBgImageEl.classList.add("previousOne--image");
			nextBgImageEl.classList.add("current--image");
			nextOneBgImageEl.classList.add("next--image");
			nextTwoBgImageEl.classList.add("nextOne--image");

		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousOneCardEl.classList.add("previous--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("nextOne--card");
			nextOneCardEl.classList.add("nextTwo--card");
			nextTwoCardEl.classList.add("previousOne--card");


			currentBgImageEl.classList.add("next--image");
			previousOneBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("nextOne--image");
			nextOneBgImageEl.classList.add("nextTwo--image");
			nextTwoBgImageEl.classList.add("previousOne--image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let previousOneInfoEl = cardInfosContainerEl.querySelector(".previousOne--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");
	let nextOneInfoEl = cardInfosContainerEl.querySelector(".nextOne--info");
	let nextTwoInfoEl = cardInfosContainerEl.querySelector(".nextTwo--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 0.5,
			pointerEvents: "none",
		})
		.to(
			currentInfoEl.querySelectorAll(".text"),
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "-120px",
				opacity: 0,
			},
			"-="
		)
		.call(() => {
			swapInfosClass(direction);
		})
		.call(() => initCardEvents())
		.fromTo(
			direction === "right"
				? nextInfoEl.querySelectorAll(".text")
				: previousInfoEl.querySelectorAll(".text"),
			{
				opacity: 0,
				translateY: "40px",
			},
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "0px",
				opacity: 1,
			}
		)
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 1,
			pointerEvents: "all",
		});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousOneInfoEl.classList.remove("previousOne--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");
		nextOneInfoEl.classList.remove("nextOne--info");
		nextTwoInfoEl.classList.remove("nextTwo--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			nextOneInfoEl.classList.add("next--info");
			nextTwoInfoEl.classList.add("nextOne--info");
			previousInfoEl.classList.add("previousOne--info");
			previousOneInfoEl.classList.add("nextTwo--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("nextOne--info");
			nextOneInfoEl.classList.add("nextTwo--info");
			nextTwoInfoEl.classList.add("previousOne--info");
			previousInfoEl.classList.add("current--info");
			previousOneInfoEl.classList.add("previous--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
	currentCardEl.addEventListener("click", function() {
		let temp = currentCardEl.querySelector(".card__image")
		let IDPage = temp.getAttribute('id')
		if (IDPage == "BlackList") {
			redirecBlack();
		} else if (IDPage == "WhiteList") {
			redirecWhite();
		} else if (IDPage == "GrayList") {
			redirecGray();
		} else if (IDPage == "Message") {
			redirecMess();
		} else if (IDPage == "Plus18NF") {
			redirecPlus18();
		} else if (IDPage == "Cache18") {
			redirecLocal18();
		}
	})

}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
			delay: 0.5,
			duration: 0.4,
			stagger: 0.1,
			opacity: 1,
			translateY: 0,
		})
		.to(
			[buttons.prev, buttons.next],
			{
				duration: 0.4,
				opacity: 1,
				pointerEvents: "all",
			},
			"-=0.4"
		);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
							duration: 0.8,
							opacity: 0,
							pointerEvents: "none",
						})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();