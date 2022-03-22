
BootState = function (game) {

};

BootState.prototype = {

    preload: function () {
        //game.load.image("load_bar", "assets/load_bar.png");


        game.load.image('logo_back', 'assets/logo_back.png');
        game.load.image('earth_loading', 'assets/earth_loading.png')
    },
    create: function () {

        game.state.start('PreloadState');
    }
}