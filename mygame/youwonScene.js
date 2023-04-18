class youwonScene extends Phaser.Scene {

    constructor() {
        super({ key: 'youwonScene' });
    }

    preload() {
        this.load.image('youwon', 'assets/youwon.png');
        this.load.audio('youwonSnd', 'assets/youwonSnd.mp3');

    }

    create() {

        this.add.image(0, 0, 'youwon').setOrigin(0, 0);
        this.game.sound.stopAll()
        this.sound.add('youwonSnd').setVolume(0.2).setLoop(false).play()



        console.log("This is winScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');



        // On spacebar event, call the world scene
        spaceDown.on('down', function () {
            this.scene.start("instruction1");
        }, this);


    }

}

