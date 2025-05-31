// In js/script.js
const headerContainer = document.querySelector('.header-container');
const footerContainer = document.querySelector('.footer-container');
const pageContainer = document.querySelector('.page-container');

async function loadPage(pageName, currentElement) {
  try {
    // Update active link
    document.querySelectorAll('.header-nav-item').forEach((item) => {
      if (currentElement) {
        let parentItem = currentElement.parentNode;
        if (parentItem.classList.contains('header-nav-dropdown')) {
          parentItem = document.querySelector('.header-nav-item.has-dropdown');
        }

        if (item !== parentItem) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      }
    });

    // Load the page content
    const response = await fetch(`partials/${pageName}`);
    const html = await response.text();
    pageContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading page:', error);
  }
}

// Initial load
document.addEventListener('DOMContentLoaded', async () => {
  // Load header
  const headerResponse = await fetch('partials/header.html');
  headerContainer.innerHTML = await headerResponse.text();

  // Load footer
  const footerResponse = await fetch('partials/footer.html');
  footerContainer.innerHTML = await footerResponse.text();

  // Load homepage by default
  await loadPage('homepage.html');

  // Set up event delegation for header clicks
  headerContainer.addEventListener('click', (e) => {
    const pageLink = e.target.closest('[data-page]');
    const dropdownToggle = e.target.closest('.dropdown-toggle');
    const dropdownItem = e.target.closest('.dropdown-item');

    // If clicking on a dropdown item
    if (dropdownItem) {
      e.preventDefault();
      e.stopPropagation();
      const page = dropdownItem.getAttribute('data-page');
      loadPage(page, dropdownItem);
      return;
    }

    // If clicking on the dropdown toggle
    if (dropdownToggle) {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = dropdownToggle.closest('.header-nav-item');
      const isActive = parentItem.classList.contains('active');

      // Toggle current dropdown
      parentItem.classList.toggle('active', !isActive);
      return;
    }

    if (pageLink) {
      e.preventDefault();
      e.stopPropagation();
      const page = pageLink.getAttribute('data-page');
      loadPage(page, pageLink);
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-nav-item.has-dropdown')) {
      document.querySelectorAll('.header-nav-item').forEach((item) => {
        if (item.classList.contains('has-dropdown')) {
          item.classList.remove('active');
        }
      });
    }
  });
});
