'use strict';

let enter = document.querySelector('.enter');
let isIn = true;
let isOut = false;

enter.addEventListener('mouseenter', (e) => {
    if (isIn) {
        let inX = e.clientX - e.target.offsetLeft;
        let inY = e.clientY - e.target.offsetTop;
        let el = document.createElement('span');

        el.style.left = inX + 'px';
        el.style.top = inY + 'px';
        enter.appendChild(el);

        document.querySelector('.enter span').classList.remove('out');
        document.querySelector('.enter span').classList.add('in');

        isIn = false;
        isOut = true;
    }
})

enter.addEventListener('mouseleave', (e) => {
    if (isOut) {

        let outX = e.clientX - e.target.offsetLeft;
        let outY = e.clientY - e.target.offsetTop;

        document.querySelector('.enter span').classList.remove('in');
        document.querySelector('.enter span').classList.add('out');

        document.querySelector('.out').style.left = `${outX}px`;
        document.querySelector('.out').style.top = `${outY}px`;

        let span = document.querySelector('.enter span');

        isOut = false;
        setTimeout(() => {
            enter.removeChild(span);
            isIn = true;
        }, 500);
    }
});

let email = document.querySelector('#email');
let password = document.querySelector('#password');
let btn = document.querySelector('.sub');
let tips = document.querySelector('.tips');
const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

btn.addEventListener('click', function () {
    /*   console.log(email.value);
      console.log(password.value); */
    let emailValue = document.querySelector('#email').value.trim();

    if (emailValue.length === 0) {
        tips.style.display = 'block';
    } else if (!emailRegex.test(emailValue)) {
        tips.style.display = 'block';
    } else {
        let arrInfo = getInfo();
        function saveInfo(email, password) {
            const infoObj = {};
            infoObj.email = email;
            infoObj.password = password;

            arrInfo.push(infoObj);

            localStorage.setItem("information", JSON.stringify(arrInfo));
        }
        saveInfo(email.value, password.value);

        function getInfo() {
            const arr = JSON.parse(localStorage.getItem("information"));

            return arr;
        }

        for (let k = 0; k < arrInfo.length; k++) {
            console.log(`email:${arrInfo[k].email} | password:${arrInfo[k].password}`);

        };
        window.open('home.html');
    } 
    


})