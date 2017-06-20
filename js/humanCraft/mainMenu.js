BasicGame.MainMenu = function (game) {
  this.music = null;
  this.playButton = null;
};

BasicGame.MainMenu.prototype = {
  create: function () {
    this.add.sprite(0, 0, 'titlepage');

    this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 + 80, "A 또는 클릭하면 게임을 시작합니다", { font: "30px Arial", fill: "#F00" });
    this.loadingText.anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 120, "삼육대학교 컴퓨터학부 17-1 게임프로그래밍", { font: "15px monospace", fill: "#F00", align: "center"}).anchor.setTo(0.5, 0.5);
    this.add.text(this.game.width / 2, this.game.height - 90, "2012335054 이정훈 2012335030 박영준", { font: "15px monospace", fill: "#F00", align: "center"}).anchor.setTo(0.5, 0.5);
  },

  update: function () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.activePointer.isDown) {
      this.startGame();
    }
  },

  startGame: function (pointer) {
    this.state.start('Game');
  }
};
