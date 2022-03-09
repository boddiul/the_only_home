

GameState = function (game) {

};

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

        let b_pos = [[180,440],[-450,580],[370,1140]]
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


        this.back_gradient1 = game.add.image(0,0,'back_gradient1');
        this.visible = false;
        this.back_gradient1.alpha = 0;
        this.back_gradient1.scale.set(4,4);

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

        this.levelGroup[1].y = -GAME_HEIGHT

        game.input.onDown.add(this.click, this);





        //game.camera.view.x = GAME_WIDTH/2;
        //game.camera.view.y = GAME_HEIGHT/2;


        //this.changeCamera(0,150,2,1)
        //this.changeCamera(-250,600,1.7,1)
        //this.changeCamera(280,700,1.9,1)

        this.nextMenuState();




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
                break;
        }

        this.menuState+=1;
    },

    openLevel : function (i) {

        i = 1;

        this.levelOpened = true;

        this.currentLevel = i;


        this.levelGroup[i].y = -GAME_HEIGHT;
        let tween = this.game.add.tween(this.levelGroup[i]);
        tween.to({y:0},
            Phaser.Timer.SECOND,
            Phaser.Easing.Back.Out
        );
        tween.start();

        switch (this.currentLevel) {
            case 0:
                break;

            case 1:

                this.nextTime = 2;
                this.energy = 1;

                this.back_gradient1.visible = true;
                tween = this.game.add.tween(this.back_gradient1);
                tween.to({alpha:1},
                    Phaser.Timer.SECOND,
                    Phaser.Easing.Quartic.Out
                );
                tween.start();
                break;

            case 2:
                break;
        }


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





    click : function (pointer) {




    },




    update : function () {



        //this.back.x = -(1280-GAME_WIDTH)/2;

        this.back.scale.set(this.cameraScale,this.cameraScale);

        this.back.x = GAME_WIDTH/2-this.cameraX*this.cameraScale;
        this.back.y = -this.cameraY*this.cameraScale;

        this.houseGroup.scale.set(this.cameraScale,this.cameraScale);
        this.houseGroup.x = GAME_WIDTH/2-this.cameraX*this.cameraScale;
        this.houseGroup.y = -this.cameraY*this.cameraScale;



        this.levelGroup[1].x = GAME_WIDTH/2;

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



        switch (this.currentLevel)
        {
            case 0:
                break;


            case 1:



                this.nextTime -= 1/60;

                this.level1_bar.scale.x = this.energy

                if (this.nextTime<=0)
                {

                    for (let i=0;i<8;i++)
                        this.lightOn[i] = Math.random()<0.3

                    this.nextTime = 2;
                }

                for (let i=0;i<8;i++)
                {
                    if (this.lightOn[i])
                    {
                        this.energy -= 0.0003
                        if (this.room[i].alpha<1-1/5)
                            this.room[i].alpha+=1/5;
                        else
                            this.room[i].alpha = 1;

                        this.lightButton[i].frame = 1;
                    }
                    else
                    {
                        if (this.room[i].alpha>1/5)
                            this.room[i].alpha-=1/5;
                        else
                            this.room[i].alpha = 0;


                        this.lightButton[i].frame = 0;
                    }

                }

                break;

            case 2:
                break;
        }



    }


}
