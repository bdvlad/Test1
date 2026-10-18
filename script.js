const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Відкрити меню");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.animationDelay = `${index % 4 * 0.08}s`;
  item.style.animationPlayState = "paused";
  observer.observe(item);
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  formStatus.classList.remove("is-error");

  if (!name || !email || !message) {
    formStatus.classList.add("is-error");
    formStatus.textContent = "Заповніть усі поля перед відправленням.";
    return;
  }

  if (!isValidEmail(email)) {
    formStatus.classList.add("is-error");
    formStatus.textContent = "Вкажіть коректну email-адресу.";
    return;
  }

  formStatus.textContent = "Дякую! Повідомлення прийнято.";
  contactForm.reset();
});
