const rockImg = `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c782e4c-fae0-4a87-b7b1-a752598d9df9/dapcda8-a40765e9-0853-4505-99fb-819a854c8532.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjNzgyZTRjLWZhZTAtNGE4Ny1iN2IxLWE3NTI1OThkOWRmOVwvZGFwY2RhOC1hNDA3NjVlOS0wODUzLTQ1MDUtOTlmYi04MTlhODU0Yzg1MzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FrF1hdrXyFcyNWhTeya9mFxMhH0hJj5T55H6BCsghX0`;
const paperImg = `https://www.pngkey.com/png/full/94-949677_stack-of-paper-png-crumpled-paper-1080-p.png`;
const scissorsImg = `https://wikiclipart.com/wp-content/uploads/2016/10/Free-clip-art-scissors-clipart.png`;
const questionMarksImg = `https://static.vecteezy.com/system/resources/previews/012/174/061/original/3d-question-mark-free-png.png`;

let currentGuess;
let canPick = true
let canGo = true

function pick(val) {
    if (canPick) {
        let clientGuessImg = $(".yourChoice")
        switch(val) {
            case 1:
                clientGuessImg.attr("src", rockImg);
                currentGuess = "Rock";
                break;
            case 2:
                clientGuessImg.attr("src", paperImg);
                currentGuess = "Paper";
                break;
            case 3:
                clientGuessImg.attr("src", scissorsImg);
                currentGuess = "Scissors";
                break;
            case 4:
                clientGuessImg.attr("src", questionMarksImg);
                currentGuess = undefined;
                break;
        }
    }
}

function botPick(val) {
    let botChoice;
    let botImg = $(".botChoiceImg")
    switch(val) {
        case 1:
            botImg.attr("src", rockImg);
            botChoice = "rock";
            break;
        case 2:
            botImg.attr("src", paperImg);
            botChoice = "paper";
            break;
        case 3:
            botImg.attr("src", scissorsImg);
            botChoice = "scissors";
            break;
    }
    return botChoice;
}

function decide(client, bot) {
    let botText = $(`.botDialogue`);
    switch(client) {
        case "Rock":
            switch(bot){
                case "rock":
                    botText.text(`We are tied!`);
                    break;
                case "paper":
                    botText.text(`I win! Paper beats rock.`)
                    break;
                case "scissors":
                    botText.text(`You win. Rock beats scissors. :(`)
                    break;
            }
            break;
        case "Paper":
            switch(bot){
                case "rock":
                    botText.text(`You win. Paper beats rock :(`);
                    break;
                case "paper":
                    botText.text(`We are tied!`)
                    break;
                case "scissors":
                    botText.text(`I win! Scissors beats paper.`)
            }
            break;
        case "Scissors":
            switch(bot){
                case "rock":
                    botText.text(`I win! Rock beats scissors.`);
                    break;
                case "paper":
                    botText.text(`You win. Scissors beats paper. :(`)
                    break;
                case "scissors":
                    botText.text(`We are tied!`)
                    break;
            }
            break;
    }
}

function wait(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


async function go () {
    if (canGo) {
        canGo = false;
        canPick = false;
        let botText = $(`.botDialogue`);
        let botImg = $(".botChoiceImg")
        let weight = Math.ceil(Math.random() * 3);
        botText.text(`My choice in... 3`);
        await wait(1);
        botText.text(`My choice in... 2`);
        await wait(1);
        botText.text(`My choice in... 1`);
        await wait(1);
        let botChoice = botPick(weight);
        botText.text(`My choice is... ${botChoice}`);
        await wait(2);
        decide(currentGuess, botChoice);
        await wait(2);
        botText.text(`Try again?`);
        await wait(2);
        botText.text(`My choice is...`)
        botImg.attr('src', questionMarksImg)
        canGo = true;
        canPick = true;
        pick(4);
    }
}