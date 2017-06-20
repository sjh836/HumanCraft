var BasicGame = { //기호상수들
  SEA_SCROLL_SPEED: 12,
  PLAYER_SPEED: 300,
  ENEMY_MIN_Y_VELOCITY: 30,
  ENEMY_MAX_Y_VELOCITY: 60,
  SHOOTER_MIN_VELOCITY: 30,
  SHOOTER_MAX_VELOCITY: 80,
  BOSS_Y_VELOCITY: 15,
  BOSS_X_VELOCITY: 200,
  BULLET_VELOCITY: 500,
  ENEMY_BULLET_VELOCITY: 150,
  POWERUP_VELOCITY: 100,
  ITEM_VELOCITY: 200,
  DESTROYER_Y_VELOCITY: 70,

  SPAWN_ENEMY_DELAY: Phaser.Timer.SECOND, //=1000
  SPAWN_SHOOTER_DELAY: Phaser.Timer.SECOND * 3,
  SPAWN_DESTROYER_DELAY: Phaser.Timer.SECOND * 6,
  SPAWN_BOSS_DELAY: Phaser.Timer.SECOND * 10,

  SHOT_DELAY: Phaser.Timer.SECOND * 0.1,
  SHOOTER_SHOT_DELAY: Phaser.Timer.SECOND * 3,
  DESTROYER_SHOT_DELAY: Phaser.Timer.SECOND * 2,
  BOSS_SHOT_DELAY: Phaser.Timer.SECOND,

  ENEMY_HEALTH: 5,
  SHOOTER_HEALTH: 15,
  DESTROYER_HEALTH: 30,
  BOSS_HEALTH: 100,
  F01_HEALTH: 80,
  F02_HEALTH: 150,

  BULLET_DAMAGE: 1,
  CRASH_DAMAGE: 5,

  ENEMY_REWARD: 75,
  SHOOTER_REWARD: 350,
  DESTROYER_REWARD: 500,
  BOSS_REWARD: 950,
  POWERUP_REWARD: 100,
  STAR_REWARD: 200,
  DIAMOND_REWARD: 300,
  F01_REWARD: 750,
  F02_REWARD: 1200,

  ENEMY_DROP_RATE: 0.2,
  SHOOTER_DROP_RATE: 0.4,
  DESTROYER_DROP_RATE: 0.5,
  BOSS_DROP_RATE: 0.7,

  PLAYER_EXTRA_LIVES: 3,
  PLAYER_EXTRA_BOMBS: 3,
  PLAYER_GHOST_TIME: Phaser.Timer.SECOND * 3,

  INSTRUCTION_EXPIRE: Phaser.Timer.SECOND * 10,
  RETURN_MESSAGE_DELAY: Phaser.Timer.SECOND * 2
};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {
  init: function () {
    this.input.maxPointers = 1; //멀티 터치 지원하지 않을거면 최대포인터는 1개만 설정

    if (this.game.device.desktop) { //데스크톱 화면 모드
      //  If you have any desktop specific settings, they can go in here
    }
    else { //모바일 화면 모드
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
    }
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function () {
    this.load.image('preloaderBar', 'assets/humanCraft/preloader-bar.png');
  },

  create: function () {  //애셋이 캐시에 로드되고 게임 설정을 한다
    this.state.start('Preloader');
  }
};
