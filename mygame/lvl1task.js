class lvl1task extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'lvl1task' });
    }


    preload(){
    // intro image
    this.load.image('lvl1task', 'assets/lvl1task.png');

    }

    create() {
        this.add.image(0, 0, 'lvl1task').setOrigin(0, 0);

        console.log("This is lvl1task");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.start("level1");
        }, this );
    
    }
    }