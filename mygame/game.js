
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000',
    scene: [ preloadScene,instruction1,instruction2,instruction3,lvl1task,level1,level2,level3,level4,gameoverScene,youwonScene]
    

};

let game = new Phaser.Game(config);

window.heart = 3
window.map=0