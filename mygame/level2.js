
class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
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

        this.load.tilemapTiledJSON("level2", "assets/level2.tmj");

        // //step2: Preload any images 
        this.load.image("level2", "assets/1_Generic_32x32.png");
        this.load.image("bedroom", "assets/4_Bedroom_32x32.png");
        this.load.image("bedroom2", "assets/Room_Builder_32x32.png");
        this.load.image("map", "assets/map.png");


        //load heart
        this.load.image("heart", "assets/heart.png");
        // this.load.image("map", "assets/map.png"); s

        this.load.audio("hit", "assets/hitsound.mp3");
        this.load.audio("collect", "assets/collectsound.ogg");
        this.load.audio("gameoverSnd", "assets/gameover.mp3");

    } // end of preload //

    create() {
        window.heart = 3
        console.log("level2")

        this.playerhitsnd = this.sound.add("hit").setVolume(0.5)
        this.playercollectsnd = this.sound.add("collect").setVolume(0.5)

        //step3-create the map from main
        var map = this.make.tilemap({ key: 'level2' });

        //step4 load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let level2Tiles = map.addTilesetImage("1_Generic_32x32", "level2");
        let bedroomTiles = map.addTilesetImage("4_Bedroom_32x32", "bedroom");
        let bedroom2Tiles = map.addTilesetImage("Room_Builder_32x32", "bedroom2");

        // Step 5  create an array of tiles
        let tilesArray = [
            level2Tiles,
            bedroomTiles,
            bedroom2Tiles,
        ];

        // Step 6  Load in layers by layers
        this.groundLayer = map.createLayer("lvl2groundLayer", tilesArray, 0, 0);
        this.wallLayer = map.createLayer("lvl2wallLayer", tilesArray, 0, 0);
        this.itemLayer4 = map.createLayer("lvl2itemLayer4", tilesArray, 0, 0);
        this.itemLayer3 = map.createLayer("lvl2itemLayer3", tilesArray, 0, 0);
        this.itemLayer2 = map.createLayer("lvl2itemLayer2", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("lvl2itemLayer1", tilesArray, 0, 0);

        var start = map.findObject("objectLayer", obj => obj.name === "start");

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(start.x, start.y - 50, 'gen');

        //collect items
        this.map = this.physics.add.sprite(448, 136, 'map');
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
        //   });


        this.wolf = this.physics.add.sprite(100, 100, "wolf").play("wolf-down").setScale(0.7);
        this.wolf2 = this.physics.add.sprite(200, 100, "wolf").play("wolf-down").setScale(0.7);

        this.tweens.add({
            targets: this.wolf,
            y: 400,
            //flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })

        this.tweens.add({
            targets: this.wolf2,
            y: 400,
            //flipX: true,
            yoyo: true,
            duration: 2000,
            repeat: -1
        })

        this.player.setCollideWorldBounds(true);//don't go out of the the this.map

        // // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // // camera follow playe
        this.cameras.main.startFollow(this.player)

        this.itemLayer3.setCollisionByExclusion(-1, true)
        this.itemLayer2.setCollisionByExclusion(-1, true)
        this.itemLayer.setCollisionByExclusion(-1, true)
        this.wallLayer.setCollisionByExclusion(-1, true)
       
       
        this.player.setCollideWorldBounds(true);//don't go out of the the this.map
        this.physics.add.collider(this.player, this.itemLayer3);
        this.physics.add.collider(this.player, this.itemLayer2);
        this.physics.add.collider(this.player, this.itemLayer);
        this.physics.add.collider(this.player, this.wallLayer);
      


        //overlap
        //wolf
        this.physics.add.overlap(
            this.player,
            [this.wolf, this.wolf2],
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


        // this.heartimg1 = this.add.image(100, 50, 'heart').setScrollFactor(0).setVisible(true)
        // this.heartimg2 = this.add.image(150, 50, 'heart').setScrollFactor(0).setVisible(true)
        // this.heartimg3 = this.add.image(200, 50, 'heart').setScrollFactor(0).setVisible(true)

        // this.mapimg1 = this.add.image(500, 50, 'map').setScrollFactor(0).setVisible(true)
        // this.mapimg2 = this.add.image(550, 50, 'map').setScrollFactor(0).setVisible(true)
        // this.mapimg3 = this.add.image(650, 50, 'map').setScrollFactor(0).setVisible(true)


    } ///////////////////////////// end of create ////////////////////////

    update() {

        if (this.player.x > 601 && this.player.y > 472
            && this.player.y < 536) {
            if (this.mapcollected == 3) {
                this.level3()
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
            this.scene.start("jumpingtogameoverScene");
            this.scene.start("gameoverScene");

            //this.loseSnd.play();

        }
    }

    level3() {
        console.log("entering level3")
        this.scene.start("level3")

    }


}
   //////////// end of class world ////////////////////////


