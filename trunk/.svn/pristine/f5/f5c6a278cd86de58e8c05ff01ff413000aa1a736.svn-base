(function (window) {
    function Monster(monsterName, imgMonster, x_end) {
        this.initialize(monsterName, imgMonster, x_end);
    }
    Monster.prototype = new createjs.BitmapAnimation();

    Monster.prototype.IDLEWAITTIME = 40;
    Monster.prototype.bounds = 0;
    Monster.prototype.hit = 0;

    // constructor:
    Monster.prototype.BitmapAnimation_initialize = Monster.prototype.initialize;

    this.isInIdleMode = false;
    this.idleWaitTicker = 0;

    var quaterFrameSize;

    Monster.prototype.initialize = function (monsterName, imgMonster, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgMonster],
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                walk: [0, 9, "walk", 4],
                idle: [10, 20, "idle", 4]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        this.gotoAndPlay("walk_h");
        this.shadow = new createjs.Shadow("#000", 3, 2, 2);
        this.name = monsterName;
        this.direction = 1;
        // velocity
        this.vX = 1;
        this.vY = 0;
        this.currentFrame = 21;
    }

    Monster.prototype.tick = function () {
        if (!this.isInIdleMode) {
            this.x += this.vX * this.direction;
            this.y += this.vY * this.direction;
            if (this.x >= this.x_end - (quaterFrameSize + 1) || this.x < (quaterFrameSize + 1)) {
                this.gotoAndPlay("idle");
                this.idleWaitTicker = this.IDLEWAITTIME;
                this.isInIdleMode = true;
            }
        }
        else {
            this.idleWaitTicker--;

            if (this.idleWaitTicker == 0) {
                this.isInIdleMode = false;
                if (this.x >= this.x_end - (quaterFrameSize + 1)) {
                    this.direction = -1;
                    this.gotoAndPlay("walk");
                }

                if (this.x < (quaterFrameSize + 1)) {
                    this.direction = 1;
                    this.gotoAndPlay("walk_h");
                }
            }
        }
    }

    Monster.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Monster.prototype.hitRadius = function (tX, tY, tHit) {
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }

    window.Monster = Monster;
} (window));