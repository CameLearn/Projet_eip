function ContentManager() {
    var ondownloadcompleted;
    var NUM_ELEMENTS_TO_DOWNLOAD = 15;

    this.SetDownloadCompleted = function (callbackMethod) {
        ondownloadcompleted = callbackMethod;
    };

    this.imgMonsterA = new Image();
    this.imgMonsterB = new Image(); 
    this.imgMonsterC = new Image(); 
    this.imgMonsterD = new Image();
    this.imgTile = new Image();
    this.imgPlayer = new Image();

    this.imgBackgroundLayers = new Array();
    var numImagesLoaded = 0;

    this.StartDownload = function () {
        SetDownloadParameters(this.imgPlayer, "img/Player.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgMonsterA, "img/MonsterA.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgMonsterB, "img/MonsterB.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgMonsterC, "img/MonsterC.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgMonsterD, "img/MonsterD.png", handleImageLoad, handleImageError);
        SetDownloadParameters(this.imgTile, "img/Tiles/BlockA0.png", handleImageLoad, handleImageError);

        for (var i = 0; i < 3; i++) {
            this.imgBackgroundLayers[i] = new Array();
            for (var j = 0; j < 3; j++) {
                this.imgBackgroundLayers[i][j] = new Image();
                SetDownloadParameters(this.imgBackgroundLayers[i][j], "img/Backgrounds/Layer" + i + "_" + j + ".jpg", handleImageLoad, handleImageError);
            }
        }
    }

    function SetDownloadParameters(imgElement, url, loadedHandler, errorHandler) {
        imgElement.src = url;
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    function handleImageLoad(e) {
        numImagesLoaded++

        if (numImagesLoaded == NUM_ELEMENTS_TO_DOWNLOAD) {
            numImagesLoaded = 0;
            ondownloadcompleted();
        }
    }

    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }
}