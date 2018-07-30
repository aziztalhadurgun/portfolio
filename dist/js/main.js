const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    //menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));
    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
}

//about progress

var Progress = function(element) {
  this.context = element.getContext('2d');
  this.refElement = element.parentNode;
  this.loaded = 0;
  this.start = 4.72;
  this.width = this.context.canvas.width;
  this.height = this.context.canvas.height;
  this.total = parseInt(this.refElement.dataset.percent, 10);
  this.timer = null;

  this.diff = 0;

  this.init();
};

Progress.prototype = {
  init: function() {
    var self = this;
    self.timer = setInterval(function() {
      self.run();
    }, 25);
  },
  run: function() {
    var self = this;

    self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
    self.context.clearRect(0, 0, self.width, self.height);
    self.context.lineWidth = 10;
    self.context.fillStyle = '#fff';
    self.context.strokeStyle = '#eece1a';
    self.context.textAlign = 'center';

    self.context.fillText(
      self.loaded + '%',
      self.width * 0.5,
      self.height * 0.5 + 2,
      self.width
    );
    self.context.beginPath();
    self.context.arc(
      35,
      35,
      30,
      self.start,
      self.diff / 10 + self.start,
      false
    );
    self.context.stroke();

    if (self.loaded >= self.total) {
      clearInterval(self.timer);
    }

    self.loaded++;
  }
};

var CircularSkillBar = function(elements) {
  this.bars = document.querySelectorAll(elements);
  if (this.bars.length > 0) {
    this.init();
  }
};

CircularSkillBar.prototype = {
  init: function() {
    this.tick = 25;
    this.progress();
  },
  progress: function() {
    var self = this;
    var index = 0;
    var firstCanvas = self.bars[0].querySelector('canvas');
    var firstProg = new Progress(firstCanvas);

    var timer = setInterval(function() {
      index++;

      var canvas = self.bars[index].querySelector('canvas');
      var prog = new Progress(canvas);

      if (index == self.bars.length) {
        clearInterval(timer);
      }
    }, self.tick * 100);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var circularBars = new CircularSkillBar('#bars .bar');
});
