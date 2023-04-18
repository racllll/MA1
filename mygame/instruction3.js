class instruction3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction3' });
    }


    preload(){
    // intro image
    this.load.image('instruction3', 'assets/instruction3.png');

    }

    create() {
        this.add.image(0, 0, 'instruction3').setOrigin(0, 0);

        console.log("This is instruction3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto lvl1task");
        this.scene.start("level1");
        }, this );
    
    }
    }