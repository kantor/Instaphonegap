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
