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

        this.add.rectangle(100, 100, 150, 150, 0x757575);
        this.add.rectangle(1000, 100, 150, 150, 0xffff75);
        // let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
        //     .setFontSize(this.s * 2);

        this.matter.world.setBounds();

        this.matter.add.mouseSpring();

        const group = this.matter.world.nextGroup(true);

        const bridge = this.matter.add.stack(160, 290, 15, 1, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        }));
        
        this.matter.add.chain(bridge, 0.3, 0, -0.3, 0, {
            stiffness: 1,
            length: 0,
            render: {
                visible: false
            }
        });
        
        const stack = this.matter.add.stack(250, 50, 6, 3, 0, 0, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 50, 50, Phaser.Math.Between(20, 40)));

        this.matter.add.rectangle(30, 490, 220, 380, {
            isStatic: true,
            chamfer: { radius: 20 }
        }),

        this.matter.add.rectangle(770, 490, 220, 380, {
            isStatic: true,
            chamfer: { radius: 20 }
        }),

        this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
            pointA: { x: 140, y: 300 },
            pointB: { x: -25, y: 0 }
        });

        this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
            pointA: { x: 660, y: 300 },
            pointB: { x: 25, y: 0 }
        });




    }


}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y:0.8
            },
            debug: true,
            debugBodyColor: 0xffffff
        }
    },
    scene: [First,],
    backgroundColor: 0x000000,
});
