document.addEventListener('DOMContentLoaded', () => {
  console.log('Page fully loaded, including images and stylesheets');

  // Select all anchor elements inside divs
  const anchors = document.querySelectorAll('div a');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Remove .active from all divs
      document.querySelectorAll('div.active').forEach((div) => {
        div.classList.remove('active');
      });

      // Add .active to the parent div of the clicked anchor
      this.parentElement.parentElement.classList.add('active');
    });
  });
});
