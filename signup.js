const head = document.getElementById('validation');

const day = new Date();

const Y = day.getFullYear() - 18;
const m = day.getMonth() + 1;
const d = day.getDate();
console.log(Y);
let giorno;
const date = document.querySelector('input#date');
if(m<10 && d<10){
    giorno = Y + "-0" + m + "-0" + d;
    date.setAttribute('max', giorno);
} else if(m>10 && d<10){
     giorno = Y + "-" + m + "-0" + d;
     date.setAttribute('max', giorno);
        } else if(m>10 && d>10) {
            giorno = Y + "-" + m + "-" + d;
            date.setAttribute('max', giorno);
        } else {
            giorno = Y + "-0" + m + "-" + d;
            date.setAttribute('max', giorno);
        }



function validazione(event) {
head.innerHTML='';
const pass = document.getElementById('pass');
pass.innerHTML='';
const email = document.getElementById('email');
email.innerHTML='';
const date = document.getElementById('date');
date.innerHTML='';
pass.classList.add('errore');
email.classList.add('errore');
date.classList.add('errore');
    if (input.name.value.length == 0 || input.surname.value.length == 0 || input.email.value.length == 0 || input.birthdate.value.lenght==0 || input.username.value.length == 0 || input.password.value.length == 0 || input.confirmpassword.value.length == 0) {
        const p = document.createElement('p');
        p.classList.add('errore');
        p.textContent='Non hai compilato tutti i campi.';
head.appendChild(p);
console.log('1');
        event.preventDefault();
    }else{ 
        if (input.password.value !== input.confirmpassword.value) {
            console.log('2');
    pass.textContent='Le password non corrispondono.';
        event.preventDefault();
    }else{
        console.log('3');
       if(!validaPass()){
        const p = document.createElement('p');    
        p.textContent='La password deve contenere almeno 8 caratteri alfanumerici!';
    head.appendChild(p);
    p.classList.add('errore');
    event.preventDefault();
       }
        
    }
     if (!validazione_email(input.email.value)) {
        console.log('4');
    email.textContent='Inserisci un indirizzo e-mail valido.';
        event.preventDefault();
    } 
   /* if(!validaDate(input.birthdate.value)){
        console.log('5');
        date.textContent='Inserisci la data nel formato indicato.';
event.preventDefault();
    }*/
}
}
function validaDate(date){
    const espressione = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
    if (!espressione.test(date)) return false;
    else return true;
}
function validazione_email(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) return false;
    else return true;
}

const input = document.querySelector('form');
input.addEventListener("submit", validazione);

function validaPass(event){
const reg = /^[a-zA-Z0-9_]+$/
if((input.password.value.length<8  || !reg.test(input.password.value))&& input.password.value.length!==0)return false;
    else return true;/*{    
    event.preventDefault();
        const p = document.createElement('p');
    
    p.textContent='La password deve contenere almeno 8 caratteri alfanumerici!';
head.appendChild(p);
    }*/
}
    



const menu = document.querySelector('#menu');
menu.addEventListener('click', showMenu)

function showMenu(event){
    const menu= event.currentTarget;
    console.log(menu);
const nav1 = document.getElementById('first');
    menu.classList.add('hidden');
    menu.classList.remove('showmenu');
    const cont = document.createElement('div');
    const div1 = document.createElement('div');
    div1.setAttribute('data-index', '1'); 
    const div2 = document.createElement('div')
    div2.setAttribute('data-index', '2');
   
    cont.appendChild(div1);
    cont.appendChild(div2);
    cont.classList.add('aprimenu');
    nav1.appendChild(cont);
    const nav= document.getElementById('second');
    nav.classList.add('scrolling');
    const aprimenu = document.querySelector('.aprimenu');
    aprimenu.addEventListener('click', closeMenu);
}

function closeMenu(event){
    event.currentTarget.remove();
    menu.classList.remove('hidden');
    menu.classList.add('showmenu');
    const nav= document.getElementById('second');
    nav.classList.remove('scrolling');
}