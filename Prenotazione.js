const  section = document.querySelector('section');
const article = document.querySelector('article');

function onJSON(json) {
    console.log(json);
    if(json===false){
        const main=document.querySelector('div#mainprenotazione');
        main.classList.add('hidden');
        const p = document.createElement('p');
        p.classList.remove('hidden');
        p.textContent='Riepilogo prenotazione:';
        p.classList.add('hide');
        section.appendChild(p);
        fetch("http://localhost/HW1/Recupero_dati.php").then(onResponse).then(onJson1);
    }

}
function onJson1(json){
    console.log(json);

    const div = document.createElement('div');   
     div.classList.remove('hidden');
    section.appendChild(div);
    const par = document.createElement('p');
    par.textContent='Nome: ' + json[0].nome;
    div.appendChild(par);
    const par1 = document.createElement('p');
    par1.textContent='Cognome: ' + json[0].cognome;
    div.appendChild(par1);
    const par2 = document.createElement('p');
    par2.textContent='Data di nascita: ' + json[0].data_nascita;
    div.appendChild(par2);
    const par3 = document.createElement('p');
    par3.textContent='E-mail: ' + json[0].email;
    div.appendChild(par3);
    const par4 = document.createElement('p');
    par4.textContent='Codice Fiscale: ' + json[0].CF.toUpperCase();
    div.appendChild(par4);
    const par5 = document.createElement('p');
    par5.textContent='Codice Prenotazione: ' + json[0].cod;
    div.appendChild(par5);
    const par6 = document.createElement('p');
    par6.textContent='Preferenza vaccino: ' + json[0].vaccino;
    div.appendChild(par6);
    const canc = document.createElement('p');
canc.setAttribute('data-id', 'cancella');
canc.textContent='Cancella prenotazione';
div.appendChild(canc);
    const pp = document.createElement('p');
    pp.textContent='È stata inviata una mail in cui sono presenti data e ora della convocazione per la prima somministrazione del vaccino.';
    div.appendChild(pp);
    pp.classList.add('mail');
    pp.setAttribute('data-id', 'paragrafo');
    div.classList.add('dati');
canc.addEventListener('click', cancellaPrenotazione);
}

function cancellaPrenotazione(){
    const hide = document.querySelector('.mail');
hide.classList.add('hidden');
hide.classList.remove('mail');
    const mail =document.createElement('div');
    mail.classList.add('mail');
    const modal_p=document.createElement('p');
    modal_p.textContent='Sei sicuro di voler cancellare la prenotazione?';
const conf= document.createElement('div');
const modal_div=document.createElement('div');
const si = document.createElement('p');
const annulla = document.createElement('p');
si.textContent='Si';
annulla.addEventListener('click', onReturn);
si.addEventListener('click', onDelete);
annulla.textContent='Annulla';
conf.appendChild(si);
conf.appendChild(annulla);
modal_div.appendChild(modal_p);
modal_div.appendChild(conf);
modal_div.classList.add('conf');
mail.appendChild(modal_div);
section.appendChild(mail);
//mettilo sotto
    
}
function onDelete(){
const div = document.querySelector('section div.dati');
div.classList.add('hidden');
const div1 = document.querySelector('p.hide');
div1.classList.add('hidden');
const div2 = document.querySelector('div.conf');
div2.classList.add('hidden');
const h1 = document.getElementById('prenotazione');
if(h1!==null)
h1.classList.add('hidden');
const main = document.querySelector('div#mainprenotazione');
main.classList.remove('hidden');

fetch("http://localhost/HW1/cancella_prenotazione.php").then(onResponse1);
}

function onReturn(event){
    const parent = event.currentTarget.parentNode.parentNode.parentNode;
    parent.innerHTML='';
    const mail = document.querySelector('.mail');
    mail.innerHTML='';
const box=document.querySelector("p[data-id='paragrafo']");
box.classList.remove('hidden');
box.classList.add('mail');

}

function onResponse1(response) {
    console.log(response);
}
function onResponse(response) {
    return response.json();
}

fetch("http://localhost/HW1/recupero_user.php").then(onResponse).then(onJSON);
function validazioneCF(event){
    const comp = document.getElementById('compila');
    comp.innerHTML='';
    comp.classList.add('msg');
    const Cod = document.getElementById('CF');
    Cod.innerHTML='';
    Cod.classList.add('msg');
  const pattern = /^[A-Za-z]{6}[0-9]{2}[A-Za-z][0-9]{2}[A-Za-z][0-9]{3}[A-Za-z]$/;  
  if(form.CF.value.length===0 || form.vaccino.value.length===0){
      comp.textContent='Compila tutti i campi!';
      event.preventDefault();
  } else if(!pattern.test(form.CF.value)){
    Cod.textContent='Formato non valido';
      event.preventDefault();
  }
  
}

const form=document.querySelector('form');
form.addEventListener('submit', validazioneCF)