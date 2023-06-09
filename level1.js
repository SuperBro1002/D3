let shapesUsed = 0;

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
        this.load.image("goal", "Goal.png");
    }

    update() {

    }

    create() {

        this.add.text(70, 150, "^ Click and drag shapes ^")
            .setColor('lightgreen')
            .setFontSize(30);

        this.add.text(720, 100, "^ Click here ^ when your structure\nis touching the goal line.")
            .setColor('lightgreen')
            .setFontSize(30);

            this.add.text(720,200, "NOTE: YOU CANNOT WIN THE LEVEL WHILE\nCLICKING/DRAGGING A SHAPE.")
            .setColor('red')
            .setFontSize(30);

        this.add.text(1400, 700, "^ This is the goal line. ^ \nBuild a structure that \nreaches this height ")
            .setColor('lightgreen')
            .setFontSize(30);


        // this.add.text(670, 880, "HI")
        // .setFontSize(100)
        // .setInteractive()
        // .on('pointerdown', () => {
        //     this.scene.start('third');
        // });

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

        let fakeGoal = this.matter.add.image(1000, 680, 'goal')
            .setStatic(true)
            .setSensor(true);

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
                    goal.setY(680);
                    fakeGoal.setY(2777);
                });

                this.time.delayedCall(2060, () => {
                    if (goalTouch == true && checkVisible == true) {
                        this.scene.start('res1');
                    }
                    check.setVisible(true);
                    midCheck.setVisible(false);
                    fakeGoal.setY(680);
                    goal.setY(1780);
                });
            });

        let boxNum = 5;
        let rectNum = 6;
        let longNum = 4;

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

        let squareSpawn = this.add.image(100, 50, 'box')
            .setScale(0.25)
            .setInteractive()
            .on('pointerdown', () => {
                if (boxNum > 0) {
                    this.matter.add.image(100, 50, 'box')
                        .setScale(0.25)
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
                this.scene.start('first');
            });
    }
}

class Results extends Phaser.Scene {

    constructor() {
        super('res1');
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

        if (shapesUsed > 10) {
            stars.setText("SCORE: ⭐☆☆");
        }
        else if (shapesUsed > 7) {
            stars.setText("SCORE: ⭐⭐☆");
        }
        else {
            stars.setText("SCORE: ⭐⭐⭐");
        }

        this.add.text(670, 880, "Next Level")
            .setFontSize(100)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('second');
            });
    }
}

