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

    update() {

    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

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

        this.matter.add.mouseSpring({ length: 1, stiffness: 1, angularStiffness: 0.9 });

        const group = this.matter.world.nextGroup(true);

        let resting = true;
        let holding = false;
        let sensAct = false;
        let goalProg = 0;

        //pointer down set holding to true, pointer up wait 2 seconds and set holding to false
        //

        let goal = this.matter.add.rectangle(1000, 500, 1000, 2, {
            isStatic: true,
            isSensor: true
        });

        let sens = this.add.text(800, 800, "");
        let goalTest = this.add.text(300, 300, "");

        //IDEA
        // When pointer up delay check, loop collision sensor thru array 
        //Might need to remover snesor prop and just use normal collision
        let play = this.add.text(700, 500, "")
        this.matter.world.on('collisionstart', event => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;
                //if (resting = true) {
                if (pairs[i].isSensor) {
                    let goalBar;
                    let Shape;
                    if (bodyA.isSensor) {
                        Shape = bodyB;
                        goalBar = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        Shape = bodyA;
                        goalBar = bodyB;
                    }
                    sens.setText("Sensor Activated. Resting is true " + resting);
                    sensAct = true;
                    play.setText("Is a sensor");
                }
                else if (pairs[i].isSensor == false) {
                    play.setText("Not a sensor");
                }
                // }
            }
        });

        this.matter.world.on('collisionend', event => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;
                if (pairs[i].isSensor) {
                    sens.setText("Sensor NOT Activated.");
                    sensAct = false;
                }
            }
        });

        let testy = this.add.text(550, 500, '');

        let boxNum = 5;
        let rectNum = 4;
        let longNum = 2;
        let shapeHolder = [];
        let p = 0;
        this.targets = this.add.group();

        let boxText = this.add.text(90, 100, boxNum)
            .setFontSize(35);

        // let squareSpawn = this.add.image(100, 50, 'box')
        //     .setScale(0.25)
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         if (boxNum > 0) {
        //             /* shapeHolder[p] =  */this.matter.add.image(100, 50, 'box')
        //                 .setScale(0.25)
        //                 .setSleepEvents(true, true);
        //             boxNum -= 1;
        //             boxText.setText(boxNum);
        //             p++;
        //         }
        //     });

        let holdCheck = this.add.text(1000, 1000, '');
        let delayCheck = this.add.text(1500, 800, "");

        this.input.on('pointerdown', pointer => {
            if (pointer.leftButtonDown()) {
                holding = true;
                resting = false;
                holdCheck.setText("Clicking...");
                delayCheck.setText("Button is down so not resting");
            }
        });

        this.input.on('pointerup', pointer => {
            if (pointer.leftButtonReleased()) {
                this.time.delayedCall(3000, () => {
                    if (pointer.leftButtonDown() == false) {
                        resting = true;
                        holding = false;
                        delayCheck.setText("Button is up, so is resting");
                        if (sensAct == true && holding == false && resting == true) {

                            //this.scene.start('first')
                        }
                        testy.setText(sensAct + '' + holding + '' + resting);
                    }
                    else {
                        resting = false;
                        holding = true;
                        this.time.removeAllEvents();
                        delayCheck.setText("Button is down so not resting");

                    }
                });
                holdCheck.setText("Not clicking...");
            }
        })

        let rectText = this.add.text(250, 100, rectNum)
            .setFontSize(35);

        let RectSpawn = this.add.image(250, 50, 'rect')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (rectNum > 0) {
                    /* shapeHolder[p] =  */ let target = this.matter.add.image(250, 50, 'rect');
                    target.setScale(0.25);
                    target.setSleepEvents(true, true);
                    target.setSleepThreshold(60);
                    rectNum -= 1;
                    rectText.setText(rectNum);
                    this.targets.add(target);
                }
            })
            .on('pointerup', () => {
                this.add.text(700, 700, "TEST");
            });
        this.matter.world.on('sleepstart', (event) => {
            rectText.setText("SLEEEEEEEEEEEP");
        });
        this.matter.world.on('sleepend', (event) => {
            rectText.setText("Awaaaaaake");
        });

     this.matter.world.on('sleepstart', function(event, item){
        if(this.targets.getChildren().some(target => target.body.isSleeping)))
     })

        let longText = this.add.text(470, 100, longNum)
            .setFontSize(35);

        // let longSpawn = this.add.image(475, 50, 'long')
        //     .setScale(0.25)
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         if (longNum > 0) {
        //             /* shapeHolder[p] = */ this.matter.add.image(475, 50, 'long')
        //                 .setScale(0.25)
        //                 .setSleepEvents(true, true);
        //             longNum -= 1;
        //             longText.setText(longNum);
        //             p++;
        //         }
        //     });


        this.add.text(1780, 10, "Reset")
            .setFontSize(40)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('first');
            });

    }


}



