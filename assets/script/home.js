'use strict';

let links = document.querySelectorAll(' nav a'),
    bg = document.querySelector('.link-bg');

function setActive(el) {
    links.forEach(link => {
        link.classList.remove('active')
    });
    el.classList.add('active');
};


links.forEach((link, index) => {
    link.addEventListener('click', e => {
        e.preventDefault();
        bg.style.transform = `translate(${125 * index}px,-50%)`;
        setActive(e.currentTarget);
    })
});


let btn = document.querySelector('.post i');
let grid = document.querySelector('.grid-container');
let items = document.querySelectorAll('.grid-container div');

class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id() { return this.#id };
    get name() { return this.#name };
    get userName() { return this.#userName };
    get email() { return this.#email };

    getInfo() {
        return `ID:${this.#id}<br>
                Name:${this.#name}<br>
                userName:${this.#userName}<br>
                Email:${this.email}`
    }

}
const user = new User('1234567', 'Gen Li', 'Ali', '56789@gmail.com');

let file = document.querySelector('.upfile')
let nameShow = document.querySelector('.picture span')

file.addEventListener('change', function () {
    let fileName = this.files[0].name.trim();
    nameShow.innerHTML = `${fileName}`;
});

let output = document.querySelector('.grid-container div .text');
btn.addEventListener('click', function () {
    let text = document.querySelector('.note textarea').value;
    let item = document.createElement('div');
    let userName = document.querySelector('.userInfo span');
    let newTime = document.querySelector('.time');
    let attach = document.querySelector('.attach');
    let time = new Date();

    userName.innerHTML = user.name;
    newTime.innerHTML = time.toString().substring(0, 15);
    output.innerHTML = text;
    item.innerHTML = attach.innerHTML;
    grid.insertBefore(item, grid.children[0]);

    let photoFile = file.files;
    let reader = new FileReader();
    reader.readAsDataURL(photoFile[0]);
    reader.onload = function () {
        let image = document.createElement('img');
        /* image.width = '500'; */
        image.src = reader.result;
        let items = document.querySelector('.grid-container div');
        items.append(image);
    }
    document.querySelector('.note textarea').value = '';

    item.addEventListener('click', function () {
        grid.removeChild(this);
    });
});



const url = 'https://randomuser.me/api/?inc=name,picture,location&nat=CA&results=10';

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

let recommand = document.querySelector('.stranger');
let box = document.querySelector('.box');
let name2 = document.querySelector('.box p');
let image = document.querySelectorAll('.box div');

async function getUsers() {
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        const users = data.results;
        for(let i = 0; i < users.length; i++) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            recommand.appendChild(div);
            div.innerHTML = `<div class="photo"><img src=${users[i].picture.medium}></div>
                             <div class="info"><h4>${users[i].name.first} ${users[i].name.last}</h4><p>${users[i].location.city} </p></div>
                             <a href="#">+</a>`;
        }
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}
getUsers();
