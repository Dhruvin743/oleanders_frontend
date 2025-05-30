// In js/script.js
const headerContainer = document.querySelector('.header-container');
const footerContainer = document.querySelector('.footer-container');
const pageContainer = document.querySelector('.page-container');

async function loadPage(pageName) {
  try {
    // Update active link
    document.querySelectorAll('.header-nav-link').forEach((link) => {
      link.classList.remove('active');
    });
    if (pageName === 'homepage.html') {
      document.querySelector('.homepage-link')?.classList.add('active');
    } else if (pageName === 'contactpage.html') {
      document.querySelector('.contact-us-link')?.classList.add('active');
    }

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
    const target = e.target.closest('[data-page]');
    if (target) {
      e.preventDefault();
      const page = target.getAttribute('data-page');
      loadPage(page);
    }

    const dropdownToggle = e.target.closest('.dropdown-toggle');
    const dropdownItem = e.target.closest('.dropdown-item');

    // If clicking on a dropdown item
    if (dropdownItem) {
      e.preventDefault();
      const page = dropdownItem.getAttribute('data-page');
      loadPage(page);
      return;
    }

    // If clicking on the dropdown toggle
    if (dropdownToggle) {
      e.preventDefault();
      const parentItem = dropdownToggle.closest('.header-nav-item');
      const isActive = parentItem.classList.contains('active');

      // Close all other dropdowns
      document.querySelectorAll('.header-nav-item').forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove('active');
        }
      });

      // Toggle current dropdown
      parentItem.classList.toggle('active', !isActive);
      return;
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-nav-item.has-dropdown')) {
      document.querySelectorAll('.header-nav-item').forEach((item) => {
        item.classList.remove('active');
      });
    }
  });
});
