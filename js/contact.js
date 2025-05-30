function onDomeLoaded() {
  const headerContainer = document.querySelector('.header-container');
  const footerContainer = document.querySelector('.footer-container');
  fetch('partials/header.html')
    .then((res) => res.text())
    .then((html) => (headerContainer.innerHTML = html));
  fetch('partials/footer.html')
    .then((res) => res.text())
    .then((html) => (footerContainer.innerHTML = html));
}

document.addEventListener('DOMContentLoaded', onDomeLoaded);
