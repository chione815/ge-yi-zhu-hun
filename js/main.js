const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const backTop = document.querySelector(".back-top");
const videos = Array.from(document.querySelectorAll("video"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const scrollHint = document.querySelector(".scroll-hint");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", targetId);
    }

    if (mainNav && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    { rootMargin: "-38% 0px -54% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const sectionTitles = Array.from(document.querySelectorAll(".section-title"));
const brand = document.querySelector(".brand");
const memberNames = Array.from(document.querySelectorAll(".member-name"));

if ("IntersectionObserver" in window) {
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          titleObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
  );
  sectionTitles.forEach((title) => titleObserver.observe(title));
  if (brand) titleObserver.observe(brand);
  memberNames.forEach((name) => titleObserver.observe(name));
} else {
  sectionTitles.forEach((title) => title.classList.add("in-view"));
  if (brand) brand.classList.add("in-view");
  memberNames.forEach((name) => name.classList.add("in-view"));
}

videos.forEach((video) => {
  video.addEventListener("play", () => {
    videos.forEach((otherVideo) => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

const updateBackTop = () => {
  const y = window.scrollY;
  if (backTop) {
    backTop.classList.toggle("visible", y > 520);
  }
  if (scrollHint) {
    scrollHint.classList.toggle("visible", y < 320);
  }
};

window.addEventListener("scroll", updateBackTop, { passive: true });
updateBackTop();

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

scrollHint?.addEventListener("click", () => {
  const firstSection = document.querySelector("#research");
  firstSection?.scrollIntoView({ behavior: "smooth", block: "start" });
});

const animateNumber = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  el.classList.add("counting");
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = target * eased;
    el.textContent = value.toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.classList.remove("counting");
  };
  requestAnimationFrame(tick);
};

const countItems = Array.from(document.querySelectorAll("[data-count]"));
if (countItems.length && "IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  countItems.forEach((item) => countObserver.observe(item));
} else {
  countItems.forEach((item) => {
    item.textContent = item.dataset.count + (item.dataset.suffix || "");
  });
}

const cursor = document.querySelector(".custom-cursor");
const sealContainer = document.querySelector(".seal-container");
const isLikelyDesktop =
  typeof window !== "undefined" &&
  window.matchMedia &&
  !(
    window.matchMedia("(hover: none)").matches &&
    window.matchMedia("(pointer: coarse)").matches
  );
const canCustomCursor = cursor && sealContainer && isLikelyDesktop;

if (canCustomCursor) {
  let cursorX = -100;
  let cursorY = -100;
  let cursorVisible = false;

  const updateCursor = () => {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  };

  document.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      cursor.style.background = "red";
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.margin = "-10px 0 0 -10px";
      cursorVisible = true;
    }
    updateCursor();
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorVisible = false;
  });

  document.addEventListener("mouseenter", () => {
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      cursorVisible = true;
    }
  });

  const interactiveSelector =
    'a, button, .link-row a, .single-link, .scroll-hint, .back-top, .nav-toggle, .patent-gallery a';

  document.addEventListener(
    "mouseover",
    (event) => {
      if (event.target.closest(interactiveSelector)) {
        cursor.classList.add("hovering");
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "mouseout",
    (event) => {
      if (event.target.closest(interactiveSelector)) {
        cursor.classList.remove("hovering");
      }
    },
    { passive: true }
  );

  document.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    cursor.classList.add("clicking");
    const stamp = document.createElement("div");
    stamp.className = "seal-stamp";
    stamp.textContent = "印";
    stamp.style.left = `${event.clientX}px`;
    stamp.style.top = `${event.clientY}px`;
    sealContainer.appendChild(stamp);
    setTimeout(() => {
      stamp.remove();
    }, 1200);
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicking");
  });
}

const heroBanner = document.querySelector(".hero-banner img");
if (heroBanner) {
  let ticking = false;
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * 0.25, 80);
    heroBanner.style.transform = `translateY(${offset}px) scale(${1 + offset / 2000})`;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}
