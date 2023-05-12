class First extends Phaser.Scene {

    constructor() {
        super('first');
    }

    preload() {
        this.load.image("box", "Square.png");
        this.load.image("floor", "Floor.png");
        this.load.image("long", "Long.png");
        this.load.image("rect", "Rectangle.png");
        this.load.image("triangle", "Triangle.png");
    }

    // update() {
    //     let timerseconds = 0;
    //     let timerevent = 0;
    //     let stuff = this.add.text(50,50, timerseconds);

    //     if (timerseconds < 6000000) {
    //         timerevent = Phaser.Math.CeilTo(this.time.now, [3]);
    //         timerseconds = timerevent / 1000;
    //         console.log.apply(timerseconds);
    //          stuff.setText(timerseconds);
    //     }
    // }

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

        let RectSpawn = this.add.image(250, 50, 'rect')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (rectNum < 4) {
                    this.matter.add.image(250, 50, 'rect')
                        .setScale(0.25);
                    rectNum += 1;
                    //
                }
            })
            .on('pointerup', () => {
                this.add.text(700,700,"TEST");
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





        // let floor = this.matter.add.image(620, 1220, 'floor');
        // floor.setStatic(true);

        // this.matter.add.rectangle(50, 270, 50, 50,{
        //     isStatic: true
        // });

        // const stack = this.matter.add.stack(250, 50, 8, 6, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 50, 50, Phaser.Math.Between(20, 40)));

        // const stack2 = this.matter.add.stack(950, 50, 4, 2, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 100, 50, Phaser.Math.Between(20, 40)));

        // const stack3 = this.matter.add.stack(250, 50, 2, 2, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.trapezoid(x, y, 50, 50, 1));


        // this.matter.add.rectangle(30, 990, 220, 380, {
        //     isStatic: true,
        //     chamfer: { radius: 20 }
        // });

        // this.matter.add.rectangle(1070, 990, 220, 380, {
        //     isStatic: true,
        //     chamfer: { radius: 20 }
        // }),

        //     this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
        //         pointA: { x: 140, y: 800 },
        //         pointB: { x: -25, y: 0 }
        //     });

        // this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
        //     pointA: { x: 960, y: 800 },
        //     pointB: { x: 25, y: 0 }
        // });




    }


}



