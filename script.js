(function () {
  const modalOverlay = document.getElementById("emailModal");
  const closeEls = document.querySelectorAll("[data-close-email]");
  const openEls = document.querySelectorAll(".js-open-email");

  function setModalOpen(isOpen) {
    if (!modalOverlay) return;
    modalOverlay.classList.toggle("is-open", isOpen);
    modalOverlay.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  openEls.forEach((el) => {
    el.addEventListener("click", () => setModalOpen(true));
  });

  closeEls.forEach((el) => {
    el.addEventListener("click", () => setModalOpen(false));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setModalOpen(false);
  });

  // Simple scroll reveal (replacing Framer/Motion whileInView)
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (revealEls.length) {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          }
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  // Init state
  setModalOpen(false);
})();

