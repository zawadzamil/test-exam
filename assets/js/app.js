const filenames = ['Question27.json', 'Question63.json', 'Question43.json', 'Question38.json', 'Question99.json', 'Question18.json', 'Question4.json', 'Question72.json', 'Question37.json', 'Question86.json', 'Question77.json', 'Question2.json', 'Question57.json', 'Question80.json', 'Question52.json', 'Question65.json', 'Question47.json', 'Question74.json', 'Question88.json', 'Question17.json', 'Question26.json', 'Question70.json', 'Question68.json', 'Question6.json', 'Question85.json', 'Question3.json', 'Question15.json', 'Question78.json', 'Question30.json', 'Question67.json', 'Question49.json', 'Question46.json', 'Question25.json', 'Question35.json', 'Question22.json', 'Question44.json', 'Question69.json', 'Question11.json', 'Question61.json', 'Question8.json', 'Question83.json', 'Question41.json', 'Question73.json', 'Question54.json', 'Question33.json', 'Question91.json', 'Question97.json', 'Question82.json', 'script.py', 'Question55.json', 'Question24.json', 'Question16.json', 'Question42.json', 'Question50.json', 'Question29.json', 'Question96.json', 'Question76.json', 'Question19.json', 'Question32.json', 'Question14.json', 'Question92.json', 'Question100.json', 'Question84.json', 'Question60.json', 'Question75.json', 'Question39.json', 'Question10.json', 'Question23.json', 'Question66.json', 'Question64.json', 'Question48.json', 'Question56.json', 'Question40.json', 'Question21.json', 'Question45.json', 'Question81.json', 'Question1.json', 'Question94.json', 'Question98.json', 'Question51.json', 'Question12.json', 'Question31.json', 'Question7.json', 'Question5.json', 'Question93.json', 'Question20.json', 'Question9.json', 'Question79.json', 'Question36.json', 'Question62.json', 'Question90.json', 'Question95.json', 'Question71.json', 'Question34.json', 'Question53.json', 'Question13.json', 'Question89.json', 'Question87.json', 'Question28.json', 'Question58.json', 'Question59.json']


const questions = filenames.filter(file => {
    return file.endsWith('json')
})

console.log(questions.length)

let x = 1;
let initIndex = 1;

const randomQuestionIndex = getRandomNumbers(0, 99, 20)

randomQuestionIndex.forEach(index => {

    document.getElementById('quetionsNames').innerHTML += questions[index] + ', '

    fetch(`/assets/json/${questions[index]}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            
            let index = initIndex;

            const current = x;

            const text = `${current}: `+ data.question.substring(data.question.indexOf(':') + 1 )
           
            const questionContainer = $("<div>").addClass("question_container");
            const questionElement = $("<p>").addClass("question").text(text);
            questionContainer.append(questionElement);
        
            // Create options list
            const optionsList = $("<ul>").addClass("options").attr("id", "option" + (index + 1));
            data.options.forEach(function(option, optionIndex) {
              const optionElement = $("<li>");
              const inputElement = $("<input>").attr({
                type: "radio",
                id: "option" + (index + 1) + "_" + (optionIndex + 1),
                name: "question_" + (index + 1),
                value: option
              });
              const labelElement = $("<label>").attr("for", "option" + (index + 1) + "_" + (optionIndex + 1)).text(option);
              optionElement.append(inputElement).append(labelElement);
              optionsList.append(optionElement);
            });
            questionContainer.append(optionsList);
        
            // Append question container to main container
            $("#questions_div").append(questionContainer);

            x++;
            initIndex++;    

        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
})



// Get Random Number
function getRandomNumbers(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}