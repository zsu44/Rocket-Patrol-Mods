
class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    create(){
        let menuConfig = {
            fontFamily: 'Inconsolata',
            fontSize: '25px',
            backgroundColor:'#34bdeb',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom:5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,
             'Hunting Games 2021',
              menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#34ebc0';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          //this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          //this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}