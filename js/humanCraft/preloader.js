BasicGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
};

BasicGame.Preloader.prototype = {
  preload: function () {
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
    this.add.text(this.game.width / 2, this.game.height / 2 - 30, "로딩중...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar); //load될때마다 채워진다

    this.load.image('titlepage', 'assets/humanCraft/titlepage.png');
    this.load.image('map', 'assets/humanCraft/map.png');
    this.load.image('rampart', 'assets/humanCraft/rampart.png');
    this.load.image('bullet', 'assets/humanCraft/bullet.png');

    this.load.image('star', 'assets/humanCraft/star.png');
    this.load.image('diamond', 'assets/humanCraft/diamond.png');
    this.load.image('firstAid', 'assets/humanCraft/firstAid.png');

    this.load.spritesheet('player', 'assets/humanCraft/player.png', 50, 70);
    this.load.spritesheet('stone', 'assets/humanCraft/stone.png', 80, 80);

    this.load.spritesheet('enemy', 'assets/humanCraft/enemy.png', 65, 60);
    this.load.spritesheet('skullWarrior', 'assets/humanCraft/skullWarrior.png', 50, 60);
    this.load.spritesheet('skull', 'assets/humanCraft/skull.png', 35, 50);
    this.load.spritesheet('paladin', 'assets/humanCraft/paladin.png', 44, 60);
    this.load.spritesheet('broadax', 'assets/humanCraft/broadax.png', 47, 60);
    this.load.spritesheet('saver', 'assets/humanCraft/saver.png', 70, 60);

    this.load.spritesheet('explosion', 'assets/humanCraft/explosion.png', 32, 32);
    this.load.audio('explosion', ['assets/humanCraft/explosion.ogg', 'assets/humanCraft/explosion.wav']);
    this.load.audio('playerExplosion', ['assets/humanCraft/player-explosion.ogg', 'assets/humanCraft/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/humanCraft/enemy-fire.ogg', 'assets/humanCraft/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/humanCraft/player-fire.ogg', 'assets/humanCraft/player-fire.wav']);
    this.load.audio('powerUp', ['assets/humanCraft/powerup.ogg', 'assets/humanCraft/powerup.wav']);

    /* 유닛추가
    this.load.spritesheet('blueHero', 'assets/humanCraft/blueHero.png', 50, 60);
    this.load.spritesheet('blueHeroAttack', 'assets/humanCraft/blueHeroAttack.png', 50, 60);
    this.load.spritesheet('bluePaladin', 'assets/humanCraft/bluePaladin.png', 50, 60);
    this.load.spritesheet('bluePaladinAttack', 'assets/humanCraft/bluePaladinAttack.png', 50, 60);
    this.load.spritesheet('blueSaver', 'assets/humanCraft/blueSaver.png', 50, 60);
    this.load.spritesheet('blueSaverAttack', 'assets/humanCraft/blueSaverAttack.png', 50, 60);
    this.load.spritesheet('blueWarrior', 'assets/humanCraft/blueWarrior.png', 50, 60);
    this.load.spritesheet('blueWarriorAttack', 'assets/humanCraft/blueWarriorAttack.png', 50, 60);

    this.load.image('redSkullDie', 'assets/humanCraft/redSkullDie.png');   
    this.load.spritesheet('redSkull', 'assets/humanCraft/redSkull.png', 50, 60);
    this.load.spritesheet('redSkullArcher', 'assets/humanCraft/redSkullArcher.png', 50, 60);
    this.load.spritesheet('redSkullArcherAttack', 'assets/humanCraft/redSkullArcherAttack.png', 50, 60);
    this.load.spritesheet('redSkullAttack', 'assets/humanCraft/redSkullAttack.png', 50, 60);
    this.load.spritesheet('redSkullWarrior', 'assets/humanCraft/redSkullWarrior.png', 50, 60);
    */

    /*
    this.load.spritesheet('파일명 그대로', 'assets/humanCraft/파일명.png', 32, 32);
    this.load.spritesheet('whiteEnemy', 'assets/airwar/shooting-enemy.png', 32, 32);
    this.load.spritesheet('boss', 'assets/airwar/boss.png', 93, 75);
    this.load.spritesheet('explosion', 'assets/airwar/explosion.png', 32, 32);
    this.load.spritesheet('player', 'assets/airwar/player.png', 64, 64);
    this.load.spritesheet('destroyer', 'assets/airwar/destroyer.png', 32, 174);
    this.load.spritesheet('f01', 'assets/airwar/f01.png', 66, 66);
    this.load.spritesheet('f02', 'assets/airwar/f02.png', 166, 124);
    this.load.audio('explosion', ['assets/airwar/explosion.ogg', 'assets/airwar/explosion.wav']);
    this.load.audio('playerExplosion', ['assets/airwar/player-explosion.ogg', 'assets/airwar/player-explosion.wav']);
    this.load.audio('enemyFire', ['assets/airwar/enemy-fire.ogg', 'assets/airwar/enemy-fire.wav']);
    this.load.audio('playerFire', ['assets/airwar/player-fire.ogg', 'assets/airwar/player-fire.wav']);
    this.load.audio('powerUp', ['assets/airwar/powerup.ogg', 'assets/airwar/powerup.wav']);
    */
  },

  create: function () {
    this.preloadBar.cropEnabled = false;
  },

  update: function () {
      this.state.start('MainMenu');
  }
};
