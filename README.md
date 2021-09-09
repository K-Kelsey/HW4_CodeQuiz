#Functioning Coding Quiz! HW4
---

This is my code quiz that I completed for week 4's homework.

Here is how to navigate it:
>When the start button is clicked, you will be prompted with a series of five questions with a timer starting at 45sec.
>Once an answer has been chosen, there will be a display feature either indicating the right answer was chosen or that the wrong answer was chosen.
>If in the event that a wrong answer was chosen, the timer will be subtracted by 5sec and your score will be deducted by 10.
>Once the quiz is complete, you will be asked to enter your initals to save your highscore! To restart the quiz, you will need to refresh the homepage via the icon placed in the top-left of your browser.
>Enjoy!

Here is a sample of how the website will look:

![Homepage](QuizHome)
![Scorepage](QuizScore)

##Lessons learned from the assignment.
---

>This was a challenging assignment at times, was able to better understand the flow of javascript given that I ran into a few errors trying to format my functions properly

>I try to remind myself to add note sections where I can, but that also gets messy once I start moving around certain chunks of code.

### _Sources that helped me create this markdown._
---

*[Mike Dane](https://www.youtube.com/channel/UCvmINlrza7JHB1zkIOuXEbw) from YouTube.
*[W3Schools](https://www.w3schools.com/cssref/pr_class_position.asp)
*[TechnicalCafe](https://www.youtube.com/watch?v=9sT03jEwcaw&t=1006s) from YouTube.
*[StackOverflow](https://stackoverflow.com/questions/42603033/uncaught-typeerror-cannot-set-property-textcontent-of-null)
*[FreeCodeCamp](https://forum.freecodecamp.org/)

>Displaying data from local storage was a new obstacle to accomplish for me. It took a lot of tweaking and help from third parties but was finally able to get the scores to display the way I was hoping for.

```js
function update_scores() {
    remove_scores();
    var scoresArray = JSON.parse(localStorage.getItem("userScores")) || [];
    //----------sort scores array by value
    const table = document.getElementById("myTable")


    scoresArray.sort(function(a, b) {

        return b.score - a.score;
    });
    console.log(scoresArray, 'after sort')

    for (let i = 0; i < scoresArray.length; i++) {
        //-------overwrite the existing table

        var row = table.insertRow(i);
        var player_name = row.insertCell(0)
        var player_score = row.insertCell(1)
        player_name.innerHTML += scoresArray[i].name;
        player_score.innerHTML += scoresArray[i].score;
    }

}


```


after the updated scores function was complete, it was important to actually use the function in my endGame eventListener.
```js
endButton.addEventListener('click', function() {

    endButton.classList.add('hide')
    const value = inpValue.value
    console.log(value);



    if (value) {
        let object = {
            name: value,
            score: score
        }
        var stringifiedScores = localStorage.getItem("userScores") || "[]"
        console.log(stringifiedScores)

        var parsedScores = JSON.parse(stringifiedScores)
        console.log(parsedScores)

        parsedScores.push(object)
        var updatedScoresStringified = JSON.stringify(parsedScores)
        console.log(updatedScoresStringified)

        localStorage.setItem("userScores", updatedScoresStringified);
        update_scores()
    }

});
```

>All and all this project was very entertaining to test how much my brain can hold before losing its sanity. Just kidding. It was a very rewarding project with many many lessons gained from it. The lessons are starting to become more clear to me as the course progresses, but needless to say, I am excited to start working with API's that will hopefully make my life as a dev that much easier!
