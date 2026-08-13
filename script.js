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
      localStorage.setItem('selectedProfile', profileName);
      profileMessage.textContent = `${storedEmail} entrou no perfil ${profileName}.`;
      window.location.href = 'home.html';
    });
  });
}

const homeData = [
  {
    title: 'Em alta',
    items: [
      {
        title: 'Velozes e Furiosos',
        poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'A Vida é Bela',
        poster: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      },
      {
        title: 'A Saga',
        poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Nova Aventura',
        poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      }
    ]
  },
  {
    title: 'Séries para você',
    items: [
      {
        title: 'Mistério',
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Futuro',
        poster: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      },
      {
        title: 'Noite',
        poster: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'A Cidade',
        poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      }
    ]
  },
  {
    title: 'Continue assistindo',
    items: [
      {
        title: 'Nação',
        poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'O Último',
        poster: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      },
      {
        title: 'Estrada',
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/mov_bbb.mp4'
      },
      {
        title: 'Rumo',
        poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
        trailer: 'https://www.w3schools.com/html/movie.mp4'
      }
    ]
  }
];

const mediaSections = document.getElementById('mediaSections');

if (mediaSections) {
  const profileName = localStorage.getItem('selectedProfile') || 'Usuário';
  const profileLabel = document.getElementById('currentProfile');

  if (profileLabel) {
    profileLabel.textContent = profileName;
  }

  homeData.forEach((section) => {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'media-row';

    const title = document.createElement('h2');
    title.className = 'row-title';
    title.textContent = section.title;
    sectionEl.appendChild(title);

    const list = document.createElement('div');
    list.className = 'media-list';

    section.items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'media-card';
      card.innerHTML = `
        <img class="media-poster" src="${item.poster}" alt="${item.title}" />
        <video class="media-trailer" muted loop playsinline preload="metadata" poster="${item.poster}">
          <source src="${item.trailer}" type="video/mp4" />
        </video>
        <div class="media-info">
          <strong>${item.title}</strong>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        const video = card.querySelector('.media-trailer');
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      });

      card.addEventListener('mouseleave', () => {
        const video = card.querySelector('.media-trailer');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      list.appendChild(card);
    });

    sectionEl.appendChild(list);
    mediaSections.appendChild(sectionEl);
  });
}
