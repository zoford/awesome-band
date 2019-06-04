import tooltip from 'tippy.js';
import Shortcut from 'mousetrap';
import Musician from './musician';
import './assets/icons/drums.png';
import './assets/icons/piano.png';
import './assets/icons/guitar.png';
import './assets/piano.ogg';
import './assets/piano.mp3';
import './assets/guitar.ogg';
import './assets/guitar.mp3';
import './assets/drums.ogg';
import './assets/drums.mp3';

export default class Stage {
  constructor (musiciansElement) {
    this.musicians = [];
    this.instruments = ['piano', 'drums', 'guitar'];
    this.colors = ['#ff3864', '#cc978e', '#f39c6b'];
    this.musiciansElement = musiciansElement;
    this.isPlaying = false;
    this.playButton = document.getElementById('play-button');
    this.pauseButton = document.getElementById('pause-button');
    this.stopButton = document.getElementById('stop-button');
  }

  initToolbar () {
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;
    tooltip('[data-tippy-content]', { delay: [800, 100] });

    this.playButton.addEventListener('click', () => {
      this.play();
      this.isPlaying = !this.isPlaying;
    });
    this.pauseButton.addEventListener('click', () => {
      this.pause();
      this.isPlaying = !this.isPlaying;
    });
    this.stopButton.addEventListener('click', () => {
      this.stop();
      this.isPlaying = false;
    });

    Shortcut.bind('space', () => {
      this.isPlaying ? this.pause() : this.play();
      this.isPlaying = !this.isPlaying;
    });
    Shortcut.bind('esc', () => {
      this.stop();
      this.isPlaying = false;
    });
  }

  initStage () {
    this.musicianButton = document.createElement('button');
    this.musicianButton.className = 'musician-button';
    this.musicianButton.innerHTML = '<ion-icon name="add"></ion-icon>';
    this.instrumentButtons = Array(this.instruments.length).fill().map((_, i) => {
      let button = document.createElement('button');
      button.className = 'instrument-button';
      button.id = this.instruments[i];
      button.innerHTML = '<img src="images/'+ this.instruments[i] +'.png">';
      button.addEventListener('click', () => {
          this.createMusician('audio/' + this.instruments[i], this.colors[i]);
      });
      return button;
    });
    this.musicianButtonContent = document.createElement('div');
    this.instrumentButtons.forEach((button) => {
      this.musicianButtonContent.appendChild(button);
    });
    tooltip(this.musicianButton, {
      theme: 'black',
      trigger: 'click',
      arrow: true,
      arrowType: 'sharp',
      placement: 'bottom',
      interactive: true,
      content: this.musicianButtonContent
    });
    this.musiciansElement.appendChild(this.musicianButton);
  }

  createMusician (audioPath, color) {
    let musician = new Musician(audioPath, color);
    musician.display(this.musiciansElement);
    this.musicians.push(musician);
  }

  play () {
    this.musicians.forEach((musician) => { musician.play(); } );
    this.playButton.disabled = true;
    this.pauseButton.disabled = false;
    this.stopButton.disabled = false;
  }

  pause () {
    this.musicians.forEach((musician) => { musician.pause(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = false;
  }

  stop () {
    this.musicians.forEach((musician) => { musician.stop(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;
  }
}
