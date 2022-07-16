// Credits aan Melvin, die de helft van mijn script werkend heeft helpen maken :)

console.log("js is gelinkt!");

// SWITCHEN TUSSEN LIGHT EN DARK MODE (met in CSS als hulp var-styles)
// Geleerd van: https://www.pullrequest.com/blog/how-to-implement-dark-mode-with-css-js/

// Var voor de button die tussen de themas switcht
var themeSwitcher = document.querySelector(".themebutton");

// Deze code had ik eerst, vond ik niet chill omdat hij elke keer als je de pagina laadt het thema erop zet. Ik heb het thema nu standaard in de HTML staan
// // Wait for document to load
// document.addEventListener("DOMContentLoaded", function (event) {
//     document.documentElement.setAttribute("data-theme", "light");

//     // Als je op de button drukt
//     themeSwitcher.onclick = function () {
//         // Get the current selected theme, on the first run
//         // it should be `light`
//         var currentTheme = document.documentElement.getAttribute("data-theme");

//         // Switch tussen `dark` and `light`
//         var switchToTheme = currentTheme === "dark" ? "light" : "dark";

//         // Set our currenet theme to the new one
//         document.documentElement.setAttribute("data-theme", switchToTheme);
//     };
// });

// FUNCTIE VOOR THEME SWITCH EN TEKST ALS JE OP ZON/MAAN KLIKT
themeSwitcher.addEventListener("click", function () {

    // Get the current selected theme
    var currentTheme = document.documentElement.getAttribute("data-theme");

    // Switch tussen `dark` and `light`
    var switchToTheme = currentTheme === "dark" ? "light" : "dark";

    // Set current theme to the new one
    document.documentElement.setAttribute("data-theme", switchToTheme);
});

// Themeswitch behouden na page refresh --  werkt niet goed :(
// function checklastTheme() {
//     var theme = localStorage.getItem("data-theme");
//     if(theme == "light"){
//         document.documentElement.setAttribute("data-theme", "light");
//     } else {
//         document.documentElement.setAttribute("data-theme", "dark");
//     }
// }
// window.addEventListener("load", checklastTheme);

// DARK MODE BUTTONTEKST VERSCHIJNT BIJ HOVER
// Tekstelement p aanmaken
var themeSwitcherText = document.createElement("p");

// Class met styling eraan toevoegen
themeSwitcherText.classList.toggle("tstext");

// Var voor de div waar de button in zit, om de p daaraan toe te gaan voegen
var tsButtonDiv = document.querySelector('.tsbutton');

// functie dat tekst element aan DOM wordt toegevoegd bij mouseover
themeSwitcher.addEventListener("mouseover", function () {
    tsButtonDiv.appendChild(themeSwitcherText);

    var currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme == "light") {
        themeSwitcherText.textContent = 'Create darkness';
    } else if (currentTheme == "dark") {
        themeSwitcherText.textContent = 'Return to the light';
    }
});

// eventlistener + functie dat tekst element uit DOM wordt verwijderd bij mouseout
themeSwitcher.addEventListener("mouseout", function () {
    tsButtonDiv.removeChild(themeSwitcherText);
});

// eventlistener + functie die plaatje wisselt van de themeSwitcher
themeSwitcher.addEventListener("click", function () {
    themeSwitcher.classList.toggle("themebuttonsun");
});



// JSON DATA LADEN
var jsondata = "https://tronalddump.io/random/quote";


//JSON lader met XMLHttpRequest
var request = new XMLHttpRequest();
// request.open('get', jsondata);
// request.responseType = 'json';
// request.send();

var tweetButton = document.querySelector(".tweetbutton");
var surpriseButton = document.createElement("button");
var tweetButtonDiv = document.querySelector(".tbdiv");

// Nieuwe knop toevoegen die de laatste tweet verzorgt
var lastTweetButton = document.createElement("button");

// var voor tweet tekst
var p = document.querySelector("#tweettext");

// Tekst in nieuwe p inladen
request.addEventListener("load", function () {
    // console.log("jsondata is geladen");
    // console.log(request.response.value);
    // console.log(request.response.appeared_at);

    var tweet = document.querySelector('.tweet');

    p.textContent = request.response.value;
    tweet.appendChild(p);
});

// Button die pagina refresht zodat nieuwe tweet laadt
tweetButton.addEventListener("click", function () {
    // location.reload();
    request.open('get', jsondata);
    request.responseType = 'json';
    request.send();
});

// LOAD INDICATOR
window.onload = function loadIndicator() {
    console.log('loading');
    p.textContent = 'One sec, before the tweet is loaded!';
};

var count = 0;

// Functie die aantal clicks telt en de blank text weghaalt en vervangt voor de tweet
tweetButton.onclick = function countClicks() {
    count++;

    if (count == 1) {
        var tweetArticle = document.querySelector(".clicked");
        tweetArticle.removeAttribute("class", "clicked");

        var blankText = document.querySelector(".blank");
        blankText.setAttribute("class", "clicked");

        tweetButton.textContent = 'Show me another tweet';

        surpriseButton.removeAttribute("clicked");
    } else if (count == 3) {
        tweetButton.textContent = 'TRUMP up the MADNESS';
    } else if (count == 5) {
        tweetButton.textContent = "No I'm not tired yet, show me more!";
    } else if (count == 7) {
        surpriseButton.setAttribute("class", "surprisebutton");
        surpriseButton.textContent = 'Surprise!';
        tweetButtonDiv.appendChild(surpriseButton);
    } else if (count == 9) {
        tweetButton.textContent = 'Come on, PLEASE just click the surprise button';
    }
};

document.addEventListener("keydown", event => {
    if (event.keyCode === 83) {
        location.reload();
    }
});

// CONFETTI SURPRISE
// Zit gelinkt aan bestand van iemand anders, bron: Bron van confetti.js: https://www.youtube.com/watch?v=quSR_ZrVz6Y
surpriseButton.addEventListener("click", function confettiRegen() {
    const start = () => {
        setTimeout(function () {
            confetti.start();
        }, 500); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };

    //  Stop

    const stop = () => {
        setTimeout(function () {
            confetti.stop();
        }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

    start();
    stop();

    // Knoppen weer onzichtbaar maken
    surpriseButton.setAttribute("class", "clicked");
    tweetButton.setAttribute("class", "clicked");

    // Tekst op button aanpassen en stylen
    lastTweetButton.textContent = 'Okay, last one for now';
    lastTweetButton.setAttribute("class", "tweetbutton");

    // Button aan DOM toevoegen
    tweetButtonDiv.appendChild(lastTweetButton);
});

lastTweetButton.addEventListener("click", function () {
    lastTweetButton.setAttribute("class", "clicked");
    request.open('get', jsondata);
    request.responseType = 'json';
    request.send();

    var reloadButton = document.createElement("button");
    reloadButton.textContent = 'Start over';
    reloadButton.setAttribute("class", "surprisebutton");
    tweetButtonDiv.appendChild(reloadButton);

    reloadButton.addEventListener("click", function () {
        location.reload();
    });
});