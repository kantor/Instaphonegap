function grayScale(imageData) {
    for (var i=0, n=imageData.data.length; i<n; i+=4) {
        var grayscale = imageData.data[i] * .3 +
                        imageData.data[i+1] * .59 +
                        imageData.data[i+2] * .11;
        imageData.data[i] = grayscale;
        imageData.data[i+1] = grayscale;
        imageData.data[i+2] = grayscale;
    }
    return imageData;
}

function sepia(imageData) {
    for (var i=0; i< imageData.data.length; i+=4) {
        imageData.data[i] = r[imageData.data[i]];
        imageData.data[i+1] = g[imageData.data[i+1]];
        imageData.data[i+2] = b[imageData.data[i+2]];
    }
    return imageData;
}
