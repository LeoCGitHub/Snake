"use strict";
// nourriture
let xN;
let yN;
let cote;
function nourriture() {
    cote = 20;
    let xNTemp = Math.ceil(Math.random() * 580);
    xN = xNTemp - xNTemp % 20;
    let yNTemp = Math.ceil(Math.random() * 580);
    yN = yNTemp - yNTemp % 20;
    let im3 = new Image();
    im3.src = "alien.png";
    ctx.fillStyle = ctx.createPattern(im3, 'repeat');
    ctx.fillRect(xN, yN, cote, cote);
}
// Ennemis
let xE;
let yE;
let coteE;
var tabE = [];
function ennemy() {
    coteE = 20;
    let xETemp = Math.ceil(Math.random() * 580);
    xE = xETemp - xETemp % 20;
    let yETemp = Math.ceil(Math.random() * 580);
    yE = yETemp - yETemp % 20;
    tabE.push(xE);
    tabE.push(yE);
    console.log(tabE);
    let im4 = new Image();
    im4.src = "astro.png";
    ctx.fillStyle = ctx.createPattern(im4, 'repeat');
    ctx.fillRect(xE, yE, coteE, coteE);
}
// varaibles globales du jeu
let c = document.getElementById("field");
let ctx = c.getContext("2d");
let compteScore = 0;
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.longueur = 20;
        this.dx = 0;
        this.dy = 0;
        this.tab0 = [this.x, this.y];
    }
    affichage() {
        $('#score').text(compteScore + ' point(s) !');
        this.eat();
        this.eatEnnemy();
        this.lose();
        console.log("tab0 :" + this.tab0);
        for (let i = this.tab0.length - 1; i >= 3; i -= 2) {
            this.tab0[i - 1] = this.tab0[i - 3];
            this.tab0[i] = this.tab0[i - 2];
        }
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        let im2 = new Image();
        im2.src = "alien.png";
        ctx.fillStyle = ctx.createPattern(im2, 'repeat');
        ctx.fillRect(xN, yN, cote, cote);
        this.tab0[0] += this.dx;
        this.tab0[1] += this.dy;
        let im = new Image();
        im.src = "science.png";
        let im4 = new Image();
        im4.src = "astro.png";
        for (let j = 0; j < this.tab0.length; j += 2) {
            if (j == 0 && j + 1 == 1) {
                ctx.fillStyle = ctx.createPattern(im, 'repeat');
                ctx.fillRect(this.tab0[j], this.tab0[j + 1], this.longueur, this.longueur);
            }
            else {
                ctx.fillStyle = ctx.createPattern(im2, 'repeat');
                ctx.fillRect(this.tab0[j], this.tab0[j + 1], this.longueur, this.longueur);
            }
        }
        for (let j = 0; j < tabE.length; j += 2) {
            ctx.fillStyle = ctx.createPattern(im4, 'repeat');
            ctx.fillRect(tabE[j], tabE[j + 1], coteE, coteE);
        }
        if (clickState === true) {
            if (abo.getTab()[0] > 580 || abo.getTab()[1] > 580 || abo.getTab()[0] < 0 || abo.getTab()[1] < 0) {
                $('#score').text('Tu as percuté la barrière d\'astéroïde ! Perdu en ' + compteScore + " coups !");
                fpsInterval = 1000 / 0;
            }
        }
        else {
            if (abo.getTab()[0] > 580)
                abo.getTab()[0] = -20;
            else if (abo.getTab()[1] > 580)
                abo.getTab()[1] = -20;
            else if (abo.getTab()[0] < 0)
                abo.getTab()[0] = 600;
            else if (abo.getTab()[1] < 0)
                abo.getTab()[1] = 600;
        }
    }
    changeDir(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
    lose() {
        for (let y = 2; y < this.tab0.length; y += 2) {
            if (this.tab0[y] === this.tab0[0] && this.tab0[y + 1] === this.tab0[1]) {
                $('#score').text('Tu as percuté le convoi ! Perdu en ' + compteScore + " coups !");
                fpsInterval = 1000 / 0;
            }
        }
    }
    eat() {
        if (this.tab0[0] === xN && this.tab0[1] === yN) {
            nourriture();
            this.affichage();
            this.tab0.push(this.x + 10);
            this.tab0.push(this.y + 10);
            compteScore++;
            $('#score').text('Score : ' + compteScore + ' point(s) !');
        }
    }
    eatEnnemy() {
        // avec distance et Pythagore
        for (let y = 0; y < tabE.length; y += 2) {
            if (this.tab0[0] === tabE[y] && this.tab0[1] === tabE[y + 1]) {
                $('#score').text('Tu as embarqué un Terrien ! Perdu en ' + compteScore + " coups !");
                fpsInterval = 1000 / 0;
                clearInterval(interval);
            }
        }
    }
    getTab() {
        return this.tab0;
    }
}
let frame = 12;
let abo = new Snake();
let fpsInterval = 1000 / frame;
let then = Date.now();
let startTime = then;
function game() {
    requestAnimationFrame(game);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        abo.affichage();
    }
}
function keys(eve, snake) {
    switch (eve.keyCode) {
        case 37:
            snake.changeDir(-20, 0);
            break;
        case 38:
            snake.changeDir(0, -20);
            break;
        case 39:
            snake.changeDir(20, 0);
            break;
        case 40:
            snake.changeDir(0, 20);
            break;
    }
}
var interval;
function start() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if ($('#text1').val() !== undefined)
        frame = $('#text1').val();
    abo = new Snake();
    fpsInterval = 1000 / frame;
    then = Date.now();
    nourriture();
    game();
    if (alienState === true) {
        interval = setInterval(ennemy, 5000);
    }
}
function restart() {
    clickState = false;
    alienState = false;
    tabE = [];
    compteScore = 0;
    clearInterval(interval);
}
// FINCTION POUR GERER LA DIFFICULTE
let clickState;
let alienState;
function difficultyMode() {
    if ($(this).text() === "Easy" || $(this).text() === "Normal") {
        clickState = false;
        $('#field').css('border', '0px solid transparent');
    }
    else {
        clickState = true;
        $('#field').css('border', '2px solid red');
    }
    if ($(this).text() === "Easy" || $(this).text() === "Hardcore")
        alienState = false;
    else
        alienState = true;
}
function affichageBtn() {
    if ($('#diffbtn').css('display') === "inline") {
        $('#buttontext').css('display', 'flex');
        $('#diffbtn').css('display', 'none');
    }
    else if ($('#buttontext').css('display') === "flex") {
        $('#buttontext').css('display', 'none');
        $('#btnR').css('display', 'inline');
        $('.build-container').css('display', 'inline');
    }
    else if ($('#btnR').css('display') === "inline-block") {
        $('#diffbtn').css('display', 'inline');
        $('#btnR').css('display', 'none');
        $('.build-container').css('display', 'none');
    }
}
// gestion des keypress
$("*").keydown(function (event) {
    keys(event, abo);
});
// Gestion niveau 2
$('#btnV').click(start).click(affichageBtn);
$('#btnE').click(difficultyMode).click(affichageBtn);
$('#btnN').click(difficultyMode).click(affichageBtn);
$('#btnH').click(difficultyMode).click(affichageBtn);
$('#btnL').click(difficultyMode).click(affichageBtn);
$('#btnR').click(restart).click(affichageBtn);
// VERIF FORMULAIRE
$('#text1').change(verifForm);
function verifForm() {
    if ($('#text1').val() !== undefined) {
        $('#btnV').prop('disabled', false);
    }
}
//# sourceMappingURL=snakeTS.js.map