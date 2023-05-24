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

//formulaire
function submitForm(event) {
  event.preventDefault();

  var email = document.getElementById('emailInput').value;
  var message = document.getElementById('messageInput').value;

  if (email === '' || message === '') {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
  }

  var formData = new FormData();
  formData.append('email', email);
  formData.append('message', message);

  // Envoyer les données à un serveur en utilisant une requête AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/send-email'); // Remplacez "/send-email" par l'URL de votre route serveur
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log('E-mail envoyé avec succès !');
          // Réinitialiser le formulaire
          document.getElementById('emailInput').value = '';
          document.getElementById('messageInput').value = '';
      } else {
          console.log('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
      }
  };
  xhr.send(formData);
}


const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const email = req.body.email;
    const message = req.body.message;

    // Configuration du transporteur d'e-mails
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'votre_adresse@hotmail.com', // Remplacez par votre adresse e-mail
            pass: 'votre_mot_de_passe' // Remplacez par votre mot de passe
        }
    });

    // Configuration de l'e-mail
    const mailOptions = {
        from: email, // L'expéditeur de l'e-mail sera l'adresse e-mail soumise dans le formulaire
        to: 'herveguerre@hotmail.fr', // L'adresse e-mail de destination
        subject: 'Nouveau message de formulaire de contact',
        text: message
    };

    // Envoi de l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Une erreur s\'est produite lors de l\'envoi de l\'e-mail:', error);
            res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
            res.status(200).send('E-mail envoyé avec succès !');
        }
    });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

