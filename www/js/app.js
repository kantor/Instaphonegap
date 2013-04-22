$.when(pgReady, jqmReady).then(function() {

    var imageLoadedURI = null;

    function takePhoto() {

        console.log("app :: camera bottom pressed");
        var cameraOptions = {
            //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 290,
            targetHeight: 500,
        }
        navigator.camera.getPicture(gotPicture, onError, cameraOptions);
    }
   
    function loadPhotoInCanvas() {
        
        var ctx = document.getElementById("photo").getContext("2d");
        var img = new Image();
        img.src = imageLoadedURI;
        img.onload = function() {
            ctx.drawImage(img,0,0);
            console.log("app :: updated canvas");
        }
    }

    // called after using the camera 
    function gotPicture(imageURI) {
        imageLoadedURI = imageURI; 
        loadPhotoInCanvas();
    }

    function onError(error) {
        console.log(error);
    }

    function applyEffect(event) {

        effect = event.data.effect;
        elementId = event.data.elementId;

        var ctx = document.getElementById(elementId).getContext("2d");
        var imageData = ctx.getImageData(0,0,290,500);
        newImageData = effect(imageData);
        ctx.putImageData(newImageData, 0, 0);

        //window.resolveLocalFileSystemURI(imageLoadedURI, gotURI, fail);
    }


    // take a photo from the camera
    $("#take-photo-button").tap(takePhoto);

    // apply several effects

    $("#gray-button").on("tap",
            {
                "effect": grayScale,
                "elementId": "photo"
            }, applyEffect);

    $("#sepia-button").on("tap",
            {
                "effect": sepia,
                "elementId": "photo"
            }, applyEffect);

    $("#reset-button").on("tap", loadPhotoInCanvas);

});
