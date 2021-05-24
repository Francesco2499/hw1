const form = document.querySelector('form');
const section=document.getElementById('riepilogo');
console.log(form.cellulare.value);
const day = new Date();

const Y = day.getFullYear();
const m = day.getMonth() + 1;
const d = day.getDate() + 1;
console.log(Y);
let giorno;
const date = document.querySelector('input#date');
if(m<10 && d<10){
    giorno = Y + "-0" + m + "-0" + d;
    date.setAttribute('min', giorno);
} else if(m>10 && d<10){
     giorno = Y + "-" + m + "-0" + d;
     date.setAttribute('min', giorno);
        } else if(m>10 && d>10) {
            giorno = Y + "-" + m + "-" + d;
            date.setAttribute('min', giorno);
        } else {
            giorno = Y + "-0" + m + "-" + d;
            date.setAttribute('min', giorno);
        }
    fetch('http://localhost/HW1/Check_user_Ticket.php').then(onResponse).then(onjson);


    function onResponse(response){
        return response.json();
    }
function onjson(json){
    console.log(json);
        if(json===false){
    fetch('http://localhost/HW1/RecuperaDatiTicket.php').then(onResponse).then(onjson1);
       const main=document.querySelector('main');
       main.classList.add('hidden');
       const err = document.getElementById('error');
       err.classList.add('hidden');
       }
}
function onjson1(json){
    section.innerHTML='';
    console.log(json);
 const sec = document.createElement('div');
 const h2=document.createElement('h2');
 h2.textContent="Dettagli prenotazione";
 sec.appendChild(h2);
    let p = document.createElement('p');
    p.textContent="Nome: " + json[0].nome;
    sec.appendChild(p);
     p = document.createElement('p');
    p.textContent="Cognome: " + json[0].cognome;
    sec.appendChild(p);
 p = document.createElement('p');
    p.textContent="Cellulare: " + json[0].cellulare;
    sec.appendChild(p);
  p = document.createElement('p');
    p.textContent="Codice Ticket: " + json[0].codTicket;
    sec.appendChild(p);
    p = document.createElement('p');
    const d = new Date(json[0].Data + " " + json[0].orario);
    console.log(d.getMinutes());
    if(d.getHours()<10 && d.getMinutes()<10){
        console.log('1');
    p.textContent="Data e orario prenotazione: " + json[0].Data + "  0" + d.getHours() + ":0" + d.getMinutes();
    }else if(d.getHours()>=10 && d.getMinutes()<10){
        console.log('2');
        p.textContent="Data e orario prenotazione: " + json[0].Data + "  " + d.getHours() + ":0" + d.getMinutes();
    }else if (d.getHours()>=10 && d.getMinutes()>=10){
        console.log('3');
        p.textContent="Data e orario prenotazione: " + json[0].Data + "  " + d.getHours() + ":" + d.getMinutes();
    }else{
        console.log('4');
        p.textContent="Data e orario prenotazione: " + json[0].Data + "  0" + d.getHours() + ":" + d.getMinutes();
    }
    sec.appendChild(p);
    p = document.createElement('p');
    p.textContent="E-mail:  " + json[0].email;
    sec.appendChild(p);
    

    p = document.createElement('p');
    p.textContent="Cancella prenotazione";
    p.classList.add('buttonred');
    p.addEventListener("click", onConfirm);
    sec.appendChild(p);
    section.appendChild(sec);
}

function onConfirm(){
const sect = document.getElementById('riepilogo');
const cont= document.createElement('div');
cont.classList.add('cert');
sect.appendChild(cont);
const p=document.createElement('p');
p.textContent='Sei sicuro di voler cancellare la prenotazione?';
cont.appendChild(p);
const cont1= document.createElement('div');
cont.appendChild(cont1);
const p1=document.createElement('p');
p1.textContent='Si';
p1.addEventListener('click', onDelete);
p1.classList.add('point');
const p2=document.createElement('p');
p2.textContent='Annulla';
p2.addEventListener('click', onReturn);
p2.classList.add('point');
cont1.appendChild(p1);
cont1.appendChild(p2);
}

function onReturn(event){
   const p= event.currentTarget;
   const cont = p.parentNode.parentNode;
   cont.remove();
}

function onDelete(){
const sect = document.getElementById('riepilogo');
sect.innerHTML='';

const main=document.querySelector('main');
       main.classList.remove('hidden');
       const err = document.getElementById('error');
       err.classList.remove('hidden');
       fetch("http://localhost/HW1/EliminaTicket.php").then(onResponse1);
}
function onResponse1(response){
    return response;
}


form.addEventListener('submit', validazione);

function validazione(event){
if(form.cellulare.value.length===0 || form.data.value.length===0  || form.orario.value.length===0 ){
event.preventDefault();
const s = document.getElementById('error');
        s.innerHTML='';
    const h2= document.createElement('h2');
    h2.classList.add('err');
    h2.textContent="Compila i campi";
    s.appendChild(h2);

}else if(!validaCell(form.cellulare.value)){
    event.preventDefault();
const s = document.getElementById('error');
        s.innerHTML='';
    const h2= document.createElement('h2');
    h2.classList.add('err');
    h2.textContent="Numero di cellulare non valido";
    s.appendChild(h2);

}

}
function validaCell(cell){
    const espressione = /^[0-9]{10}/;
    if (!espressione.test(cell)) return false;
    else return true;
}
