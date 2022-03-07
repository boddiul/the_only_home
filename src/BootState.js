
BootState = function (game) {

};

BootState.prototype = {

    preload: function () {
        //game.load.image("load_bar", "assets/load_bar.png");
    },
    create: function () {

        game.state.start('PreloadState');
    }
}