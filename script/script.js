//style css

function changerFichierCSS() {
  var lienCSS = document.getElementById('fichierCSS');

  if (lienCSS.getAttribute('href') === 'css/style.css') {
    lienCSS.setAttribute('href', 'css/style2.css');
  } else {
    lienCSS.setAttribute('href', 'css/style.css');
  }
}

// fonctions pour que le style soit charger dans l'url 
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function changerFichierCSS() {
  var lienCSS = document.getElementById('fichierCSS');

  if (lienCSS.getAttribute('href') === 'css/style.css') {
    lienCSS.setAttribute('href', 'css/style2.css');
    setCookie('style', 'style2.css', 7); // Stocker le nom du fichier CSS dans le cookie pendant 7 jours
  } else {
    lienCSS.setAttribute('href', 'css/style.css');
    setCookie('style', 'style.css', 7); // Stocker le nom du fichier CSS dans le cookie pendant 7 jours
  }
}

// Au chargement de la page, vérifier si un style est stocké dans le cookie et l'appliquer
window.addEventListener('load', function() {
  var styleCookie = getCookie('style');
  var lienCSS = document.getElementById('fichierCSS');

  if (styleCookie) {
    lienCSS.setAttribute('href', 'css/' + styleCookie);
  }
});


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
