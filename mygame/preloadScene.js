class preloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'preloadScene' });
    }

    preload() {

        this.load.spritesheet('gen', 'assets/rabbit-blank-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wolf', 'assets/wolf.png', { frameWidth: 64, frameHeight: 64 });

        this.load.image("level1", "assets/1_Generic_32x32.png");
        this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
        this.load.image("livingroom1", "assets/Room_Builder_32x32.png");
        this.load.image("gameover","assets/gameover.png")
        this.load.image("youwon","assets/youwon.png")

        this.load.image("level2", "assets/1_Generic_32x32.png");
        this.load.image("bedroom", "assets/4_Bedroom_32x32.png");
        this.load.image("bedroom2", "assets/Room_Builder_32x32.png");

        this.load.image("level3", "assets/1_Generic_32x32.png");
        this.load.image("kitchen", "assets/4_Bedroom_32x32.png");
        this.load.image("kitchen2", "assets/Room_Builder_32x32.png");

        this.load.image("level4", "assets/1_Generic_32x32.png");
        this.load.image("garden", "assets/village32x32.png");

        this.load.audio("bgmusic", "assets/bg_music.mp3");
        this.load.audio("hit", "assets/hitsound.mp3");
        this.load.audio("gameoverSnd", "assets/gameover.mp3");
        this.load.audio("youwonSnd", 'assets/youwon.mp3');

    }


    create() {

        this.music = this.sound.add("bgmusic", { loop: true }).setVolume(0.06);
        // this.music = this.sound.add("preloadmusic",{loop: true}).setVolume(0.06);

        this.music.play();



        var spaceDown = this.input.keyboard.addKey('SPACE');
        this.anims.create({
            key: 'gen-up',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 105, end: 112 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-left',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 118, end: 125 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-down',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 131, end: 138 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'gen-right',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 144, end: 151 }),
            frameRate: 5,
            repeat: -1
        });
        /////
        this.anims.create({
            key: 'wolf-up',
            frames: this.anims.generateFrameNumbers('wolf',
                { start: 105, end: 112 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'wolf-left',
            frames: this.anims.generateFrameNumbers('wolf',
                { start: 118, end: 125 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'wolf-down',
            frames: this.anims.generateFrameNumbers('wolf',
                { start: 131, end: 138 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'wolf-right',
            frames: this.anims.generateFrameNumbers('gen',
                { start: 144, end: 151 }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.start("instruction1");

        ///////////



    }
}