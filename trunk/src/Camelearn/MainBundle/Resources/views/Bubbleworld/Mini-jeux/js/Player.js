(function (window) {
    function Player(imgPlayer, x_start, x_end) {
        this.initialize(imgPlayer, x_start, x_end);
    }
    Player.prototype = new createjs.BitmapAnimation();

    Player.prototype.bounds = 0;
    Player.prototype.hit = 0;
    Player.prototype.alive = true;

    // constructor:
    Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize;
   
    var quaterFrameSize;
   
    Player.prototype.initialize = function (imgPlayer, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgPlayer],
            frames: { width:64, height:64, regX:32, regY: 32 },
            animations: {
                walk: [0, 9, "walk", 4],
                die: [10, 21, false, 4],
                jump: [22, 32],
                celebrate: [33, 43],
                idle: [44, 44]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        this.gotoAndPlay("idle");
        this.isInIdleMode = true;
        this.shadow = new createjs.Shadow("#000", 3, 2, 2);
        this.name = "Hero";
        this.direction = 1;

        // velocity
        this.vX = 4;
        this.vY = 0;
        this.currentFrame = 66;
        this.bounds = 28;
        this.hit = this.bounds;
    }

    Player.prototype.tick = function () {
        if (this.alive && !this.isInIdleMode) {
            if ((this.x + this.direction > quaterFrameSize) && (this.x + (this.direction * 2) < this.x_end - quaterFrameSize + 1)) {
                this.x += this.vX * this.direction;
                this.y += this.vY * this.direction;
            }
        }
    }

    window.Player = Player;
} (window));