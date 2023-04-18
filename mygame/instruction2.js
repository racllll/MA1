class instruction2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction2' });
    }


    preload(){
    // intro image
    this.load.image('instruction2', 'assets/instruction2.png');

    }

    create() {
        this.add.image(0, 0, 'instruction2').setOrigin(0, 0);

        console.log("This is instruction2");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto intruction3");
        this.scene.start("instruction3");
        }, this );
    
    }
    }