const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const backTop = document.querySelector(".back-top");
const videos = Array.from(document.querySelectorAll("video"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const scrollHint = document.querySelector(".scroll-hint");

// 兜底：无论 JS 后续是否出错，2 秒后强制显示所有 reveal 元素
setTimeout(function () {
  var all = document.querySelectorAll(".reveal");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.add("in-view");
  }
}, 2000);

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

// 模块 1：水墨晕染开屏进度控制
(function initInkLoader() {
  const numEl = document.getElementById("ink-progress-number");
  if (!numEl) return;

  let progress = 1;
  const startTime = performance.now();
  const duration = 1400;
  const startDelay = 800;

  function tick(now) {
    const elapsed = now - startTime - startDelay;
    if (elapsed < 0) {
      requestAnimationFrame(tick);
      return;
    }
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 2.4);
    progress = Math.round(1 + eased * 99);
    numEl.textContent = progress + "%";
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      numEl.textContent = "100%";
    }
  }
  requestAnimationFrame(tick);

  // 2.7 秒后结束 loader
  setTimeout(function () {
    document.body.classList.remove("is-loading");
  }, 2700);

  // 兜底：4 秒后无论如何都强制结束
  setTimeout(function () {
    document.body.classList.remove("is-loading");
  }, 4000);
})();

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
