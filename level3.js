class Third extends Phaser.Scene {

    constructor() {
        super('third');
    }

    preload() {
        this.load.image("box", "Square.png");
        this.load.image("floor", "Floor.png");
        this.load.image("long", "Long.png");
        this.load.image("rect", "Rectangle.png");
        this.load.image("triangle", "Triangle.png");
        this.load.image("goal", "Goal.png");
    }

    update() {

    }

    create() {
        shapesUsed = 0;
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

        let goalTouch = false;
        let checkVisible = true;

        let fakeGoal = this.matter.add.image(1000, 540, 'goal')
            .setStatic(true)
            .setSensor(true);

        //Move to 1000, 780 on active
        let goal = this.matter.add.image(1000, 1780, 'goal')
            .setStatic(true)
            .setSensor(true)
            .setTint(0x000000)
            .setOnCollideActive(() => goalTouch = true);

        let midCheck = this.add.text(800, 20, "CHECKING...")
            .setFontSize(60)
            .setVisible(false);

        let check = this.add.text(800, 20, "CHECK")
            .setFontSize(60)
            .setInteractive()
            .on('pointerdown', () => {
                check.setVisible(false);
                midCheck.setVisible(true);
                this.time.delayedCall(2000, () => {
                    goal.setY(540);
                    fakeGoal.setY(2777);
                });

                this.time.delayedCall(2060, () => {
                    if (goalTouch == true && checkVisible == true) {
                        this.scene.start('res3');
                    }
                    check.setVisible(true);
                    midCheck.setVisible(false);
                    fakeGoal.setY(540);
                    goal.setY(1780);
                });
            });

        let boxNum = 7;
        let rectNum = 4;
        let longNum = 2;

        this.matter.world.on('drag', () => {
            check.setY(2000);
            checkVisible = false;
        })

        this.matter.world.on('dragend', () => {
            this.time.delayedCall(2000, () => {
                check.setY(20);
                checkVisible = true;
            });
        })

        let boxText = this.add.text(90, 100, boxNum)
            .setFontSize(35);

        let squareSpawn = this.add.image(100, 50, 'triangle')
            .setScale(0.3)
            .setInteractive()
            .on('pointerdown', () => {
                if (boxNum > 0) {
                    this.matter.add.image(100, 50, 'triangle')
                        .setScale(0.3)
                        .setTrapezoid(87, 75, 1)
                        .setOnCollide(() => console.log("Box collision"))
                        .setSleepEvents(true, true);
                    boxNum -= 1;
                    shapesUsed++;
                    boxText.setText(boxNum);
                }
            });

        let rectText = this.add.text(250, 100, rectNum)
            .setFontSize(35);

        let RectSpawn = this.add.image(250, 50, 'rect')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (rectNum > 0) {
                    this.matter.add.image(250, 50, 'rect')
                        .setScale(0.25)
                        .setSleepEvents(true, true);
                    rectNum -= 1;
                    shapesUsed++;
                    rectText.setText(rectNum);
                }
            });


        let longText = this.add.text(470, 100, longNum)
            .setFontSize(35);

        let longSpawn = this.add.image(475, 50, 'long')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (longNum > 0) {
                    this.matter.add.image(475, 50, 'long')
                        .setScale(0.25)
                        .setSleepEvents(true, true);
                    longNum -= 1;
                    shapesUsed++;
                    longText.setText(longNum);
                }
            });

        this.add.text(1780, 10, "Reset")
            .setFontSize(40)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('third');
            });
    }
}

class Results3 extends Phaser.Scene {

    constructor() {
        super('res3');
    }

    preload() {
        this.load.image("box", "Square.png");
        this.load.image("floor", "Floor.png");
        this.load.image("long", "Long.png");
        this.load.image("rect", "Rectangle.png");
        this.load.image("triangle", "Triangle.png");
        this.load.image("goal", "Goal.png");
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

        this.add.text(620, 40, "RESULTS")
            .setFontSize(170);

        this.add.text(620, 440, "Shapes Used: " + shapesUsed)
            .setFontSize(50);

        let stars = this.add.text(610, 540, "")
            .setFontSize(100);

        if (shapesUsed > 11) {
            stars.setText("SCORE: ⭐☆☆");
        }
        else if (shapesUsed > 9) {
            stars.setText("SCORE: ⭐⭐☆");
        }
        else {
            stars.setText("SCORE: ⭐⭐⭐");
        }

        this.add.text(670, 880, "Next")
            .setFontSize(100)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('win');
            });
    }
}

