// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest(".nav-item").classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });

 // ----------------------------
    // AOS
    // ----------------------------
    AOS.init({
      once: true,
      disable: "mobile",
      duration: 700,
    });
})();


// TOC
document.addEventListener("DOMContentLoaded", function () {

  const tocLinksFor = document.querySelectorAll(
    ".table-of-contents a[href^='#']",
  );

  const activeClasses = ["text-primary!"];

  // Collect all headings that match the TOC links
  const headings = Array.from(tocLinksFor)
    .map((link) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      return target ? { id, el: target, link } : null;
    })
    .filter(Boolean);

  // Intersection Observer for highlighting
  const observer = new IntersectionObserver(
    (entries) => {
   
      entries.forEach((entry) => {
        const id = entry.target.id;
        
        const tocLink = document.querySelector(
          `.table-of-contents a[href="#${id}"]`,
        );
       
        if (entry.isIntersecting && tocLink) {
        
          // Remove active classes from all
          tocLinksFor.forEach((link) =>
            link.classList.remove(...activeClasses),
          );
          // Add to the current one
          tocLink.classList.add(...activeClasses);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -80% 0px",
      threshold: 0.1,
    },
  );

  // Observe all matched headings
  
  headings.forEach(({ el }) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    codeBlock.parentElement.classList.add("relative");
    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className = "btn btn-sm btn-outline-primary block cursor-pointer absolute right-2 top-1 z-10";
    codeBlock.parentNode.insertBefore(button, codeBlock);

    button.addEventListener("click", () => {
      const text = codeBlock.innerText;
      navigator.clipboard.writeText(text).then(() => {
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 1500);
      });
    });
  });
});


