//style css

function changerFichierCSS() {
  var lienCSS = document.getElementById('fichierCSS');

  if (lienCSS.getAttribute('href') === 'css/style.css') {
    lienCSS.setAttribute('href', 'css/style2.css');
  } else {
    lienCSS.setAttribute('href', 'css/style.css');
  }
  
}

//burger 
function toggleNavbar() {
  var navbarLinks = document.getElementById("navbar-links");
  if (navbarLinks.style.display === "none") {
    navbarLinks.style.display = "flex";
  } else {
    navbarLinks.style.display = "none";
  }
}

//horloge
function updateClock() {
  var now = new Date();
  var hour = now.getHours().toString().padStart(2, '0');
  var minute = now.getMinutes().toString().padStart(2, '0');

  document.getElementById('hour').textContent = hour;
  document.getElementById('minute').textContent = minute;
}
setInterval(updateClock, 1000);


//footer
const expandButton = document.getElementById('expandButton');
const footer = document.getElementById('footer');

expandButton.addEventListener('click', function() {
  footer.classList.toggle('expanded');

  if (footer.classList.contains('expanded')) {
    expandButton.textContent = 'Voir moins';
  } else {
    expandButton.textContent = 'Voir plus';
  }
});

//image dans projet 
document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('.projet img');
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  images.forEach(function(image) {
    image.addEventListener('click', function() {
      if (!isMobile) {
        image.classList.add('agrandi');
        setTimeout(function() {
          image.classList.remove('agrandi');
        }, 2000);
      } else {
        image.classList.toggle('rotate');
      }
    });
  });
});