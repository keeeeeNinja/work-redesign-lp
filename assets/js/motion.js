(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) {
    document.body.classList.add("reduced-motion");
  } else {
    document.body.classList.add("has-motion");
  }

  const modal = document.getElementById("flow-modal");
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove("is-closing");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    if (prefersReduced.matches) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      return;
    }

    modal.classList.add("is-closing");

    const onTransitionEnd = (event) => {
      if (!event.target.classList.contains("modal-content")) return;
      modal.classList.remove("is-closing");
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      modal.removeEventListener("transitionend", onTransitionEnd);
    };

    modal.addEventListener("transitionend", onTransitionEnd);
  };

  if (modal && modalTriggers.length) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", openModal);
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.dataset && target.dataset.close === "true") {
        closeModal();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  const heroStack = document.querySelector(".hero-visual-stack");
  const heroCards = heroStack
    ? heroStack.querySelectorAll(".stack-card, .hero-visual-card")
    : [];
  const parallaxState = {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    rafId: null,
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (start, end, easing) => start + (end - start) * easing;

  const updateParallax = () => {
    parallaxState.currentX = lerp(parallaxState.currentX, parallaxState.targetX, 0.08);
    parallaxState.currentY = lerp(parallaxState.currentY, parallaxState.targetY, 0.08);

    heroCards.forEach((card) => {
      const depth = Number(card.dataset.depth || 1);
      const rotateX = parallaxState.currentY * -2.2 * depth;
      const rotateY = parallaxState.currentX * 2.5 * depth;
      const translateX = parallaxState.currentX * 10 * depth;
      const translateY = parallaxState.currentY * 10 * depth;

      card.style.setProperty("--tx", `${translateX}px`);
      card.style.setProperty("--ty", `${translateY}px`);
      card.style.setProperty("--rx", `${rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
    });

    parallaxState.rafId = window.requestAnimationFrame(updateParallax);
  };

  if (!prefersReduced.matches && heroStack && heroCards.length) {
    document.body.classList.add("has-parallax");
    const onMove = (event) => {
      const bounds = heroStack.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
      parallaxState.targetX = clamp(relativeX, -0.5, 0.5);
      parallaxState.targetY = clamp(relativeY, -0.5, 0.5);
    };

    const onLeave = () => {
      parallaxState.targetX = 0;
      parallaxState.targetY = 0;
    };

    heroStack.addEventListener("pointermove", onMove);
    heroStack.addEventListener("pointerleave", onLeave);

    parallaxState.rafId = window.requestAnimationFrame(updateParallax);
  }

  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));

  window.addEventListener("beforeunload", () => {
    if (parallaxState.rafId) {
      window.cancelAnimationFrame(parallaxState.rafId);
    }
  });
})();
