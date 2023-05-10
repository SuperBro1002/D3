class First extends Phaser.Scene {

    constructor() {
        super('first');
    }

    preload() {

    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        // this.cameras.main.setBackgroundColor('#444');
        // this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        // this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        // this.add.text(this.w * 0.75 + this.s, this.s)
        //     .setText(this.name)
        //     .setStyle({ fontSize: `${3 * this.s}px` })
        //     .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        // this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
        //     .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
        //     .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        // this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
        //     .setStyle({ fontSize: `${2 * this.s}px` })
        //     .setText("Inventory")
        //     .setAlpha(0);

        this.add.text(this.w - 3 * this.s, this.h - 3 * this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.add.rectangle(100, 100, 150, 150, 0x757575);
        this.add.rectangle(1000, 100, 150, 150, 0xffff75);
        // let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
        //     .setFontSize(this.s * 2);
    }


}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [First,],
    backgroundColor: 0x000000,
});
