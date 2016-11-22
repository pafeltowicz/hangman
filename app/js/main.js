(function () {
    String.prototype.setChar = function (place, char) {
        if (place > this.length - 1) {
            return this.toString();
        } else {
            return this.substr(0, place) + char + this.substr(place + 1)
        }
    }

    var pass = '';

    var passArray = ['I love JS', 'Bez pracy nie ma nic', 'Co nas nie zabije to nas wzmocni'];
    var alphabet = 'aąbcćdeęfghijklłmnńoóprsśtuvwxyzżź';
    var alphabetDOM = document.querySelector('#alphabet');
    var img = document.querySelector('#image img');

    var no = document.querySelector('#no');
    var yes = document.querySelector('#yes');
    var win = document.querySelector('#win');
    var woop = document.querySelector('#woop');

    var missed = 0;

    var hidePass = '';

    function passHide() {
        hidePass = '';
        for (var i = 0; i < pass.length; i++) {
            if (pass.charAt(i) == ' ') {
                hidePass += ' ';
            } else {
                hidePass += '-';
            }
        }
    }
    
    function generatePass() {
        var randomPass = getRandomInt(0, passArray.length-1);
        pass = passArray[randomPass];
        pass = pass.toUpperCase();
    }

    function passRefresh() {
        var board = document.querySelector('#board');
        board.textContent = hidePass;
    }

    function generateAlphabet() {
        for (var i = 0; i < alphabet.length; i++) {
            var button = createButton(alphabet.charAt(i).toUpperCase(), i);
            alphabetDOM.appendChild(button);
        }
    }

    function createButton(text, id) {
        var button = document.createElement('a');
        button.setAttribute('href', '#');
        button.textContent = text;
        button.id = id;
        button.classList.add('btn');

        button.addEventListener('click', check, false);
        return button;
    }

    function isMissed() {
        if (missed >= 9) {
            return true;
        } else {
            return false;
        }
    }

    function isWinner() {
        if(hidePass == pass){
            return true;
        }
    }

    function check(event) {
        event.preventDefault();
        var button = this;
        var success = false;
        for (var i = 0; i < alphabet.length; i++) {
            if (pass.charAt(i) === alphabet.charAt(button.id).toUpperCase()) {
                hidePass = hidePass.setChar(i, alphabet.charAt(button.id).toUpperCase());
                success = true;
            }
        }
        if (success === true) {
            button.style.background = 'green';
            button.style.pointerEvents = 'none';
            yes.play();
            passRefresh();
        } else {
            missed++;
            no.play();
            button.style.background = 'red';
            button.style.pointerEvents = 'none';
            button.removeEventListener('click', check);
            img.setAttribute('src', 'images/s' + missed + '.jpg');
        }
        if (isMissed()){
            woop.play();
            tryAgain('Przegrałeś!', pass);
        } else if (isWinner()){
            win.play();
            tryAgain('Wygrałeś', pass);
        }

    }

    function tryAgain(text, password) {
        while( alphabetDOM.hasChildNodes() ){
            alphabetDOM.removeChild(alphabetDOM.lastChild);
        }
        var info = document.createElement('h1');
        var tryAgain = document.createElement('a');
        var passwordDOM = document.createElement('p');
        tryAgain.textContent = 'Jeszcze raz?';
        tryAgain.classList.add('btn-try');
        info.textContent = text;
        passwordDOM.textContent = password;
        tryAgain.setAttribute('href', '#');
        tryAgain.addEventListener('click', function () {
            while( alphabetDOM.hasChildNodes() ){
                alphabetDOM.removeChild(alphabetDOM.lastChild);
            }
            missed = 0;
            img.setAttribute('src', 'images/s' + missed + '.jpg');
            init();
        }, false);
        alphabetDOM.appendChild(info);
        alphabetDOM.appendChild(passwordDOM);
        alphabetDOM.appendChild(tryAgain);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function init() {
        generatePass();
        passHide();
        passRefresh();
        generateAlphabet();
    }

    init();


}());


