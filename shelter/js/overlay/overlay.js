class Overlay {
    constructor() {
      if (Overlay.instance) {
        return Overlay.instance;
      }
  
      this.overlay = document.createElement('div');
      this.overlay.className = 'overlay';
      document.body.appendChild(this.overlay);
      Overlay.instance = this;
      Object.freeze(this);
    }

    getOverlayElement() {
      return this.overlay;
    }
  
    toggle() {
      this.overlay.classList.toggle('active');
    }
  
    hide() {
      this.overlay.classList.remove('active');
    }
  }
  
  const instance = new Overlay();
  export default instance;
