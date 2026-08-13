const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const message = document.getElementById('message');

if (signupForm) {
  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email || !emailInput.checkValidity()) {
      message.textContent = 'Digite um e-mail válido para continuar.';
      emailInput.focus();
      return;
    }

    localStorage.setItem('netflixUserEmail', email);
    window.location.href = 'profiles.html';
  });
}

const profileCards = document.querySelectorAll('.profile-card');
const profileMessage = document.getElementById('profileMessage');

if (profileCards.length) {
  const storedEmail = localStorage.getItem('netflixUserEmail') || 'usuário';

  profileCards.forEach((card) => {
    card.addEventListener('click', function () {
      const profileName = this.dataset.name;
      profileMessage.textContent = `${storedEmail} entrou no perfil ${profileName}.`;
    });
  });
}
