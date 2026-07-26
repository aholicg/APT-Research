const root = document.documentElement;
const body = document.body;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

body.classList.add("is-loading");

const loader = document.querySelector<HTMLElement>("[data-loader]");
const loaderProgress = document.querySelector<HTMLElement>("[data-loader-progress]");
const loaderPercent = document.querySelector<HTMLElement>("[data-loader-percent]");
let progress = 0;
let loaderFinished = false;

function finishLoader() {
  if (loaderFinished) return;
  loaderFinished = true;
  progress = 100;
  if (loaderProgress) loaderProgress.style.width = "100%";
  if (loaderPercent) loaderPercent.textContent = "100";

  window.setTimeout(() => {
    loader?.classList.add("is-complete");
    body.classList.remove("is-loading");
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element, index) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 1.1) {
        window.setTimeout(() => element.classList.add("is-visible"), index * 80);
      }
    });
  }, reduceMotion ? 20 : 260);
}

if (reduceMotion) {
  finishLoader();
} else {
  const loaderTimer = window.setInterval(() => {
    progress = Math.min(98, progress + Math.max(1, Math.round((100 - progress) * 0.1)));
    if (loaderProgress) loaderProgress.style.width = `${progress}%`;
    if (loaderPercent) loaderPercent.textContent = String(progress).padStart(2, "0");
    if (progress >= 98 && document.readyState === "complete") {
      window.clearInterval(loaderTimer);
      finishLoader();
    }
  }, 70);

  window.addEventListener(
    "load",
    () => window.setTimeout(finishLoader, Math.max(0, 1000 - performance.now())),
    { once: true },
  );
  window.setTimeout(finishLoader, 2500);
}

const cursorDot = document.querySelector<HTMLElement>(".cursor-dot");
const cursorRing = document.querySelector<HTMLElement>(".cursor-ring");
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let ringX = pointerX;
let ringY = pointerY;

function animateCursor() {
  ringX += (pointerX - ringX) * 0.17;
  ringY += (pointerY - ringY) * 0.17;
  if (cursorRing) {
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
  }
  requestAnimationFrame(animateCursor);
}

if (!reduceMotion && finePointer) animateCursor();

window.addEventListener(
  "pointermove",
  (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    root.style.setProperty("--pointer-x", `${pointerX}px`);
    root.style.setProperty("--pointer-y", `${pointerY}px`);
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    }

    const coordinateX = document.querySelector<HTMLElement>("[data-coordinate-x]");
    const coordinateY = document.querySelector<HTMLElement>("[data-coordinate-y]");
    if (coordinateX) coordinateX.textContent = `X ${String(Math.round(pointerX)).padStart(3, "0")}`;
    if (coordinateY) coordinateY.textContent = `Y ${String(Math.round(pointerY)).padStart(3, "0")}`;
  },
  { passive: true },
);

document.querySelectorAll<HTMLElement>("a, button, [tabindex]").forEach((element) => {
  element.addEventListener("pointerenter", () => cursorRing?.classList.add("is-active"));
  element.addEventListener("pointerleave", () => cursorRing?.classList.remove("is-active"));
});

const clickLayer = document.querySelector<HTMLElement>(".click-layer");
document.addEventListener("pointerdown", (event) => {
  const pulse = document.createElement("span");
  pulse.className = "click-pulse";
  pulse.style.left = `${event.clientX}px`;
  pulse.style.top = `${event.clientY}px`;
  clickLayer?.appendChild(pulse);
  pulse.addEventListener("animationend", () => pulse.remove(), { once: true });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
);

document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const parallaxElements = [
  ...document.querySelectorAll<HTMLElement>("[data-parallax]"),
];
let scrollTicking = false;

function updateScroll() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const reading = Math.min(1, window.scrollY / max);
  root.style.setProperty("--reading", reading.toFixed(4));

  if (!reduceMotion) {
    parallaxElements.forEach((element) => {
      const speed = Number(element.dataset.parallax ?? 0);
      const parent = element.closest("section") ?? element;
      const bounds = parent.getBoundingClientRect();
      const offset = (bounds.top + bounds.height / 2 - window.innerHeight / 2) * speed;
      element.style.translate = `0 ${offset}px`;
    });
  }
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    requestAnimationFrame(updateScroll);
    scrollTicking = true;
  },
  { passive: true },
);

updateScroll();

if (!reduceMotion && finePointer) {
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const amount = element.classList.contains("home-hero__heading") ? 2 : 3.2;
      element.style.transform = `perspective(1100px) rotateX(${-y * amount}deg) rotateY(${x * amount}deg)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });

  document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}
