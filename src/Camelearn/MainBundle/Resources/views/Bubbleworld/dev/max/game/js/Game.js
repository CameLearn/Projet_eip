var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;

var canvas;
var stage;
var screen_width;
var screen_height;
var bmpSeq;
var backgroundSeqTile1, backgroundSeqTile2, backgroundSeqTile3;
var Monsters;
var Hero;
var contentManager;

function init() {
    //find canvas and load images, wait for last image to load
    canvas = document.getElementById("testCanvas");

    // create a new stage and point it at our canvas:
    stage = new createjs.Stage(canvas);
	
	var gameWidth = window.innerWidth;
	var gameHeight = window.innerHeight;
	var scaleToFitX = gameWidth / 800;
	var scaleToFitY = gameHeight / 480;

	var currentScreenRatio = gameWidth / gameHeight;
	var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

	if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79)
	{
		canvas.style.width = gameWidth + "px";
		canvas.style.height = gameHeight + "px";
	}
	else
	{
		canvas.style.width = 800 * optimalRatio + "px";
		canvas.style.height = 480 * optimalRatio + "px";
	}
	
    // taille canvas pour les calculs ultérieurs
    screen_width = canvas.width;
    screen_height = canvas.height;

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();
}

function reset() {
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    stage.update();
}

// background basé sur un random parmis les background dispo, pour le moment useless
function CreateAndAddRandomBackground() {
    var randomnumber = Math.floor(Math.random() * 3)

    backgroundSeqTile1 = new createjs.Bitmap(contentManager.imgBackgroundLayers[0][randomnumber]);
    backgroundSeqTile2 = new createjs.Bitmap(contentManager.imgBackgroundLayers[1][randomnumber]);
    backgroundSeqTile3 = new createjs.Bitmap(contentManager.imgBackgroundLayers[2][randomnumber]);

    stage.addChild(backgroundSeqTile1);
    stage.addChild(backgroundSeqTile2);
    stage.addChild(backgroundSeqTile3);
}

function startGame() {
    // set la variable y en random pour la position du héro et des ennemies
    var randomY;
	
	CreateAndAddRandomBackground();

	// event au clavier
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;

    // creation du hero
	randomY = screen_height - 64;
	Hero = new Player(contentManager.imgPlayer, screen_width);
	Hero.x = 400;
	Hero.y = randomY;

    //plateformes
	bmpSeqTile = new createjs.Bitmap(contentManager.imgTile);
	bmpSeqTile.regX = bmpSeqTile.frameWidth / 2 | 0;
	bmpSeqTile.regY = bmpSeqTile.frameHeight / 2 | 0;

    // on créé une ligne de plateforme
	for (var i = 0; i < 20; i++) {
	    var bmpSeqTileCloned = bmpSeqTile.clone();
		
	    bmpSeqTileCloned.x = 0 + (i * 40);
	    bmpSeqTileCloned.y = randomY + 32;
	    stage.addChild(bmpSeqTileCloned);
	}

    // tab de monstre
    Monsters = new Array();

    // MonsterA
	Monsters[0] = new Monster("MonsterA", contentManager.imgMonsterA, screen_width);
	Monsters[0].x = 20;
	Monsters[0].y = randomY;
/*
	// MonsterB
	randomY = 32 + (Math.floor(Math.random() * 7) * 64);
	Monsters[1] = new Monster("MonsterB", contentManager.imgMonsterB, screen_width);
	Monsters[1].x = 750;
	Monsters[1].y = randomY;

	// MonsterC
	randomY = 32 + (Math.floor(Math.random() * 7) * 64);
	Monsters[2] = new Monster("MonsterC", contentManager.imgMonsterC, screen_width);
	Monsters[2].x = 100;
	Monsters[2].y = randomY;

	// MonsterD
	randomY = 32 + (Math.floor(Math.random() * 7) * 64);
	Monsters[3] = new Monster("MonsterD", contentManager.imgMonsterD, screen_width);
	Monsters[3].x = 650;
	Monsters[3].y = randomY;
*/
    // on add tout a la pile
    for (var i=0; i<Monsters.length;i++){
	    stage.addChild(Monsters[i]);
    }
	stage.addChild(Hero);
		
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function tick() {
    for (monster in Monsters) {
        var m = Monsters[monster];
        m.tick();
        
        // controle de la mort du zero
        if (Hero.alive && m.hitRadius(Hero.x, Hero.y, Hero.hit)) {
            Hero.alive = false;
            if (Hero.direction == 1) {
                Hero.gotoAndPlay("die_h");
            }
            else {
                Hero.gotoAndPlay("die");
            }

            continue;
        }
    }
	//update du hero
    Hero.tick();

    // update du niveau
    stage.update();
}

function handleKeyDown(e) {
    if (!e) { var e = window.event; }
    switch (e.keyCode) {
        case KEYCODE_A: ;
        case KEYCODE_LEFT:
            if (Hero.alive && Hero.isInIdleMode) {
                Hero.gotoAndPlay("walk");
                Hero.direction = -1;
                Hero.isInIdleMode = false;
            }
            break;
        case KEYCODE_D: ;
        case KEYCODE_RIGHT:
            if (Hero.alive && Hero.isInIdleMode) {
                Hero.gotoAndPlay("walk_h");
                Hero.direction = 1;
                Hero.isInIdleMode = false;
            }
            break;
    }
}

function handleKeyUp(e) {
    if (!e) { var e = window.event; }
    switch (e.keyCode) {
        case KEYCODE_A: ;
        case KEYCODE_LEFT: ;  
        case KEYCODE_D: ;
        case KEYCODE_RIGHT:
            if (Hero.alive) {
                Hero.isInIdleMode = true;
                Hero.gotoAndPlay("idle");
            }
            break;
    }
}