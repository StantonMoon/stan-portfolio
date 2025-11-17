// Director's Cut Video Management
class DirectorsCutManager {
  constructor() {
    this.videoWrappers = document.querySelectorAll('.video-wrapper');
    this.activeVideo = null;
    this.init();
  }

  init() {
    this.videoWrappers.forEach(wrapper => {
      const thumbnail = wrapper.querySelector('.video-thumbnail');
      thumbnail.addEventListener('click', () => this.loadVideo(wrapper));
    });

    document.addEventListener('click', (e) => {
      if (this.activeVideo && !this.activeVideo.contains(e.target)) {
        this.closeActiveVideo();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeVideo) {
        this.closeActiveVideo();
      }
    });
  }

  loadVideo(wrapper) {
    if (this.activeVideo && this.activeVideo !== wrapper) {
      this.closeActiveVideo();
    }

    const vimeoId = wrapper.getAttribute('data-vimeo-id');
    const embedContainer = wrapper.querySelector('.video-embed');
    
    embedContainer.innerHTML = '<div class="video-loading">Loading...</div>';
    embedContainer.style.display = 'block';
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    
    setTimeout(() => {
      embedContainer.innerHTML = '';
      embedContainer.appendChild(iframe);
      wrapper.classList.add('active');
      this.activeVideo = wrapper;
      
      if (window.innerWidth < 768) {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  }

  closeActiveVideo() {
    if (this.activeVideo) {
      const embedContainer = this.activeVideo.querySelector('.video-embed');
      const iframe = embedContainer.querySelector('iframe');
      
      if (iframe) {
        iframe.remove();
      }
      
      embedContainer.style.display = 'none';
      embedContainer.innerHTML = '';
      this.activeVideo.classList.remove('active');
      this.activeVideo = null;
    }
  }
}

// Intersection Observer for fade-in animations
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Pause other videos when one plays
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (!entry.isIntersecting) {
        video.pause();
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll("video").forEach(video => observer.observe(video));

function revealNumber() {
  const phoneNumber = "+27 66 295 9993";
  const phoneElement = document.getElementById('phoneNumber');
  const button = event.currentTarget;
  
  phoneElement.textContent = phoneNumber;
  phoneElement.classList.add('show');
  button.style.display = 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DirectorsCutManager();
});
