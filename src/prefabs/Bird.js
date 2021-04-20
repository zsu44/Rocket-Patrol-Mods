class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue,direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed;
        this.direction = direction;

    }

    update() {
        if(this.direction == 2){
            this.x -= this.movementSpeed;
            if(this.x <= 0 - this.width ) {
                this.reset();
            }
        }
        else{
            this.x += this.movementSpeed;
            if(this.x > game.config.width ) {
                this.reset();
            }
        }
        
    }

    reset() {
        if(this.direction == 2){
            this.x = game.config.width;
        }
        else{
            this.x = 0 - this.width;
        }
        
    }
}