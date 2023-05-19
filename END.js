class Win extends Phaser.Scene {

    constructor() {
        super('win');
    }

    create() {
        this.add.text(630, 400, "YOU WIN!")
        .setFontSize(150);
    }
    
}