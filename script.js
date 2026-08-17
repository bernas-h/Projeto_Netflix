// Toca o áudio na página principal se vindo do clique no perfil
if (localStorage.getItem('playAudio') === 'true') {
  const audio = new Audio('audio/audionerdflix.mp3');
  audio.volume = 1;
  audio.play().catch(error => {
    console.log('Erro ao tocar áudio:', error);
  });
  localStorage.removeItem('playAudio');
}

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

    localStorage.setItem('nerdflixUserEmail', email);
    window.location.href = 'profiles.html';
  });
}

const profileCards = document.querySelectorAll('.profile-card');
const profileMessage = document.getElementById('profileMessage');

if (profileCards.length) {
  profileCards.forEach((card) => {
    card.addEventListener('click', function () {
      const profileName = this.dataset.name;
      localStorage.setItem('selectedProfile', profileName);
      localStorage.setItem('playAudio', 'true');
      
      // Toca o áudio e redireciona imediatamente
      const audio = new Audio('audio/audionerdflix.mp3');
      audio.volume = 1;
      audio.play().catch(error => {
        console.log('Erro ao tocar áudio:', error);
      });
      
      window.location.href = 'home.html';
    });
  });
}

const homeData = [
  {
    title: 'Em alta',
    items: [
      {
        title: 'Dark',
        poster: 'images/capadark.jpg',
        trailer: 'videos/traillerdark.mp4'
      },
      {
        title: 'Vingadores',
        poster: 'images/capavingadores.jpg',
        trailer: 'videos/traillervingadores.mp4'
      },
      {
        title: 'Moana',
        poster: 'images/capamoana.jpg',
        trailer: 'videos/traillermoana.mp4'
      },
      {
        title: 'The Walking Dead',
        poster: 'images/capatwd.jpg',
        trailer: 'videos/traillertwd.mp4'
      },
      {
        title: 'Tropa de Elite',
        poster: 'images/capatropadeelite.jpg',
        trailer: 'videos/traillertropadeelite.mp4'
      }
    ]
  },
  {
    title: 'Séries para você',
    items: [
      {
        title: 'Friends',
        poster: 'images/capafriends.webp',
        trailer: 'videos/traillerfriends.mp4'
      },
      {
        title: 'Breaking Bad',
        poster: 'images/capabreakingbad.jpg',
        trailer: 'videos/traillerbreakingbad.mp4'
      },
      {
        title: 'Vikings',
        poster: 'images/capavikings.jpg',
        trailer: 'videos/traillervikings.mp4'
      },
      {
        title: 'Peaky Blinders',
        poster: 'images/capapeakyblinders.jpg',
        trailer: 'videos/traillerpeakyblinders.mp4'
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
        <div class="media-progress">
          <div class="media-progress-bar"></div>
        </div>
        <div class="media-info">
          <strong>${item.title}</strong>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        const video = card.querySelector('.media-trailer');
        const progressBar = card.querySelector('.media-progress-bar');
        if (!video) return;

        video.load();
        video.currentTime = 0;
        video.play().catch(() => {});

        // Atualiza a barra de progresso durante a reprodução
        const updateProgress = () => {
          if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = progress + '%';
          }
          if (!video.paused) {
            requestAnimationFrame(updateProgress);
          }
        };
        updateProgress();
      });

      card.addEventListener('mouseleave', () => {
        const video = card.querySelector('.media-trailer');
        const progressBar = card.querySelector('.media-progress-bar');
        if (!video) return;

        video.pause();
        video.currentTime = 0;
        progressBar.style.width = '0%';
      });

      list.appendChild(card);
    });

    sectionEl.appendChild(list);
    mediaSections.appendChild(sectionEl);
  });
}

