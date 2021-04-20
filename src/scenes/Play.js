class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }
    preload(){

        this.load.image('sky','assets/sky.png');
        this.load.image('bullet','assets/bullets.png');
        this.load.image('bird','assets/bird.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //this.load.audio('sfx_explosion', './assets/explosion38.wav');
        //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_gunshot','./assets/gunshot.mp3');
        this.load.audio('sfx_birdhit', './assets/bird_hit.wav');
        this.load.audio('bgMusic','/assets/bgm.wav');
    }
    create(){
        // background music
        this.backgroundMusic = this.sound.add('bgMusic',{loop:true});

        this.backgroundMusic.play();

        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.sky = this.add.tileSprite(
            0,0,640,480, 'sky'
        ).setOrigin(0,0);

        this.p1Bullet = new Bullet(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'bullet'
        );

        this.bird1 = new Bird(
            this,
            Math.floor((Math.random() * (640-borderPadding*2))),
            borderUISize*4,
            'bird',
            0, 30, 2
        );

        this.bird2 = new Bird(
            this,
            Math.floor((Math.random() * (640-borderPadding*2))),
            borderUISize*6 + borderUISize*2,
            'bird',
            0,20, 1
        );

        this.bird3 = new Bird(
            this,
            Math.floor((Math.random() * (640-borderPadding*2))),
            borderUISize*8 + borderUISize*1,
            'bird',
            0,10, 2
        );

        this.p1Score = 0;
        //  this.add.existing(this.p1Rocket);

        //green UI background
        this.add.rectangle(0,borderUISize + borderPadding - 20, 
                             game.config.width,
                             borderUISize*2, 0x42bcf5).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
        
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor:'#73CCF8',
            color: '#fff',
            align: 'center',
            padding: {
                top: 5,
                bottom:5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize - 10 + borderPadding*2, this.p1Score, scoreConfig);
        scoreConfig.fixedWidth = 0;
        this.gameOver= false;
        
        //60-second

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor:'#73CCF8',
            color: '#fff',
            align: 'center',
            padding: {
                top:5,
                bottom:5,
            },
            fixedWidth: 200
        }
        this.timeLeft = this.add.text(game.config.width - (200 + borderUISize + borderPadding), 
        borderUISize + 15, 
        'Timer: ' + Math.round(this.clock.getRemainingSeconds()),
         timeConfig);
            
    }

        
    update() {
        this.sky.tilePositionX -= 0.5;
        if(!this.gameOver){
            this.p1Bullet.update();
            this.bird1.update();
            this.bird2.update();
            this.bird3.update();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        // checkCollision
        if(this.checkCollision(this.p1Bullet, this.bird3)){
            this.p1Bullet.reset();
            this.birdKill(this.bird3);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 500);
            
        }
        if(this.checkCollision(this.p1Bullet, this.bird2)){
            this.p1Bullet.reset();
            this.birdKill(this.bird2);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 2000);
            
        }
        if(this.checkCollision(this.p1Bullet, this.bird1 )){
            this.p1Bullet.reset();
            this.birdKill(this.bird1);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
            
        }
        this.timeLeft.text = 'Timer: ' + Math.round(this.clock.getRemainingSeconds());

    }
    checkCollision(bullet,bird){
        if(bullet.x < bird.x + bird.width && 
            bullet.x + bullet.width > bird.x && 
            bullet.y < bird.y + bird.height &&
            bullet.height + bullet.y > bird. y){
                return true;
            }else{
                return false;
            }
    }

    birdKill(bird){
        bird.alpha = 0;
        let boom = this.add.sprite(bird.x,bird.y,'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete',() => {
            bird.reset();
            bird.alpha = 1;
            boom.destroy();
        });
        this.p1Score += bird.pointValue;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_birdhit');
    }
    
    createTime(timeLeft, timeAdd){ 
        this.clock = this.time.delayedCall(timeLeft + timeAdd, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }
    
}