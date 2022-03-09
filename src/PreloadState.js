PreloadState = function (game) {

};




PreloadState.prototype = {

    preload: function () {

        this.game.load.onFileComplete.add(this.fileComplete, this);


        //this.loadBar = this.game.add.image(0, GAME_HEIGHT/2, "load_bar");
        //this.loadBar.scale.setTo(0,1);

        this.game.scale.setUserScale(1, 1);

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;


        game.load.image('back', 'assets/back.jpg');
        game.load.image('house', 'assets/house.png');
        game.load.image('transition_pos', 'assets/transition_pos.png');
        //game.load.image('stuff_pos', 'assets/stuff_pos.png');


        game.load.spritesheet('stuff1', 'assets/stuff1.png',320/2,292);
        game.load.spritesheet('stuff2', 'assets/stuff2.png',542/2,287);
        game.load.spritesheet('stuff3', 'assets/stuff3.png',188/2,128);
        game.load.spritesheet('stuff4', 'assets/stuff4.png',294/2,100);
        game.load.spritesheet('stuff5', 'assets/stuff5.png',428/2,191);
        game.load.spritesheet('stuff6', 'assets/stuff6.png',200/2,100);
        game.load.spritesheet('stuff7', 'assets/stuff7.png',378/2,188);
        game.load.spritesheet('stuff8', 'assets/stuff8.png',364/2,142);
        game.load.spritesheet('stuff9', 'assets/stuff9.png',264/2,135);
        game.load.spritesheet('stuff10', 'assets/stuff10.png',368/2,334);
        game.load.spritesheet('stuff11', 'assets/stuff11.png',242/2,140);
        game.load.spritesheet('stuff12', 'assets/stuff12.png',336/2,183);
        game.load.spritesheet('stuff13', 'assets/stuff13.png',200/2,100);
        game.load.spritesheet('stuff14', 'assets/stuff14.png',314/2,158);
        game.load.spritesheet('stuff15', 'assets/stuff15.png',318/2,126);
        game.load.spritesheet('stuff16', 'assets/stuff16.png',200/2,128);
        game.load.spritesheet('stuff17', 'assets/stuff17.png',332/2,124);
        game.load.spritesheet('stuff18', 'assets/stuff18.png',200/2,132);
        game.load.spritesheet('stuff19', 'assets/stuff19.png',330/2,110);
        game.load.spritesheet('stuff20', 'assets/stuff20.png',310/2,147);
        game.load.spritesheet('stuff21', 'assets/stuff21.png',316/2,135);


        game.load.spritesheet('button_transition', 'assets/button_transition.png',120,120);

        game.load.image('bar', 'assets/level1/bar.png');

        game.load.image('back_gradient1', 'assets/level1/back_gradient.png');
        game.load.image('background1', 'assets/level1/background.png');
        game.load.spritesheet('button_light', 'assets/level1/button_light.png',286/2,265);

        game.load.image('carcass', 'assets/level1/carcass.png');

        for (let i=0;i<8;i++)
            game.load.image('room'+i, 'assets/level1/room'+i+'.png');



    }
    ,

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

        //this.loadBar.scale.x = progress / 100*(GAME_WIDTH/128);
        /*(if (progress >= 100) {
            this.game.load.onFileComplete.removeAll();

        }*/
    },

    create : function () {
        game.state.start('GameState');
    }
}