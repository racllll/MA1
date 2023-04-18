class instruction1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction1' });
    }


    preload(){
    // intro image
    this.load.image('instruction1', 'assets/instruction1.png');

    }

    create() {
        this.game.sound.stopAll()
        this.sound.add('bgmusic').setVolume(0.06).setLoop(true).play()
 
        this.add.image(0, 0, 'instruction1').setOrigin(0, 0);

        console.log("This is instruction1");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto instruction2");
        this.scene.start("instruction2");
        }, this );
    
    }
    }