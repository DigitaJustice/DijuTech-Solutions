// Logic for navbar
const menu = document.querySelector(".menu-btn-sm"); menu.addEventListener("click", function () { const navbar = document.querySelector("nav"); navbar.classList.toggle("show-nav"); menu.classList.toggle("change-menu") });
// Active scrolling navbar
const sections = document.querySelectorAll("section"); const navLinks = document.querySelectorAll(".nav-link"); window.addEventListener("scroll", () => { let current = ""; sections.forEach(section => { const sectionTop = section.offsetTop - 50; if (pageYOffset >= sectionTop) { current = section.getAttribute("id") } }); navLinks.forEach(link => { link.classList.remove("active"); if (link.getAttribute("href") === `#${current}`) { link.classList.add("active") } }) });
// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener("click", function (e) { e.preventDefault(); document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" }) }) });
// Simple animation for contact cards on scroll
function revealOnScroll() { const cards = document.querySelectorAll(".contact-card"); const windowHeight = window.innerHeight; cards.forEach(card => { const cardTop = card.getBoundingClientRect().top; if (cardTop < windowHeight - 100) { card.style.opacity = "1"; card.style.transform = "translateY(0)" } }) }
// Initialize cards with hidden state
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".contact-card"); cards.forEach(card => { card.style.opacity = "0"; card.style.transform = "translateY(20px)"; card.style.transition = "opacity 0.5s ease, transform 0.5s ease" });
  // Trigger initial check
  revealOnScroll();
  // Add scroll event listener
  window.addEventListener("scroll", revealOnScroll)
});
// Logic for ABOUT US page
const image = document.getElementById("changeMediam"); const video = document.getElementById("changeMediav"); const btn = document.getElementById("play-btn"); btn.addEventListener("click", () => { if (image.style.display !== "none") { image.style.display = "none"; video.style.display = "block"; video.play(); btn.textContent = "Back" } else { video.pause(); video.style.display = "none"; image.style.display = "block"; btn.textContent = "Play Video" } });
// logic for time offer
const hoursSpan = document.getElementsByClassName("hours"); const minutesSpan = document.getElementsByClassName("minutes"); const secondsSpan = document.getElementsByClassName("seconds"); for (let i = 0; i < 2; i++) {
  function setNewExpiry() {
    const newExpiry = (new Date).getTime() + 24 * 60 * 60 * 1e3;// 24 hours from now
    localStorage.setItem("userExpiryTime", newExpiry); return newExpiry
  }
  // Get existing expiry or create a new one
  let expiryTime = parseInt(localStorage.getItem("userExpiryTime"), 10); if (!expiryTime || isNaN(expiryTime)) { expiryTime = setNewExpiry() } function updateCountdown() {
    const now = (new Date).getTime(); let distance = expiryTime - now; if (distance <= 0) {
      expiryTime = setNewExpiry();// Reset for the next 24 hours
      distance = expiryTime - now;// Recalculate distance
    } const hours = Math.floor(distance % (1e3 * 30 * 60 * 24) / (1e3 * 60 * 60)); const minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60)); const seconds = Math.floor(distance % (1e3 * 60) / 1e3); hoursSpan[i].textContent = String(hours).padStart(2, "0"); minutesSpan[i].textContent = String(minutes).padStart(2, "0"); secondsSpan[i].textContent = String(seconds).padStart(2, "0")
  } updateCountdown(); setInterval(updateCountdown, 1e3)
}
// SPECIAL OFFER - carousel time offer card
const slides = document.querySelectorAll(".card"); let currentIndex = 0; function showSlide(index) { const carouselInner = document.querySelector(".carousel-inner"); carouselInner.style.transform = `translateX(-${index * 100}%)` } function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex) } function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; showSlide(currentIndex) } document.querySelector(".next").onclick = nextSlide; document.querySelector(".prev").onclick = prevSlide; setInterval(nextSlide, 4e3);// Autoplay every 3 seconds
// Contact us logic
// Send form on submit
document.getElementById("contact-form").addEventListener("submit", function (event) { event.preventDefault(); emailjs.sendForm("service_ac8jqdj", "template_lig2vmc", this).then(function (response) { alert("Message sent successfully!"); document.getElementById("contact-form").reset() }, function (error) { alert("Failed to send message. Please try again.") }) });
// footer
const yearChange = document.querySelector(".year").innerHTML = (new Date).getFullYear();