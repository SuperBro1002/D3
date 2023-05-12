class Second extends Phaser.Scene {

    constructor() {
        super('second');
    }

    preload() {
        this.load.image("box", "Square.png");
        this.load.image("floor", "Floor.png");
        this.load.image("long", "Long.png");
        this.load.image("rect", "Rectangle.png");
        this.load.image("triangle", "Triangle.png");
    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        //this.add.text(50,50,"Test:" + timerseconds);

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

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

        this.matter.world.setBounds();

        this.matter.add.mouseSpring();

        const group = this.matter.world.nextGroup(true);

        // const bridge = this.matter.add.stack(160, 290, 23, 1, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
        //     collisionFilter: { group: group },
        //     chamfer: 5,
        //     density: 0.005,
        //     frictionAir: 0.05
        // }));

        // this.matter.add.chain(bridge, 0.3, 0, -0.3, 0, {
        //     stiffness: 1,
        //     length: 0,
        //     render: {
        //         visible: false
        //     }
        // });


        let boxNum = 0;
        let rectNum = 0;
        let longNum = 0;

        let squareSpawn = this.add.image(100, 50, 'box')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (boxNum < 5) {
                    this.matter.add.image(100, 50, 'box')
                        .setScale(0.25);
                    boxNum += 1;
                    this.add.text(200, 200, boxNum);
                }
            });


        let longSpawn = this.add.image(475, 50, 'long')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (longNum < 2) {
                    this.matter.add.image(475, 50, 'long')
                        .setScale(0.25);
                    longNum += 1;
                    //
                }
            });

        this.add.text(1820,40,"Reset")
        .setInteractive()
        .on('pointerdown', () => {
            this.gotoScene('first');
        });





    }


}



