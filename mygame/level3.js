
class level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
        this.mapcollected = 0

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

        this.load.tilemapTiledJSON("level3", "assets/level3.tmj");

        this.load.image("level3", "assets/1_Generic_32x32.png");
        this.load.image("kitchen", "assets/2_LivingRoom_32x32.png");
        this.load.image("kitchen2", "assets/Room_Builder_32x32.png");
        this.load.image("heart", "assets/heart.png");
        this.load.image("map", "assets/map.png");

        //load heart
        this.load.image("heart", "assets/heart.png");
        // this.load.image("map", "assets/map.png");


        this.load.audio("hit", "assets/hitsound.mp3");
        this.load.audio("collect", "assets/collectsound.ogg");
        this.load.audio("gameoverSnd", "assets/gameover.mp3");



    } // end of preload //

    create() {
        window.heart = 3
        console.log("level3")


        this.playerhitsnd = this.sound.add("hit").setVolume(0.5)
        this.playercollectsnd = this.sound.add("collect").setVolume(0.5)


        //step3-create the map from main
        var map = this.make.tilemap({ key: 'level3' });

        //step4 load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let level3Tiles = map.addTilesetImage("1_Generic_32x32", "level3");
        let kitchenTiles = map.addTilesetImage("2_LivingRoom_32x32", "kitchen");
        let kitchen2Tiles = map.addTilesetImage("Room_Builder_32x32", "kitchen2");

        // Step 5  create an array of tiles
        let tilesArray = [
            level3Tiles,
            kitchenTiles,
            kitchen2Tiles,
        ];

        // Step 6  Load in layers by layers
        this.groundLayer = map.createLayer("lvl3groundLayer", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("lvl3itemLayer", tilesArray, 0, 0);
        this.itemLayer2 = map.createLayer("lvl3itemLayer2", tilesArray, 0, 0);


        var start = map.findObject("objectLayer", obj => obj.name === "start");
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(start.x, start.y - 50, 'gen');

        //collect items
        this.map = this.physics.add.sprite(32, 530, 'map');
        this.map2 = this.physics.add.sprite(348, 223, 'map');
        this.map3 = this.physics.add.sprite(436, 237, 'map');

        window.player = this.player

        this.cameras.main.startFollow(this.player);


        this.itemLayer2.setCollisionByExclusion(-1, true)

        this.player.setCollideWorldBounds(true);//don't go out of the the this.map
      
        


        this.physics.world.bounds.width = this.groundLayer.width
        this.physics.world.bounds.height = this.groundLayer.height
        this.physics.add.collider(this.player, this.itemLayer2);
    

      

        // this.time.addEvent({
        //     delay: 1000,
        //     callback: this.moveDownUp,
        //     callbackScope: this,
        //     loop: false,
        // });

        this.wolf = this.physics.add.sprite(100, 270, "wolf").play("wolf-down").setScale(0.7);
        this.wolf2 = this.physics.add.sprite(100, 450, "wolf").play("wolf-down").setScale(0.7);
        this.wolf3 = this.physics.add.sprite(100, 480, "wolf").play("wolf-down").setScale(0.7);

        this.tweens.add({
            targets: this.wolf,
            x: 300,
            //flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })

        this.tweens.add({
            targets: this.wolf2,
            x: 500,
            //flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })
        this.tweens.add({
            targets: this.wolf3,
            x: 500,
            //flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })

        this.player.setCollideWorldBounds(true);//don't go out of the the this.map

        // // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // // camera follow playe
        this.cameras.main.startFollow(this.player);

        //this.decorLayer.setCollisionByExclusion(-1, true)
        //this.buildingLayer.setCollisionByExclusion(-1, true)
        this.physics.add.collider(this.player, this.decorLayer);
        this.physics.add.collider(this.player, this.buildingLayer);

        //overlap
        //wolf
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
        // //createlife
        // this.heartimg1 = this.add.image(100, 50, 'heart').setScrollFactor(0).setVisible(true)
        // this.heartimg2 = this.add.image(150, 50, 'heart').setScrollFactor(0).setVisible(true)
        // this.heartimg3 = this.add.image(200, 50, 'heart').setScrollFactor(0).setVisible(true)


    } // end of create ////////////////////////////////

    update() {
        if (this.player.x > 505 && this.player.x < 542 &&
            this.player.y < 64) {
            if (this.mapcollected == 3) {
                this.level4()
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
    }

    level4(player) {
        console.log("entering level4")
        this.scene.start("level4")
    }






} //////////// end of class world ////////////////////////


