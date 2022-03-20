

GameState = function (game) {

};


TIME_PER_LEVEL = 30;
TIME_SCALE = 1;

TRASHCAN_NUM = 8;
TRASH_TYPES = 6;

GameState.prototype = {



    create : function () {


        this.menuState = -1;

        this.cameraScale = 1;
        this.cameraX = 0;
        this.cameraY = 0;


        this.stage.disableVisibilityChange = true;


        game.stage.backgroundColor = '#b3a4c3';


        this.back = game.add.image(0,0,'back')
        this.back.anchor.set(0.5,0);

        this.houseGroup = game.add.group();


        this.house = game.add.image(0,0,'house')
        this.house.anchor.set(0.5,0);
        this.houseGroup.add(this.house);

        this.transitionPos = game.add.image(0,0,'transition_pos')
        this.transitionPos.anchor.set(0.5,0);
        this.houseGroup.add(this.transitionPos);


        /*this.stuffPos = game.add.image(0,0,'stuff_pos');
        this.stuffPos.anchor.set(0.5,0);
        this.houseGroup.add(this.stuffPos);*/


        let stuffData = [
            {id:1,groupId:0,x:140,y:530},
            {id:2,groupId:0,x:206,y:680},
            {id:3,groupId:0,x:-155,y:850},
            {id:4,groupId:0,x:-210,y:800},
            {id:5,groupId:0,x:-5,y:765},
            {id:6,groupId:0,x:65,y:780},
            {id:7,groupId:0,x:90,y:875},
            {id:8,groupId:0,x:-30,y:970},
            {id:21,groupId:1,x:-215,y:985},
            {id:9,groupId:1,x:-355,y:1200},
            {id:10,groupId:1,x:-195,y:1170},
            {id:11,groupId:2,x:165,y:1200},
            {id:12,groupId:1,x:-110,y:1310},
            {id:13,groupId:2,x:70,y:1280},
            {id:14,groupId:2,x:140,y:1315},
            {id:15,groupId:2,x:190,y:1395},
            {id:16,groupId:2,x:293,y:1390},
            {id:17,groupId:2,x:270,y:1465},
            {id:18,groupId:2,x:350,y:1470},
            {id:19,groupId:1,x:-120,y:1520},
            {id:20,groupId:1,x:-110,y:1590}

        ]

        this.stuff = []

        for (let i=0;i<21;i+=1)
        {
            this.stuff.push(game.add.button(stuffData[i].x, stuffData[i].y, 'stuff'+stuffData[i].id, function () {

                if (!this.stuff[i].__clicked)
                {
                    this.stuff[i].__clicked = true;
                    this.stuff[i].frame = 0;

                    let tween = this.game.add.tween(this.stuff[i]);
                    tween.to({alpha:0},
                        Phaser.Timer.SECOND,
                        Phaser.Easing.Quartic.Out
                    );
                    tween.onComplete.add(function () {
                        this.stuff[i].visible = false
                    }.bind(this));
                    tween.start();
                }

            }.bind(this)));
            this.stuff[i].frame = 1;
            this.stuff[i].anchor.set(0.5,0.5);
            this.stuff[i].scale.set(0.505,0.505);

            this.stuff[i].__clicked = false;
            this.stuff[i].__groupId = stuffData[i].groupId;

            this.houseGroup.add(this.stuff[i])
        }

        let b_pos = [[100,360],[-470,690],[230,1050]]
        this.button_transition = []

        for (let i=0;i<3;i++)
        {
            this.button_transition.push(game.add.button(b_pos[i][0],b_pos[i][1],'button_transition',function () {

                if (!this.levelOpened)
                    this.openLevel(i)
            },this,3+i,i,3+i,i))
            this.button_transition[i].scale.set(1.5,1.5)
            this.button_transition[i].visible = false;
            this.button_transition[i].active = false;
            this.button_transition[i].alpha = 0;

            this.houseGroup.add(this.button_transition[i])
        }


        this.levelOpened = false;
        this.currentLevel = -1;


        this.levelGroup = [null,null,null]

        this.back_gradient = [null, null, null]
        // LVL0



        this.back_gradient[0] = game.add.image(0,0,'back_gradient0');
        this.back_gradient[0].visible = false;
        this.back_gradient[0].alpha = 0;
        this.back_gradient[0].scale.set(4,4);

        this.levelGroup[0] = game.add.group();

        back0 = game.add.image(0,100,'background0');
        back0.anchor.set(0.5,0);

        this.levelGroup[0].add(back0);


        this.window = []
        this.flower = []
        this.tool = []
        this.buttonFlower = [];

        this.flowerTool = [];
        this.warn = []
        for (let i=0; i<3; i++)
        {
            let xx = -300+i*300

            let w = game.add.image(xx,560,'window');
            w.anchor.set(0.5, 0.5)
            this.window.push(w);
            this.levelGroup[0].add(w);

            let f = game.add.button(xx,730,'flower', function () {

                this.clickFlower(i);
            },this);
            f.anchor.set(0.5, 0.5)
            this.flower.push(f);
            this.levelGroup[0].add(f);


            let pz = game.add.button(xx,1100,'pot_zone', function () {

                this.clickFlower(i);
            },this);
            pz.alpha = 0.05;
            pz.anchor.set(0.5, 0.5)
            this.levelGroup[0].add(pz);

            let t = game.add.image(xx,500,'tool');
            t.anchor.set(0.5, 0.5)
            t.visible = false;
            this.flowerTool.push(t);
            this.levelGroup[0].add(t);

            let b = game.add.button(xx,1840,'button_flower',function () {

                this.clickFlowerButton(i);
            },this);
            b.frame = i*2;
            b.anchor.set(0.5, 0.5)
            this.buttonFlower.push(b)
            this.levelGroup[0].add(b);


            let wa = game.add.image(xx+20,0,'warn');
            wa.anchor.set(0.5, 0.5)
            wa.visible = false;
            this.warn.push(wa);
            this.levelGroup[0].add(wa);
        }


        this.timer0 = game.add.text(0, 160, "00:00", { font: "130px digital", fill: "#ffe0d8", align: "center", boundsAlignH: "center", boundsAlignV: "middle" });
        this.timer0.anchor.set(0.5,0);
        this.levelGroup[0].add(this.timer0);

        // LVL1

        this.back_gradient[1] = game.add.image(0,0,'back_gradient1');
        this.back_gradient[1].visible = false;
        this.back_gradient[1].alpha = 0;
        this.back_gradient[1].scale.set(4,4);

        this.levelGroup[1] = game.add.group();

        let back1 = game.add.image(0,100,'background1')
        back1.anchor.set(0.5,0);

        this.levelGroup[1].add(back1);

        let coords1 = [[-10,405],[-392,520],[-168,520],[0,750],[-392,750],[-54,870],[-52,520],[140,520]]

        let coords2 = [[-1.5,0],[-0.5,0],[0.5,0],[1.5,0],[-1.5,1],[-0.5,1],[0.5,1],[1.5,1]]

        this.room = [];
        this.lightButton = [];

        this.lightOn = [];


        for (let i=0;i<8;i++)
        {
            this.lightOn.push(false);

            this.room.push(game.add.image(coords1[i][0],coords1[i][1],'room'+i));
            this.room[i].alpha = 0;
            this.levelGroup[1].add(this.room[i]);

            this.lightButton.push(game.add.button(coords2[i][0]*225,1400+coords2[i][1]*330,'button_light',function () {

                this.lightOn[i] = !this.lightOn[i];
            },this));
            this.lightButton[i].anchor.set(0.5,0.5);

            this.levelGroup[1].add(this.lightButton[i]);
        }


        let carcass = game.add.image(0,100,'carcass')
        carcass.anchor.set(0.5,0);


        this.levelGroup[1].add(carcass);

        this.level1_bar = game.add.image(-167,270,'bar');
        this.level1_bar.anchor.set(0,0.5);


        this.levelGroup[1].add(this.level1_bar);


        this.levelGroup[1].add(this.level1_bar);


        this.timer1 = game.add.text(0, 1045, "00:00", { font: "70px digital", fill: "#00ffc1", align: "center", boundsAlignH: "center", boundsAlignV: "middle" });
        this.timer1.anchor.set(0.5,0);
        this.levelGroup[1].add(this.timer1);


        // LVL2



        this.back_gradient[2] = game.add.image(0,0,'back_gradient2');
        this.back_gradient[2].visible = false;
        this.back_gradient[2].alpha = 0;

        this.levelGroup[2] = game.add.group();


        let trp = [[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-0.5,1],[0.5,1]]
        this.trashcanPosition = []
        this.trashcan = [];

        this.trashUp = [];
        this.trashFall = []


        for (let i=0;i<TRASHCAN_NUM;i++)
        {
            //this.trashcanPosition.push([((i % (TRASHCAN_NUM/2))-1.5)*350, 1100 + Math.floor(i/(TRASHCAN_NUM/2))*600])

            this.trashcanPosition.push([trp[i][0]*350, 1450 + trp[i][1]*500])

            let tr = this.game.add.button(0,0,'trashcan',function () {
                this.clickTrash(i);
            },this)
            tr.scale.set(1.2,1.2);
            tr.anchor.set(0.5,1);
            this.levelGroup[2].add(tr)

            this.trashcan.push(tr);
            this.trashUp.push(0);

            this.trashFall.push([0,0,0])

        }


        this.trash = []

        for (let i=0;i<TRASH_TYPES;i++)
        {
            for (let j=0;j<3;j++)
                {
                    let tr = this.game.add.image(0,0,'items');
                    tr.anchor.set(0.5,0.5);
                    tr.scale.set(1.2,1.2);
                    tr.frame = i;
                    this.trash.push(tr);
                    this.levelGroup[2].add(tr)
                }
        }



        let timerBack = game.add.image(0,200,'timer2');
        timerBack.anchor.set(0.5,0.5);
        this.levelGroup[2].add(timerBack);

        this.timer2 = game.add.text(0, 135, "00:00", { font: "120px digital", fill: "#ebefef", align: "center", boundsAlignH: "center", boundsAlignV: "middle" });
        this.timer2.anchor.set(0.5,0);
        this.levelGroup[2].add(this.timer2);

        //this.levelGroup[2].add(back2);

        //////

        for (let i=0;i<3;i++)
            this.levelGroup[i].y = -GAME_HEIGHT

        game.input.onDown.add(this.click, this);



        //this.nextMenuState();


        this.intro = game.add.group();


        this.logo_back = game.add.image(0,0,'logo_back');
        this.logo_back.anchor.set(0.5,0);
        this.logo_back.alpha = 1;
        this.intro.add(this.logo_back);

        this.logo = game.add.image(0,600,'logo');
        this.logo.anchor.set(0.5,0);
        this.intro.add(this.logo);

        this.intro.alpha =0;
        this.intro.visible = false;




        this.gameOverGroup = game.add.group();
        this.windowWin = game.add.button(0,0,"window_win",function () {

            this.closeLevel();
        },this)
        this.windowWin.anchor.set(0.5,0.5);
        this.gameOverGroup.add(this.windowWin);



        this.windowLose = game.add.image(0,0,'button_box',0);
        this.windowLose.anchor.set(0.5,0.5);
        this.gameOverGroup.add(this.windowLose);
        this.windowRestart = game.add.button(240,240,"button_box2",function () {

            this.initLevel(false);
        },this)
        this.windowRestart.frame = 1;
        this.windowRestart.anchor.set(0.5,0.5);
        this.gameOverGroup.add(this.windowRestart);

        this.windowBack = game.add.button(-240,240,"button_box2",function () {

            this.closeLevel();
        },this)
        this.windowBack.frame = 0;
        this.windowBack.anchor.set(0.5,0.5);
        this.gameOverGroup.add(this.windowBack);

        this.gameOverGroup.y = -GAME_HEIGHT/2;



        this.overlay = game.add.group();


        this.hint = game.add.image(0,GAME_HEIGHT*0.4,'button_box');
        this.hint.anchor.set(0.5,0.5);
        this.hint.visible = false;
        this.overlay.add(this.hint)





        this.intro_box = game.add.button(0,0,'intro_box',function () {


            if (!this.intro_box_clicked)
            {
                this.intro_box_clicked = true;




                let tween2 = this.game.add.tween(this.intro_box);
                tween2.to({alpha:0,y:GAME_HEIGHT*0.6},
                    Phaser.Timer.SECOND*1,
                    Phaser.Easing.Quartic.In

                );
                tween2.onComplete.add(function () {

                    this.intro_box.visible = false;
                    this.showButtons();

                }.bind(this));
                tween2.start();
            }

        },this);

        this.intro_box.anchor.set(0.5,0.5);
        this.intro_box.visible = false;

        this.intro_box_clicked = false;

        this.overlay.add(this.intro_box)


        let tween = this.game.add.tween(this);
        tween.to({},
            Phaser.Timer.SECOND*1
        );
        tween.onComplete.add(function () {

            this.showHint(5);
        }.bind(this))
        tween.start();

        let tween2 = this.game.add.tween(this);
        tween2.to({},
            Phaser.Timer.SECOND*0.5
        );
        tween2.onComplete.add(function () {

            this.nextMenuState();
        }.bind(this))
        tween2.start();
        /*

        let tween = this.game.add.tween(this.intro);

        tween.to({alpha:0},
            Phaser.Timer.SECOND*0.5,
            Phaser.Easing.Quartic.In,
            true,
            Phaser.Timer.SECOND*0.5
        );
        tween.onComplete.add(function () {
            this.intro.visible = false;
            this.nextMenuState();
        }.bind(this));
        tween.start();*/

    },

    nextMenuState : function() {

        switch (this.menuState) {
            case -1:
                this.changeCamera(0,150,2,1)
                break;
            case 0:
                this.changeCamera(-250,600,1.7,1)
                break;
            case 1:
                this.changeCamera(280,700,1.9,1)
                break;
            case 2:
                this.changeCamera(0,0,1,1)


                this.showIntro();

                break;
        }

        this.menuState+=1;
    },

    showIntro :function() {

        this.intro.alpha = 0;
        this.intro.visible = true;
        let tween = this.game.add.tween(this.intro);
        tween.to({alpha:1},
            Phaser.Timer.SECOND*1.5,
            Phaser.Easing.Cubic.InOut,
            false,
            Phaser.Timer.SECOND
        );
        tween.onComplete.add(function () {
            let tween2 = this.game.add.tween(this.intro);
            tween2.to({alpha:0},
                Phaser.Timer.SECOND*1.5,
                Phaser.Easing.Cubic.InOut,
                false,
                Phaser.Timer.SECOND*1.5
            );
            tween2.onComplete.add(function () {

                this.intro.visible = false;


                this.intro_box.alpha = 0;
                this.intro_box.visible = true;
                this.intro_box.y = 0.4*GAME_HEIGHT;

                let tween6 = this.game.add.tween(this.intro_box);
                tween6.to({alpha:1,y:GAME_HEIGHT*0.5},
                    Phaser.Timer.SECOND*1,
                    Phaser.Easing.Quartic.Out
                );
                tween6.start();



            }.bind(this));
            tween2.start();



        }.bind(this));
        tween.start();

    },

    showButtons : function() {
        for (let i=0;i<3;i++)
        {
            this.button_transition[i].visible = true;
            this.button_transition[i].active = true;

            let tween = this.game.add.tween(this.button_transition[i]);
            tween.to({alpha:1},
                Phaser.Timer.SECOND*(3+i*1.5),
                Phaser.Easing.Quartic.Out
            );
            tween.onComplete.add(function () {
            }.bind(this));
            tween.start();
        }
    },

    openLevel : function (i) {


        this.levelOpened = true;

        this.currentLevel = i;



        this.levelGroup[i].y = -GAME_HEIGHT;
        let tween = this.game.add.tween(this.levelGroup[i]);
        tween.to({y:0},
            Phaser.Timer.SECOND,
            Phaser.Easing.Back.Out
        );
        tween.start();


        this.back_gradient[i].visible = true;
        tween = this.game.add.tween(this.back_gradient[i]);
        tween.to({alpha:1},
            Phaser.Timer.SECOND,
            Phaser.Easing.Quartic.Out
        );
        tween.start();


        this.initLevel(true);


    },


    showHint : function(i) {


        this.hint.alpha = 0;
        this.hint.visible = true;
        this.hint.y = GAME_HEIGHT*0.4;
        this.hint.frame = i;

        let tween = this.game.add.tween(this.hint);
        tween.to({alpha:1,y:GAME_HEIGHT*0.5},
            Phaser.Timer.SECOND*0.5,
            Phaser.Easing.Quartic.Out
        );
        tween.onComplete.add(function () {



            let tween2 = this.game.add.tween(this.hint);
            tween2.to({alpha:0,y:GAME_HEIGHT*0.6},
                Phaser.Timer.SECOND*0.5,
                Phaser.Easing.Quartic.In,
                false,
                Phaser.Timer.SECOND*1

            );
            tween2.onComplete.add(function () {

                this.hint.visible = false;

            }.bind(this));
            tween2.start();

        }.bind(this));
        tween.start();


    },

    initLevel : function(firstStart) {

        this.gameplayActive = false;
        this.gameOverGroup.y = - GAME_HEIGHT/2;

        this.timeLeft = TIME_PER_LEVEL;
        this.gameOver = false;

        this.gameWin = false;

        switch (this.currentLevel) {
            case 0:

                this.flowerGrowth = [0,0,0];
                this.flowerSick = [-1,-1,-1];
                this.flowerSickDelay = [1,2,3];


                this.flowerToolTime = [0,0,0];
                this.flowerToolWorking = [-1,-1,-1];


                this.selectedFlowerButton = -1;

                break;
            case 1:



                this.nextTime = 2;
                this.energy = 1;

                break;

            case 2:


                this.selectedTrash = -1;

                this.trashData = [[0,3,6],[1,4,2],[11,5,7],[8,9,10],[-1,-1,-1],[15,14,17],[16,12,-1],[13,-1,-1]];


                break;
        }


        if (firstStart)
        {
            let tween = this.game.add.tween(this);
            tween.to({},
                Phaser.Timer.SECOND*0.5
            );
            tween.onComplete.add(function () {

                this.showHint(2+this.currentLevel);
            }.bind(this))
            tween.start();


            let tween2 = this.game.add.tween(this);
            tween2.to({},
                Phaser.Timer.SECOND*2
            );
            tween2.onComplete.add(function () {

                this.startLevel();
            }.bind(this))
            tween2.start();


        }
        else
        {
            this.startLevel();
        }
    },

    startLevel : function() {
        this.gameplayActive = true;
    },

    closeLevel : function() {





        this.levelGroup[this.currentLevel].y = 0;
        let tween = this.game.add.tween(this.levelGroup[this.currentLevel]);
        tween.to({y:-GAME_HEIGHT},
            Phaser.Timer.SECOND,
            Phaser.Easing.Back.In
        );
        tween.start();


        tween = this.game.add.tween(this.back_gradient[this.currentLevel]);
        tween.to({alpha:0},
            Phaser.Timer.SECOND*2,
            Phaser.Easing.Default
        );
        tween.onComplete.add(function () {
            this.back_gradient[this.currentLevel].visible = false;
            this.currentLevel = -1;
            this.levelOpened = false;
        }.bind(this))
        tween.start();


        tween = this.game.add.tween(this.gameOverGroup);
        tween.to({y:-GAME_HEIGHT/2},
            Phaser.Timer.SECOND*0.3,
            Phaser.Easing.Quartic.In
        );
        tween.start();



    },

    changeCamera : function (x,y,scale,time) {


        let tween = this.game.add.tween(this);
        tween.to({cameraX:x,cameraY:y,cameraScale:scale},
            Phaser.Timer.SECOND * time,
            Phaser.Easing.Quartic.InOut
        );
        tween.onComplete.add(function () {


        }.bind(this));
        tween.start();
    },



    clickFlowerButton : function(i) {

        this.selectedFlowerButton = i;

    },



    clickFlower : function(i) {

        if (this.flowerSick[i]!==-1)
        {
            if (this.flowerSick[i] === this.selectedFlowerButton)
            {
                this.flowerSickDelay[i] = 1;
                this.flowerSick[i] = -1;


                this.flowerToolTime[i] = 1;
                this.flowerToolWorking[i] = this.selectedFlowerButton;
            }
        }

    },

    clickTrash : function(i) {


        if (this.selectedTrash===-1)
        {
            let empty = true;


            for (let j=0;j<3;j++)
                if (this.trashData[i][j]!==-1)
                    empty = false;



            if (!empty)
                this.selectedTrash = i;
        }
        else
        {

            if (this.selectedTrash===i)
            {

                this.selectedTrash = -1;
            }
            else
            {
                let t1 = [];
                let t2 = [];

                for (let j=0;j<3;j++)
                {

                    if (this.trashData[this.selectedTrash][j]!==-1)
                        t1.push(this.trashData[this.selectedTrash][j])

                    if (this.trashData[i][j]!==-1)
                        t2.push(this.trashData[i][j])
                }


                if (t1.length>0 && t2.length<3)
                {

                    let movingType = this.trash[t1[t1.length-1]].frame;

                    let p2 = t1.length-1;
                    let p1 = t1.length-1;

                    let op2 = t2.length-1;

                    while (p1>0 && (this.trash[t1[p1-1]].frame===movingType))
                        p1-=1;


                    for (let k=p1;k<=p2;k++)
                        if (t2.length<3)
                        {
                            t2.push(0);

                            this.trashData[i][t2.length-1] = this.trashData[this.selectedTrash][k]
                            this.trashData[this.selectedTrash][k] = -1;

                            this.trashFall[i][t2.length-1] = 0.75+0.25*(t2.length-1);

                        }



                    this.selectedTrash = -1;
                }


            }
        }

    },

    click : function (pointer) {




    },


    winLevel : function() {
        this.gameOver = true;

        this.gameWin = true;


        this.windowLose.visible = false;
        this.windowRestart.visible = false;
        this.windowBack.visible = false;
        this.windowWin.visible = true;
        this.windowWin.frame = this.currentLevel;

        this.gameOverGroup.y = -GAME_HEIGHT/2;
        let tween = this.game.add.tween(this.gameOverGroup);
        tween.to({y:GAME_HEIGHT/2},
            Phaser.Timer.SECOND,
            Phaser.Easing.Quartic.Out
        );
        tween.start();
    },


    loseLevel : function() {
        this.gameOver = true;

        this.gameWin = false;


        this.windowLose.visible = true;
        this.windowRestart.visible = true;
        this.windowBack.visible = true;
        this.windowWin.visible = false;


        this.gameOverGroup.y = -GAME_HEIGHT/2;
        let tween = this.game.add.tween(this.gameOverGroup);
        tween.to({y:GAME_HEIGHT/2},
            Phaser.Timer.SECOND,
            Phaser.Easing.Quartic.Out
        );
        tween.start();

    },


    update : function () {


        let scaleP = (GAME_WIDTH-1000)/1000



        this.intro_box.scale.set(0.7+scaleP*0.3,0.7+scaleP*0.3)

        //this.back.x = -(1280-GAME_WIDTH)/2;

        this.back.scale.set(this.cameraScale,this.cameraScale);

        this.back.x = GAME_WIDTH/2-this.cameraX*this.cameraScale;
        this.back.y = -this.cameraY*this.cameraScale;

        this.houseGroup.scale.set(this.cameraScale,this.cameraScale);
        this.houseGroup.x = GAME_WIDTH/2-this.cameraX*this.cameraScale;
        this.houseGroup.y = -this.cameraY*this.cameraScale;


        for (let i=0; i<3; i++)
            this.levelGroup[i].x = GAME_WIDTH/2;



        this.intro.x = GAME_WIDTH/2;
        this.gameOverGroup.x = GAME_WIDTH/2;
        this.overlay.x = GAME_WIDTH/2;

        if (this.menuState>=0 && this.menuState<=2)
        {
            let activeStuff = false;

            for (let i=0;i<21;i++)
            if (!this.stuff[i].__clicked && this.stuff[i].__groupId===this.menuState)
            {
                activeStuff = true;

            }

            if (!activeStuff)
                this.nextMenuState();
        }


        switch (this.currentLevel) {
            case 0:

                if (!this.gameOver)
                {




                    if (this.gameplayActive)
                        if (this.timeLeft > 0)
                            this.timeLeft -= 1 / 60 * TIME_SCALE;

                    if (this.timeLeft <= 0) {
                        if (!this.gameOver) {
                            if (Math.floor(this.flowerGrowth[0]) >= 2 && Math.floor(this.flowerGrowth[1]) >= 2 && Math.floor(this.flowerGrowth[2]) >= 2)
                                this.winLevel();
                            else
                                this.loseLevel();
                        }
                        this.timeLeft = 0;
                    }

                    this.timer0.text = "00:" + (Math.floor(this.timeLeft) < 10 ? "0" : "") + Math.floor(this.timeLeft);


                    if (this.gameplayActive) {
                        for (let i = 0; i < 3; i++) {
                            if (this.flowerToolTime[i] > 0)
                                this.flowerToolTime[i] -= 1 / 60 * TIME_SCALE

                            if (this.flowerSickDelay[i] > 0)
                                this.flowerSickDelay[i] -= 1 / 60 * TIME_SCALE
                        }


                        let sfl = 0;

                        for (let i = 0; i < 3; i++)
                            if (this.flowerSick[i] !== -1)
                                sfl += 1;


                        for (let i = 0; i < 3; i++)
                            if (this.flowerSick[i] === -1) {

                                this.flowerGrowth[i] += 1 / 60 / 8 * TIME_SCALE
                                if (this.flowerGrowth[i] > 2)
                                    this.flowerGrowth[i] = 2;


                                if (Math.random() < 1 / (240 * 3 / TIME_SCALE) && this.flowerSickDelay[i] <= 0 && sfl < 2) {

                                    this.flowerSick[i] = Math.floor(Math.random() * 3)
                                }
                            }

                    }


                    for (let i = 0; i < 3; i++) {
                        switch (this.flowerSick[i]) {
                            case -1:
                                this.flower[i].frame = Math.floor(this.flowerGrowth[i])
                                break;
                            case 0:
                                this.flower[i].frame = 6 + Math.floor(this.flowerGrowth[i])
                                break;
                            case 1:
                                this.flower[i].frame = 3 + Math.floor(this.flowerGrowth[i])
                                break;
                            case 2:

                                this.flower[i].frame = 3 + Math.floor(this.flowerGrowth[i])
                                break;
                        }

                        if (this.flowerSick[i] === 2 || (this.flowerToolTime[i] > 0 && this.flowerToolWorking[i] === 2))
                            this.window[i].frame = 0
                        else
                            this.window[i].frame = 1


                        if (this.flowerSick[i] !== -1) {
                            this.warn[i].visible = true;
                            this.warn[i].y = 1200 + Math.sin(-this.timeLeft + i) * 30
                        } else
                            this.warn[i].visible = false;

                        if (this.flowerToolTime[i] > 0) {

                            this.flowerTool[i].visible = true;
                            this.flowerTool[i].frame = this.flowerToolWorking[i];
                            this.flowerTool[i].y = 550 + Math.sin(-this.timeLeft * (this.flowerToolWorking[i] === 2 ? 0 : 8) + i) * 70

                        } else {
                            this.flowerTool[i].visible = false;
                        }


                        this.buttonFlower[i].frame = i * 2 + (i === this.selectedFlowerButton ? 1 : 0)
                    }

                }

                break;
            case 1:


                for (let i = 0; i < 8; i++) {

                    this.lightButton[i].frame = this.lightOn[i] ? 1 : 0;
                }


                if (!this.gameOver) {

                    if (this.gameplayActive)
                        if (this.timeLeft > 0)
                            this.timeLeft -= 1 / 60 * TIME_SCALE;

                    if (this.timeLeft <= 0) {
                        if (!this.gameOver) {

                            if (this.energy > 0)
                            {
                                for (let i = 0; i < 8; i++) {
                                    this.lightOn[i] = false;
                                }
                                this.winLevel();
                            }
                            else
                                this.loseLevel();




                        }
                        this.timeLeft = 0;
                    }

                    this.timer1.text = "00:" + (Math.floor(this.timeLeft) < 10 ? "0" : "") + Math.floor(this.timeLeft);


                    if (this.gameplayActive) {
                        this.nextTime -= 1 / 60;


                        if (this.nextTime <= 0) {

                            for (let i = 0; i < 8; i++)
                                this.lightOn[i] = Math.random() < 0.3

                            this.nextTime = 2;
                        }
                    }


                    for (let i = 0; i < 8; i++) {
                        if (this.lightOn[i]) {
                            this.energy -= 0.0003 * TIME_SCALE
                            if (this.room[i].alpha < 1 - 1 / 5)
                                this.room[i].alpha += 1 / 5;
                            else
                                this.room[i].alpha = 1;


                        } else {
                            if (this.room[i].alpha > 1 / 5)
                                this.room[i].alpha -= 1 / 5;
                            else
                                this.room[i].alpha = 0;



                        }

                    }

                    if (this.energy < 0) {

                        this.energy = 0;

                        if (!this.gameOver)
                            this.loseLevel();
                    }

                    this.level1_bar.scale.x = this.energy
                }


                break;

            case 2:



                for (let i = 0; i < TRASHCAN_NUM; i++) {
                    this.trashcan[i].x = this.trashcanPosition[i][0]
                    this.trashcan[i].y = this.trashcanPosition[i][1] - this.trashUp[i] * 40
                    this.trashcan[i].frame = (this.selectedTrash === i) ? 1 : 0;



                    if (i === this.selectedTrash) {
                        if (this.trashUp[i] < 1)
                            this.trashUp[i] += 1 / 5
                        else
                            this.trashUp[i] = 1;
                    } else {
                        if (this.trashUp[i] > 0)
                            this.trashUp[i] -= 1 / 5
                        else
                            this.trashUp[i] = 0;
                    }



                    for (let j = 0; j < 3; j++)
                        if (this.trashData[i][j] !== -1) {
                            let k = this.trashData[i][j];

                            this.trash[k].x = this.trashcanPosition[i][0]

                            this.trash[k].y = this.trashcanPosition[i][1] - this.trashUp[i] * 40 - 170 - j * 120 - this.trashFall[i][j] * 60

                            if (this.trashFall[i][j] > 0)
                                this.trashFall[i][j] -= 1 / 10
                            else
                                this.trashFall[i][j] = 0;

                        }


                }


                if (!this.gameOver) {

                    if (this.timeLeft > 0)
                        this.timeLeft -= 1 / 60 * TIME_SCALE;

                    if (this.timeLeft <= 0) {
                        if (!this.gameOver) {
                            this.loseLevel();
                        }
                        this.timeLeft = 0;
                    }

                    this.timer2.text = "00:" + (Math.floor(this.timeLeft) < 10 ? "0" : "") + Math.floor(this.timeLeft);


                    let winState = true;
                    for (let i = 0; i < TRASHCAN_NUM; i++) {



                        for (let j = 0; j < 3; j++)
                            if (this.trashData[i][j] !== -1) {
                                let k = this.trashData[i][j];

                                if (this.trashData[i][0] !== -1)

                                    if (this.trash[k].frame !== this.trash[this.trashData[i][0]].frame)
                                        winState = false;
                            } else {

                                if (this.trashData[i][0] !== -1)
                                    winState = false;
                            }


                    }


                    if (!this.gameOver)
                        if (winState)
                            this.winLevel();

                }


                break;
            }



    }


}
