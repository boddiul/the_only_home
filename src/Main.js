

ROOM_WIDTH =2048;
ROOM_HEIGHT = 1284;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'game');

console.log(game)
game.state.add("BootState", new BootState());
game.state.add("PreloadState", new PreloadState());
game.state.add("GameState", new GameState());
game.state.start("BootState");

