
BasicGame.Game = function (game) {
	this.game; // a reference to the currently running game
	this.add; // used to add sprites, text, groups, etc
	this.camera; // a reference to the game camera
	this.cache; // the game cache
	this.input; // the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
	this.load; // for preloading assets
	this.math; // lots of useful common math operations
	this.sound; // the sound manager - add a sound, play one, set-up markers, etc
	this.stage; // the game stage
	this.time; // the clock
	this.tweens; // the tween manager
	this.state; // the state manager
	this.world; // the game world
	this.particles; // the particle manager
	this.physics; // the physics manager
	this.rnd; // the repeatable random number generator
};

BasicGame.Game.prototype = {
  create: function () {
	this.game.add.sprite(0, 0, 'map');

	//플레이어 관련
	this.player = this.add.sprite(30, this.game.height / 2, 'player');	//플레이어 생성 및 가운데 기준으로 생성
	this.player.anchor.setTo(0.5, 0.5);
	this.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.player.animations.add('move', [ 1, 2, 3 ], 20, false);
	this.player.animations.add('play', [ 1 ], 20, true);
	this.player.animations.add('attack', [ 0, 0, 2 ], 10, false);
	this.player.play('play');
	this.player.events.onAnimationComplete.add( function (e) { e.play('play'); }, this); 
	this.player.speed = 300;	//움직일때 속도
	this.player.body.setSize(20, 20, 20, 20); 
	this.player.body.collideWorldBounds = true;	// 화면밖으로 나가지 못하도록

 	//성벽 관련
	this.rampart = this.add.sprite(100, 0, 'rampart');
	this.rampart.anchor.setTo(0.5, 0.5);
	this.physics.enable(this.rampart, Phaser.Physics.ARCADE);
	this.rampart.body.collideWorldBounds = true;

 	//아이템 관련
 	this.starPool = this.add.group();
 	this.starPool.enableBody = true;
 	this.starPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.starPool.createMultiple(10, 'star');
 	this.starPool.setAll('anchor.x', 0.5);
 	this.starPool.setAll('anchor.y', 0.5);
 	this.starPool.setAll('outOfBoundsKill', true);
 	this.starPool.setAll('checkWorldBounds', true);
 	this.starPool.setAll('reward', 200, false, false, 0, true );

  	this.diamondPool = this.add.group();
 	this.diamondPool.enableBody = true;
 	this.diamondPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.diamondPool.createMultiple(5, 'diamond');
 	this.diamondPool.setAll('anchor.x', 0.5);
 	this.diamondPool.setAll('anchor.y', 0.5);
 	this.diamondPool.setAll('outOfBoundsKill', true);
 	this.diamondPool.setAll('checkWorldBounds', true);
 	this.diamondPool.setAll('reward', 300, false, false, 0, true );

 	this.firstAidPool = this.add.group();
 	this.firstAidPool.enableBody = true;
 	this.firstAidPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.firstAidPool.createMultiple(1, 'firstAid');
 	this.firstAidPool.setAll('anchor.x', 0.5);
 	this.firstAidPool.setAll('anchor.y', 0.5);
 	this.firstAidPool.setAll('outOfBoundsKill', true);
 	this.firstAidPool.setAll('checkWorldBounds', true);
 	this.firstAidPool.setAll('reward', 100, false, false, 0, true );

 	//기본 적군
	this.enemyPool = this.add.group(); 
 	this.enemyPool.enableBody = true;
 	this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.enemyPool.createMultiple(40, 'enemy');
 	this.enemyPool.setAll('anchor.x', 0.5);
 	this.enemyPool.setAll('anchor.y', 0.5);
 	this.enemyPool.setAll('outOfBoundsKill', true);
 	this.enemyPool.setAll('checkWorldBounds', true);
 	this.enemyPool.setAll('reward', 75, false, false, 0, true ); //점수 지급
 	this.enemyPool.setAll('dropRate', 0.2, false, false, 0, true ); //아이템 드랍율

	this.enemyPool.forEach(function (enemy) {
		enemy.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		enemy.animations.add('move', [ 2, 2, 3 ], 10, true); //왼쪽 이동
		enemy.animations.add('hit', [ 3, 4 ], 15, false);
		enemy.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextEnemyAt = this.time.now + Phaser.Timer.SECOND * 8;
	this.enemyDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//해골전사 적군
	this.skullWarriorPool = this.add.group();
 	this.skullWarriorPool.enableBody = true;
 	this.skullWarriorPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.skullWarriorPool.createMultiple(50, 'skullWarrior');
 	this.skullWarriorPool.setAll('anchor.x', 0.5);
 	this.skullWarriorPool.setAll('anchor.y', 0.5);
 	this.skullWarriorPool.setAll('outOfBoundsKill', true);
 	this.skullWarriorPool.setAll('checkWorldBounds', true);
 	this.skullWarriorPool.setAll('reward', BasicGame.ENEMY_REWARD, false, false, 0, true ); //점수 지급
 	this.skullWarriorPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true ); //아이템 드랍율

	this.skullWarriorPool.forEach(function (skullWarrior) {
		skullWarrior.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		skullWarrior.animations.add('move', [ 2, 3, 4 ], 10, true); //왼쪽 이동
		skullWarrior.animations.add('hit', [ 4, 5 ], 15, false);
		skullWarrior.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextSkullWarriorAt = this.time.now + Phaser.Timer.SECOND * 5;
	this.skullWarriorDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//해골 적군
	this.skullPool = this.add.group();
 	this.skullPool.enableBody = true;
 	this.skullPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.skullPool.createMultiple(50, 'skull');
 	this.skullPool.setAll('anchor.x', 0.5);
 	this.skullPool.setAll('anchor.y', 0.5);
 	this.skullPool.setAll('outOfBoundsKill', true);
 	this.skullPool.setAll('checkWorldBounds', true);
 	this.skullPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true ); //점수 지급
 	this.skullPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true ); //아이템 드랍율

	this.skullPool.forEach(function (skull) {
		skull.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		skull.animations.add('move', [ 2, 3, 4 ], 10, true); //왼쪽 이동
		skull.animations.add('hit', [ 4, 5 ], 15, false);
		skull.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextSkullAt = this.time.now + Phaser.Timer.SECOND * 5;
	this.skullDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//세이버 적군
	this.saverPool = this.add.group();
 	this.saverPool.enableBody = true;
 	this.saverPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.saverPool.createMultiple(5, 'saver');
 	this.saverPool.setAll('anchor.x', 0.5);
 	this.saverPool.setAll('anchor.y', 0.5);
 	this.saverPool.setAll('outOfBoundsKill', true);
 	this.saverPool.setAll('checkWorldBounds', true);
 	this.saverPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true ); //점수 지급
 	this.saverPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true ); //아이템 드랍율

	this.saverPool.forEach(function (saver) { 
		saver.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		saver.animations.add('move', [ 2, 3, 4 ], 10, true); //왼쪽 이동
		saver.animations.add('hit', [ 4, 5 ], 15, false);
		saver.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextSaverAt = this.time.now + Phaser.Timer.SECOND * 30;
	this.saverDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//도끼병 적군
	this.broadaxPool = this.add.group();
 	this.broadaxPool.enableBody = true;
 	this.broadaxPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.broadaxPool.createMultiple(10, 'broadax');
 	this.broadaxPool.setAll('anchor.x', 0.5);
 	this.broadaxPool.setAll('anchor.y', 0.5);
 	this.broadaxPool.setAll('outOfBoundsKill', true);
 	this.broadaxPool.setAll('checkWorldBounds', true);
 	this.broadaxPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true ); //점수 지급
 	this.broadaxPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true ); //아이템 드랍율

	this.broadaxPool.forEach(function (broadax) { 
		broadax.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		broadax.animations.add('move', [ 2, 3 ], 10, true); //왼쪽 이동
		broadax.animations.add('hit', [ 4, 5 ], 15, false);
		broadax.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextBroadaxAt = this.time.now + Phaser.Timer.SECOND * 15;
	this.broadaxDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//팔라딘 적군
	this.paladinPool = this.add.group();
 	this.paladinPool.enableBody = true;
 	this.paladinPool.physicsBodyType = Phaser.Physics.ARCADE;
 	this.paladinPool.createMultiple(15, 'paladin');
 	this.paladinPool.setAll('anchor.x', 0.5);
 	this.paladinPool.setAll('anchor.y', 0.5);
 	this.paladinPool.setAll('outOfBoundsKill', true);
 	this.paladinPool.setAll('checkWorldBounds', true);
 	this.paladinPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true ); //점수 지급
 	this.paladinPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true ); //아이템 드랍율

	this.paladinPool.forEach(function (paladin) { 
		paladin.animations.add('attack', [ 0, 1, 1 ], 5, false); 
		paladin.animations.add('move', [ 2, 3, 4, 5 ], 10, true); //왼쪽 이동
		paladin.animations.add('hit', [ 5, 6 ], 15, false);
		paladin.events.onAnimationComplete.add( function (e) { e.play('move'); }, this); 
	});
	this.nextPaladinAt = this.time.now + Phaser.Timer.SECOND * 20;
	this.paladinDelay = BasicGame.SPAWN_ENEMY_DELAY;

	//총알 관련
	this.bulletPool = this.add.group();
	this.bulletPool.enableBody = true;
	this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.bulletPool.createMultiple(100, 'bullet');
	this.bulletPool.setAll('anchor.x', 0.5);
	this.bulletPool.setAll('anchor.y', 0.5);
	this.bulletPool.setAll('outOfBoundsKill', true); //화면 밖으로 나가면 삭제 처리
	this.bulletPool.setAll('checkWorldBounds', true);

	this.nextShotAt = 0;
	this.shotDelay = BasicGame.SHOT_DELAY; //총알 간격

	//돌탄 관련
	this.stonePool = this.add.group();
	this.stonePool.enableBody = true;
	this.stonePool.physicsBodyType = Phaser.Physics.ARCADE;
	this.stonePool.createMultiple(1, 'stone');
	this.stonePool.setAll('anchor.x', 0.5);
	this.stonePool.setAll('anchor.y', 0.5);
	this.stonePool.setAll('outOfBoundsKill', true); //화면 밖으로 나가면 삭제 처리
	this.stonePool.setAll('checkWorldBounds', true);
	this.stonePool.forEach(function (stone) {
		stone.animations.add('hit');
	});

	//폭발 관련
	this.explosionPool = this.add.group();
	this.explosionPool.enableBody = true;
	this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.explosionPool.createMultiple(100, 'explosion');
	this.explosionPool.setAll('anchor.x', 0.5);
	this.explosionPool.setAll('anchor.y', 0.5);
	this.explosionPool.forEach(function (explosion) {
		explosion.animations.add('boom', [ 0, 1, 2, 3, 4, 5, 6, 6, 6 ], 32, false);
	});

	this.cursors = this.input.keyboard.createCursorKeys();  //키보드 입력

	//소리 관련
	this.explosionSFX = this.add.audio('explosion');
	this.playerExplosionSFX = this.add.audio('playerExplosion');
	this.enemyFireSFX = this.add.audio('enemyFire');
	this.playerFireSFX = this.add.audio('playerFire');
	this.powerUpSFX = this.add.audio('powerUp');

	//안내문
	this.instructions = this.add.text(this.game.width / 2, this.game.height - 100, 'A키로 마법공격, B로 투석공격(1000포인트 차감)', { font: '20px monospace', fill: '#fff', align: 'center' });
	this.instructions.anchor.setTo(0.5, 0.5);
	this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE; //안내문구 10초간 생성

	this.hp = 40000;
	this.hpText = this.add.text(100, 30, 'HP: ' + this.hp, {font: '30px Arial', fill: '#fff', align: 'center'});
	this.hpText.anchor.setTo(0.5, 0.5);

	this.score = 0;
	this.scoreText = this.add.text(this.game.width-100, 30, 'POINT: ' + this.score, {font: '30px Arial', fill: '#fff', align: 'center'});
	this.scoreText.anchor.setTo(0.5, 0.5);
},

  update: function () {
	this.physics.arcade.overlap(this.rampart, this.enemyPool, this.rampartAttack, null, this);
	this.physics.arcade.overlap(this.rampart, this.skullWarriorPool, this.rampartAttack, null, this);
	this.physics.arcade.overlap(this.rampart, this.skullPool, this.rampartAttack, null, this);
	this.physics.arcade.overlap(this.rampart, this.saverPool, this.rampartAttack, null, this);
	this.physics.arcade.overlap(this.rampart, this.paladinPool, this.rampartAttack, null, this);
	this.physics.arcade.overlap(this.rampart, this.broadaxPool, this.rampartAttack, null, this);

	this.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this); 
	this.physics.arcade.overlap(this.bulletPool, this.skullWarriorPool, this.enemyHit, null, this); 
	this.physics.arcade.overlap(this.bulletPool, this.skullPool, this.enemyHit, null, this);
	this.physics.arcade.overlap(this.bulletPool, this.saverPool, this.enemyHit, null, this);
	this.physics.arcade.overlap(this.bulletPool, this.paladinPool, this.enemyHit, null, this);
	this.physics.arcade.overlap(this.bulletPool, this.broadaxPool, this.enemyHit, null, this);

	this.physics.arcade.overlap(this.stonePool, this.enemyPool, this.stoneAttack, null, this);
	this.physics.arcade.overlap(this.stonePool, this.skullWarriorPool, this.stoneAttack, null, this);
	this.physics.arcade.overlap(this.stonePool, this.skullPool, this.stoneAttack, null, this);
	this.physics.arcade.overlap(this.stonePool, this.saverPool, this.stoneAttack, null, this);
	this.physics.arcade.overlap(this.stonePool, this.paladinPool, this.stoneAttack, null, this);
	this.physics.arcade.overlap(this.stonePool, this.broadaxPool, this.stoneAttack, null, this);

	this.physics.arcade.overlap(this.player, this.starPool, this.playerGetStar, null, this);
	this.physics.arcade.overlap(this.player, this.diamondPool, this.playerGetDiamond, null, this);
	this.physics.arcade.overlap(this.player, this.firstAidPool, this.playerGetFirstAid, null, this);

	// 기본 적군 생성
	if(this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
		this.nextEnemyAt = this.time.now + this.enemyDelay;
		var enemy = this.enemyPool.getFirstExists(false);
		enemy.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 10); //Math.random()을 쓰지않고 게임에 내장된 rnd를 이용, 5방맞아야 죽는듯
		enemy.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		enemy.play('move');
	}

	// 해골 전사 생성
	if(this.nextSkullWarriorAt < this.time.now && this.skullWarriorPool.countDead() > 0) {
		this.nextSkullWarriorAt = this.time.now + this.skullWarriorDelay;
		var skullWarrior = this.skullWarriorPool.getFirstExists(false);
		skullWarrior.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 5);
		skullWarrior.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		skullWarrior.play('move');
	}

	// 해골 생성
	if(this.nextSkullAt < this.time.now && this.skullPool.countDead() > 0) {
		this.nextSkullAt = this.time.now + this.skullDelay;
		var skull = this.skullPool.getFirstExists(false);
		skull.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 5);
		skull.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		skull.play('move');
	}

	// 세이버 생성
	if(this.nextSaverAt < this.time.now && this.saverPool.countDead() > 0) {
		this.nextSaverAt = this.time.now + this.saverDelay;
		var saver = this.saverPool.getFirstExists(false);
		saver.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 30);
		saver.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		saver.play('move');
	}

	// 팔라딘 생성
	if(this.nextPaladinAt < this.time.now && this.paladinPool.countDead() > 0) {
		this.nextPaladinAt = this.time.now + this.paladinDelay;
		var paladin = this.paladinPool.getFirstExists(false);
		paladin.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 20);
		paladin.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		paladin.play('move');
	}

	// 도끼병 생성
	if(this.nextBroadaxAt < this.time.now && this.broadaxPool.countDead() > 0) {
		this.nextBroadaxAt = this.time.now + this.broadaxDelay;
		var broadax = this.broadaxPool.getFirstExists(false);
		broadax.reset(this.game.width, this.rnd.integerInRange(20, this.game.height - 50), 15);
		broadax.body.velocity.x = -this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
		broadax.play('move');
	}

	//플레이어 조작 부분: 이동, 발포
	this.player.body.velocity.x = 0; //평상시엔 이동 0
	this.player.body.velocity.y = 0;
	
	if(this.cursors.up.isDown) { //상하 이동
		this.player.play('move');
		this.player.body.velocity.y = -this.player.speed;
	}
	else if(this.cursors.down.isDown) {
		this.player.play('move');
		this.player.body.velocity.y = this.player.speed;
	}

	//모바일 터치 부분
    if(this.input.activePointer.isDown&&this.input.activePointer.y < this.game.height/2&&this.physics.arcade.distanceToPointer(this.player) > 30) { //눌러 진 점에서 30px거리까진 이동 중지
    	this.player.play('move');
    	this.player.body.velocity.y = -this.player.speed;
    }
    else if(this.input.activePointer.isDown&&this.input.activePointer.y>this.game.height/2&&this.physics.arcade.distanceToPointer(this.player)>30) {
    	this.player.play('move');
    	this.player.body.velocity.y = this.player.speed;
    }
	if(this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.activePointer.isDown) { //A키나 마우스 포인트가 눌리면 fire 함수 호출
		if(this.returnText && this.returnText.exists) { 
			this.quitGame();
		}
		else {
			this.fire();
		}
	}
	if(this.input.keyboard.isDown(Phaser.Keyboard.B)) { //B키를 누르면 bomb 함수 호출
		if(this.returnText && this.returnText.exists) { 
			this.quitGame();
		}
		else {
			this.stone();
		}
	}
	if(this.instructions.exists && this.time.now > this.instExpire) {
		this.instructions.destroy(); //안내문구 사라진다
	}
	if(this.showReturn && this.time.now > this.showReturn) { //게임끝난후 해당 문구 출력
		this.returnText = this.add.text( this.game.width / 2, this.game.height / 2 + 20, 'A키 또는 Click하여 진행하여 주십시오', { font: '16px sans-serif', fill: '#fff'} );
		this.returnText.anchor.setTo(0.5, 0.5);
		this.showReturn = false;
	}
 },
 
 fire: function(){
	if(!this.player.alive || this.nextShotAt > this.time.now) { //생존중일때 and 100ms간격으로만 총알 발사
		return;
	}
	if(this.bulletPool.countDead() === 0) {
		return;
	}
	this.nextShotAt = this.time.now + this.shotDelay;
	this.playerFireSFX.play();
	this.player.play('attack');

	var bullet = this.bulletPool.getFirstExists(false); //pool에서 첫번째 총알을 담는다
	bullet.reset(this.player.x + 20, this.player.y); //플레이이어 앞부분에서 총알발사 위치
	bullet.body.velocity.x = 500;
 },

stone: function () {
	if(!this.player.alive) { //생존중일때 돌탄 발사
		return;
	}
	if(this.stonePool.countDead() === 0) {
		return;
	}
	if(this.score >= 1000) {
		this.score-=1000;
		this.scoreText.text = 'POINT: ' + this.score;

		var stone = this.stonePool.getFirstExists(false);
		stone.reset(this.player.x + 20, this.player.y);
		stone.play('hit', 10, true, true);
		stone.body.velocity.x = 200;
	}
 },

 rampartAttack: function(rampart, enemy) {
 	enemy.play('attack');
 	enemy.body.velocity.x = 0;
 	this.damageHp(1);
	//bullet.kill();
	//this.damageEnemy(enemy, BasicGame.BULLET_DAMAGE);
 },

 enemyHit: function (bullet, enemy) {
	bullet.kill();
	this.damageEnemy(enemy, BasicGame.BULLET_DAMAGE);
 },

 stoneAttack: function (stone, enemy) { //돌탄과 충돌시 모두사망
 	enemy.kill();

 	this.explode(enemy);
 	this.explosionSFX.play(); 
 	this.spawnStar(enemy);
 	this.spawnDiamond(enemy);
 	this.addToScore(enemy.reward);
 },

 damageEnemy: function (enemy, damage) { 
 	enemy.damage(damage); 

 	if (enemy.alive) { 	
 		enemy.play('hit'); 
 	}
 	else { 
 		this.explode(enemy); //적기 체력이 다닳아야 폭발한다
 		this.explosionSFX.play(); 
 		this.spawnStar(enemy);
 		this.spawnDiamond(enemy);
 		this.spawnFirstAid(enemy);
 		this.addToScore(enemy.reward); //폭발시 점수 지급
 	} 
 	
 },

 explode: function (sprite) {
 	if(this.explosionPool.countDead() === 0) { 
  		return; 
  	} 

 	var explosion = this.explosionPool.getFirstExists(false); 
 	explosion.reset(sprite.x, sprite.y); 
 	explosion.play('boom', 15, false, true);
 	explosion.body.velocity.x = sprite.body.velocity.x; 
 	explosion.body.velocity.y = sprite.body.velocity.y; 
 },

  damageHp: function (damage) {
 	this.hp -= damage;
 	this.hpText.text = 'HP: ' + this.hp;
	if(this.hp <= 0) {
		this.enemyPool.destroy();
		this.skullWarriorPool.destroy();
		this.skullPool.destroy();
		this.saverPool.destroy();
		this.paladinPool.destroy();
		this.broadaxPool.destroy();
		this.displayEnd(false);
	}
 },

 addToScore: function (score) {
 	this.score += score;
 	this.scoreText.text = 'POINT: ' + this.score;
	if(this.score >= 200000) {
		this.enemyPool.destroy();
		this.skullWarriorPool.destroy();
		this.skullPool.destroy();
		this.saverPool.destroy();
		this.paladinPool.destroy();
		this.broadaxPool.destroy();
		this.displayEnd(true);
	}
 },

 playerGetStar: function (player, star) {
 	this.addToScore(star.reward); 
 	star.kill(); 
 	this.powerUpSFX.play();
 },

 playerGetDiamond: function (player, diamond) {
 	this.addToScore(diamond.reward); 
 	diamond.kill(); 
 	this.powerUpSFX.play();
 },

 playerGetFirstAid: function (player, firstAid) {
 	this.addToScore(firstAid.reward); 
 	firstAid.kill(); 
 	this.powerUpSFX.play();
 	this.hp += 1500;
 	this.hpText.text = 'HP: ' + this.hp;
 },

 spawnStar: function (enemy) { 
	if (this.starPool.countDead() === 0) { 
		return; 
	}

	if (this.rnd.frac() < enemy.dropRate) {
		var star = this.starPool.getFirstExists(false);
		star.reset(30, this.rnd.integerInRange(20, this.game.height - 20));
	}
 },

 spawnDiamond: function (enemy) { 
	if (this.diamondPool.countDead() === 0) { 
		return; 
	}

	if (this.rnd.frac() < enemy.dropRate) {
		var diamond = this.diamondPool.getFirstExists(false);
		diamond.reset(30, this.rnd.integerInRange(20, this.game.height - 20));
	}
 },

 spawnFirstAid: function (enemy) { 
	if (this.firstAidPool.countDead() === 0) { 
		return; 
	}

	if (this.rnd.frac() < enemy.dropRate) {
		var firstAid = this.firstAidPool.getFirstExists(false);
		firstAid.reset(30, this.rnd.integerInRange(20, this.game.height - 20));
	}
 },

 displayEnd: function (win) { 
	if (this.endText && this.endText.exists) {
		return; 
	}

	var msg = win ? '성을 지켰습니다!' : '성이 파괴되었어요..'; 
	this.endText = this.add.text( 
	this.game.width / 2, this.game.height / 2 - 60, msg, {font: '72px serif', fill: '#fff'}); 
	this.endText.anchor.setTo(0.5, 0);
	this.showReturn = this.time.now + BasicGame.RETURN_MESSAGE_DELAY;
 },

 render: function() { //디버그 용도
	//this.game.debug.body(this.bulletPool);
	//this.game.debug.body(this.enemyPool);
	//this.game.debug.body(this.player);
 },

 quitGame: function (pointer) {
	this.player.destroy();
	this.rampart.destroy();
	this.enemyPool.destroy();
	this.bulletPool.destroy();
	this.enemyPool.destroy();
	this.skullWarriorPool.destroy();
	this.skullPool.destroy();
	this.paladinPool.destroy();
	this.broadaxPool.destroy();
	this.explosionPool.destroy(); 
	this.instructions.destroy();
	this.hpText.destroy();
	this.scoreText.destroy();
	this.endText.destroy();
	this.returnText.destroy();
	this.starPool.destroy();
	this.diamondPool.destroy();
	this.firstAidPool.destroy();
	this.state.start('MainMenu'); //메인화면으로
  }
};
