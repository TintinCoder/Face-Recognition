Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
let camera = document.getElementById('camera');
Webcam.attach('#camera');

// Doing With ML5
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById('snapshot').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ML5 VERSION', ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xwRjSpkg6/model.json', modelLoaded);
function modelLoaded() {
    console.log("Model Worked");
}
// Identify image button variable and event listener
const identifyBtn = document.getElementById("identifyImage");
identifyBtn.addEventListener('click', function() {
    const image = document.getElementById('captured_image');
    console.log(image)
    classifier.classify(image, gotResult);
})
// Got Result Function
function gotResult(error, result){
    if (error) {
        console.error(error);
    }
    else{
        // console.log('This function worked!!!');
        console.log(result)
        // Defining UI Variables
        const object = document.getElementById('object');
        const accuracy = document.getElementById('accuracy');
        // Adding The innerHTML To them
        object.innerHTML = result[0].label;
        const accuracyText = result[0].confidence;
        let accuracyDecimalRemoved = accuracyText.toFixed(3);

        accuracy.innerHTML = accuracyDecimalRemoved;
    }
}