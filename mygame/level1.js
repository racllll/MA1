
class level1 extends Phaser.Scene {
    constructor() {
        super({ key: "level1" });
        this.collectedkey = 0
        this.potioncollected = 0
    }

    preload() {
        //step1.load Json
        this.load.tilemapTiledJSON("nana", "assets/nana.tmj");

        // //step2: Preload any images 
        this.load.image("level1", "assets/1_Generic_32x32.png");
        this.load.image("livingroom", "assets/2_LivingRoom_32x32.png");
        this.load.image("livingroom1", "assets/Room_Builder_32x32.png");
        this.load.image("heart", "assets/heart.png");
        this.load.image("key", "assets/key.png");
        this.load.image("potion", "assets/potion.png")
        

        //collect sound
        this.load.audio("collect", "assets/collectsound.ogg")

    } // end of preload //

    create() {

        console.log("level1")

        this.playercollectsnd = this.sound.add("collect").setVolume(0.5)

        //step3-create the map from main
        var map = this.make.tilemap({ key: 'nana' });

        //step4 load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        //drinkmeoreatme-findkey
        let level1Tiles = map.addTilesetImage("1_Generic_32x32", "level1");
        let livingroomTiles = map.addTilesetImage("2_LivingRoom_32x32", "livingroom");
        let livingroom1Tiles = map.addTilesetImage("Room_Builder_32x32", "livingroom1");

        // Step 5  create an array of tiles
        let tilesArray = [
            level1Tiles,
            livingroomTiles,
            livingroom1Tiles,

        ];

        // Step 6  Load in layers by layers 
        this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
        this.itemLayer4 = map.createLayer("itemLayer4", tilesArray, 0, 0);
        this.itemLayer3 = map.createLayer("itemLayer3", tilesArray, 0, 0);
        this.itemLayer2 = map.createLayer("itemLayer2", tilesArray, 0, 0);
        this.itemLayer1 = map.createLayer("itemLayer1", tilesArray, 0, 0);


        var start = map.findObject("objectLayer", obj => obj.name === "start");
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(start.x, start.y, 'gen');

        //collectitems
        this.key = this.physics.add.sprite(566, 112, 'key');

        //collectpotion
        this.potion2 = this.physics.add.sprite(433, 246, 'potion');



        window.player = this.player


        this.cameras.main.startFollow(this.player);

        //collision
        // this.itemLayer2.setCollisionByProperty({ pillars: true });

        this.physics.add.collider(this.itemLayer2, this.player);
        this.player.setCollideWorldBounds(true);//don't go out of the the this.map

        this.itemLayer3.setCollisionByExclusion(-1, true)
        this.itemLayer2.setCollisionByExclusion(-1, true)
        this.itemLayer1.setCollisionByExclusion(-1, true)
       
    
        this.physics.add.collider(this.player, this.itemLayer3);
        this.physics.add.collider(this.player, this.itemLayer2);
        this.physics.add.collider(this.player, this.itemLayer1);
    
      
       


        //overlap
        //potion
        this.physics.add.overlap(
            this.player,
            this.potion2,
            this.collectpotion,
            null,
            this
        );
        //key
        this.physics.add.overlap(
            this.player,
            [this.key],
            this.collectkey,
            null,
            this
        );




    } // end of create //

    update() {
        if (this.player.x > 174 && this.player.x < 200 &&
            this.player.y < 97) {
            if (this.collectedkey == 1 && this.potioncollected == 1) {
                this.level2()
            }
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
        if (this.heart === 3) {
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(true);
            this.heartimg3.setVisible(true);

        } else if (this.heart === 2) {
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(true);
            this.heartimg3.setVisible(false);

        } else if (this.heart === 1) {
            this.heartimg1.setVisible(true);
            this.heartimg2.setVisible(false);
            this.heartimg3.setVisible(false);

        } else if (this.key === 0) {
            this.heartimg1.setVisible(false);
            this.heartimg2.setVisible(false);
            this.heartimg3.setVisible(false);
        }

    } // end of update // 
    collectkey(player, map) {
        console.log("collect key");
        window.key++
        this.collectedkey = 1
        this.playercollectsnd.play();
        // this.mapCount.setText("map:" + window.map);
        map.disableBody(false, true);

    }
    collectpotion(player, map) {
        console.log("collectpotion");
        window.potion++
        this.potioncollected = 1
        this.player.setScale(0.5)
        this.playercollectsnd.play();
        // this.mapCount.setText("map:" + window.map);
        map.disableBody(false, true);

    }

    wolfCaught(player, enemy) {
        console.log("hit by wolf");

        // this.playerhurtsnd.play();

        // Shake screen
        this.cameras.main.shake(150);

        window.heart--

        enemy.disableBody(false, true);
        if (window.heart == 0) {
            this.scene.start("gameoverScene");
            //this.loseSnd.play();

        }

    }
    level2(player) {
        console.log("entering level2")
        this.scene.start("level2")
    }
}