
class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
      //upload audio
      this.load.audio('sfx_enter','./assets/enter.wav');
      this.load.image('menu_back','./assets/menu.png');
    }
    create(){
        this.background = this.add.tileSprite(0,0,640,480,'menu_back').setOrigin(0,0);
        let menuConfig = {
            fontFamily: 'Inconsolata',
            fontSize: '25px',
            backgroundColor:'#fff',
            color: '#34bdeb',
            align: 'right',
            padding: {
                top: 5,
                bottom:5,
            },
            fixedWidth: 0
        }
        //menu text

        this.add.text(game.config.width/2, game.config.height/3,
             'Hunting Games 2021',
              menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#fff';
        menuConfig.color = '#34ebc0';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
            
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 40000    
          }
          this.sound.play('sfx_enter');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 30000    
          }
          this.sound.play('sfx_enter');
          this.scene.start('playScene');    
        }
    }
}