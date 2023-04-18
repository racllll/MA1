
class level4 extends Phaser.Scene {
    constructor() {
        super({ key: 'level4' });
        // this.mapcollected = 0


    }
    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }
    preload() {


        //step1.load Json
        this.load.spritesheet('gen', 'assets/rabbit-blank-64x64.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wolf', 'assets/wolf.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wolf2', 'assets/wolf.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('wolf3', 'assets/wolf.png', { frameWidth: 64, frameHeight: 64 });


        this.load.tilemapTiledJSON("level4", "assets/level4.tmj");

        this.load.image("garden", "assets/1_Generic_32x32.png");
        this.load.image("garden2", "assets/village32x32.png");
        this.load.image("map", "assets/map.png");


        this.load.image("heart", "assets/heart.png");

        this.load.audio("hit", "assets/hitsound.mp3");
        this.load.audio("collect", "assets/collectsound.ogg");
        this.load.audio("gameoverSnd", "assets/gameover.mp3");


    } // end of preload //

    create() {
        window.heart = 3
        console.log("level4")


        this.playerhitsnd = this.sound.add("hit").setVolume(0.5)
        this.playercollectsnd = this.sound.add("collect").setVolume(0.5)


        //step3-create the map from main
        var map = this.make.tilemap({ key: 'level4' });

        //step4 load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let level4Tiles = map.addTilesetImage("1_Generic_32x32", "garden");
        let garden2Tiles = map.addTilesetImage("village32x32", "garden2");


        // Step 5  create an array of tiles
        let tilesArray = [
            level4Tiles,
            garden2Tiles,
        ];

        // Step 6  Load in layers by layers
        this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
        this.itemLayer2 = map.createLayer("itemLayer2", tilesArray, 0, 0);
        this.itemLayer3 = map.createLayer("itemLayer3", tilesArray, 0, 0);


        var start = map.findObject("objectLayer", obj => obj.name === "start");

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(start.x, start.y - 50, 'gen');

        //collcet maps
        this.map = this.physics.add.sprite(601, 216, 'map');
        this.map2 = this.physics.add.sprite(32, 304, 'map');
        this.map3 = this.physics.add.sprite(493, 256, 'map');

        window.player = this.player

        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
        // this.time.addEvent({
        //     delay: 1000,
        //     callback: this.moveDownUp,
        //     callbackScope: this,
        //     loop: false,
        // });


        this.wolf = this.physics.add.sprite(600, 100, "wolf").play("wolf-down").setScale(0.7);
        this.wolf2 = this.physics.add.sprite(100, 200, "wolf").play("wolf-down").setScale(0.7);
        this.wolf3 = this.physics.add.sprite(400, 200, "wolf").play("wolf-down").setScale(0.7);


        // // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // // camera follow playe
        this.cameras.main.startFollow(this.player);

        this.itemLayer3.setCollisionByExclusion(-1, true)
        this.itemLayer2.setCollisionByExclusion(-1, true)
        // this.itemLayer.setCollisionByExclusion(-1, true)

        this.player.setCollideWorldBounds(true);//don't go out of the the this.map
        this.physics.add.collider(this.player, this.itemLayer3);
        this.physics.add.collider(this.player, this.itemLayer2);
        // this.physics.add.collider(this.player, this.itemLayer);
//overlap
        this.physics.add.overlap(
            this.player,
            [this.wolf, this.wolf2, this.wolf3],
            this.wolfCaught,
            null,
            this
        );

        //map
        this.physics.add.overlap(
            this.player,
            [this.map, this.map2, this.map3],
            this.collectmap,
            null,
            this
        );

        this.player.setCollideWorldBounds(true);//don't go out of the the this.map
        


        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height

        this.physics.add.overlap(this.map, this.player,this.collectmap, null, this);  
        this.physics.add.overlap(this.map2, this.player,this.collectmap, null, this);    
        this.physics.add.overlap(this.map3, this.player,this.collectmap, null, this);    

        // create life
        this.heart1 = this.add.image(50, 530, 'heart').setScrollFactor(0);
        this.heart2 = this.add.image(120, 530, 'heart').setScrollFactor(0);
        this.heart3 = this.add.image(190, 530, 'heart').setScrollFactor(0);

        if (window.heart === 3) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);

        } else if (window.heart === 2) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(false);

        } else if (window.heart === 1) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        } else if (window.heart === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        }
    } // end of create //

    update() {
        {
            if (window.map >= 3) 
                this.youwonScene()
        }

        this.physics.moveToObject(this.wolf, this.player, 30, 3000)
        this.physics.moveToObject(this.wolf2, this.player, 30, 3500)
        this.physics.moveToObject(this.wolf3, this.player, 30, 3500)
       
        // if (this.player.x > 613 && this.player.x < 640 && 
        //     this.player.y < 383 && this.player.y > 343) {
        //     if(window.glass>=4){
        //         this.level3() 
        //     }
        // }


        if (this.player.x > 526 && this.player.x < 492 &&
            this.player.y < 69) {
            this.level4()
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('gen-left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('gen-right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('gen-up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('gen-down', true);
        }
        else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }


    } // end of update // 
    collectmap(player, map) {
        console.log("collect map");
        this.mapcollected++
        this.playercollectsnd.play();
        // this.mapCount.setText("map:" + window.map);
        map.disableBody(false, true);

    }
    wolfCaught(player, enemy) {
        console.log("hit by wolf");
        //disable wolf after overlap
        enemy.disableBody(false, true);
        //play a sound
        this.playerhitsnd.play();
        // Shake screen
        this.cameras.main.shake(150);

        window.heart--
        console.log(window.heart)

        if (window.heart === 3) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);

        } else if (window.heart === 2) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(false);

        } else if (window.heart === 1) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        } else if (window.key === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);
        }
        if (window.heart == 0) {
            console.log("jumpingtogameoverScence")
            this.scene.start("gameoverScene");
            // this.gameoverSnd.play();
            }
        //         if (window.mapcollected == 3) {
        //             console.log("jumpingtoyouwonScene")
        //             this.scene.start("youwonScene");
        //     //    this.gameoverSnd.play();


      
    }
    collectmap(player, map) {
        map.disableBody(true, true);
        window.map++
    
    }
    collectmap(player, map2) {
        map2.disableBody(true, true);
        window.map++
    
    }
    collectmap(player, map3) {
        map3.disableBody(true, true);
        window.map++
    
    }
    youwonScene() {
        console.log("youwonScene");
        if(window.map>=3){
        this.scene.start("youwonScene");
    }

}







//////////// end of class world ////////////////////////


}