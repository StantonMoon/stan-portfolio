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

    // Close video when clicking outside
    document.addEventListener('click', (e) => {
      if (this.activeVideo && !this.activeVideo.contains(e.target)) {
        this.closeActiveVideo();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeVideo) {
        this.closeActiveVideo();
      }
    });
  }

  loadVideo(wrapper) {
    // Close currently active video
    if (this.activeVideo && this.activeVideo !== wrapper) {
      this.closeActiveVideo();
    }

    const vimeoId = wrapper.getAttribute('data-vimeo-id');
    const embedContainer = wrapper.querySelector('.video-embed');
    
    // Show loading state
    embedContainer.innerHTML = '<div class="video-loading">Loading...</div>';
    embedContainer.style.display = 'block';
    
    // Create Vimeo iframe with proper parameters to remove instructions
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    
    // Replace loading with iframe
    setTimeout(() => {
      embedContainer.innerHTML = '';
      embedContainer.appendChild(iframe);
      
      // Add active class
      wrapper.classList.add('active');
      this.activeVideo = wrapper;
      
      // Scroll to video if on mobile
      if (window.innerWidth < 768) {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  }

  closeActiveVideo() {
    if (this.activeVideo) {
      const embedContainer = this.activeVideo.querySelector('.video-embed');
      const iframe = embedContainer.querySelector('iframe');
      
      // Remove iframe to stop video
      if (iframe) {
        iframe.remove();
      }
      
      // Hide embed and show thumbnail
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

// Pause other videos when one plays (for any remaining video elements)
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

// Apply to any remaining video elements
document.querySelectorAll("video").forEach(video => observer.observe(video));

// Phone number reveal function
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