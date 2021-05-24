const data = new Date();
let Y, m, d;
Y = data.getFullYear();
m=data.getMonth() + 1;
d=data.getDate()-1;
let codeALPHA3;
let  codeALPHA2;
let day;
let day1;
let d1=d;
let d2=d1-1;
let name_country;

for( const c of content){
    const contenitore = document.querySelector('#cont');
    const item = document.createElement('div');
    const img = document.createElement('img');
    const header = document.createElement('h1');
    const desc = document.createElement('p');
    desc.textContent=c.descrizione;
    img.src=c.immagine;
    header.textContent=c.titolo
    item.appendChild(img);
    item.appendChild(header);
    item.appendChild(desc);
    item.classList.add('item');
    contenitore.appendChild(item);
}

const items = document.querySelectorAll('.item');
const a = document.createElement('a');
a.textContent='Apri mappa';
items[0].appendChild(a);
const a2 = document.createElement('a');
a2.textContent='Prenota';
a2.href='login.php';
items[1].appendChild(a2);
const a1 = document.createElement('a');
a1.textContent='Scopri di più...';
items[2].appendChild(a1);
a1.href='mhw2.php';

const map = items[0].querySelector('a');
map.addEventListener('click', onMaps);

function onMaps(event){
  const iframe = document.querySelector('iframe.hidden');
 const txt = event.currentTarget;
 txt.textContent='Chiudi mappa';
 txt.addEventListener('click', removeMap);
  iframe.classList.remove('hidden');
  event.currentTarget.removeEventListener('click', onMaps);

}
function removeMap(event){
   const txt = event.currentTarget;
   txt.addEventListener('click', onMaps);
   txt.textContent= 'Apri mappa';
   const frame = document.querySelector('iframe');
   frame.classList.add('hidden');
}
function refresh(){
    window.location.reload();
}

function data_not_found(){
    const div = document.querySelector('#info');
        const button = document.createElement('button');
         const notfound = document.createElement('p');
         notfound.textContent= 'Dati non disponibili';
     button.textContent='Aggiorna pagina';
     
         div.appendChild(notfound);
     div.appendChild(button);
     button.addEventListener('click', refresh);
}

function onResponse(response){
    return response.json();
}

function onJson(json){  
    console.log(json);
    const  c = json.data[0];
    const selection = document.querySelector('select').value;
    if(c!==undefined && c.lenght!=='0'){
    if(c.country_module!==undefined) {
        codeALPHA2=c.country_module.global.alpha2;
    const div = document.querySelector('#info');
    const Dati  = document.createElement('h1');
    Dati.textContent = 'Aggiornato al giorno ' +  d1 + '-' + m + '-' + Y;
div.appendChild(Dati);
const flag = document.createElement('img');
flag.src='http://www.geognos.com/api/en/countries/flag/' + codeALPHA2 + '.png';
div.appendChild(flag);
    } else{
        data_not_found();
    }
}
    if(c!==undefined && c.lenght!=='0'){ 
        if(c.country_module!==undefined) {
            name_country= c.country; 
            if(selection==='dati_totali'){    
     
            
   fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + name_country)
   .then(onResponse)
    .then(onJson1); 
 } else if(selection==='dati_giornalieri'){    
     console.log(json);
    fetch('https://covid-api.mmediagroup.fr/v1/history?country=' + name_country + '&status=confirmed')
    .then(onResponse)
     .then(onJson2); 
     } else {
        console.log(json);  
    codeALPHA2=c.country_module.global.alpha2;
    fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=' + name_country )
    .then(onResponse)
     .then(onJson4);
   }
} else {
    data_not_found();
  }
} else {
    data_not_found();
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', search);

function search(event){
    event.preventDefault();
    const div = document.querySelector('#info');
    div.innerHTML='';
     const country = document.querySelector('input').value;
    console.log(country);
    if(country!==''){  
         fetch('http://localhost/HW1/APIRest.php?country=' + country)
                    .then(onResponse)
                    .then(onJson);
    }
}

    function onJson1(json){
        console.log(json);
        const div = document.querySelector('#info');
        if(json.All!==undefined){
       const conf = json.All.confirmed;
       const deaths = json.All.deaths;
          console.log(conf);
          console.log(deaths);
          if(conf!==undefined && deaths!==undefined){
const Confermati  = document.createElement('p');
Confermati.textContent='Confermati: ' + conf;
div.appendChild(Confermati);
const ConfermatiDeaths = document.createElement('p');
ConfermatiDeaths.textContent='Deceduti: ' + deaths;
div.appendChild(ConfermatiDeaths);
            }  
        }
     }

        
function onJson2(json){ 
    const info = document.querySelector('#info');
   console.log(json);
   if(m<10 && d1<10 && d2<10){
    day = Y + "-0" + m + "-0" + d1;
    day1 = Y + "-0" + m + "-0" + d2;
} else if(m>10 && d1<10 && d2<10){
     day = Y + "-" + m + "-0" + d1;
     day1 = Y + "-" + m + "-0" + d2;
        } else if(m>10 && d1>10 && d2>10) {
            day = Y + "-" + m + "-" + d1;
            day1 = Y + "-" + m + "-" + d2;
        } else {
            day = Y + "-0" + m + "-" + d1;
            day1 = Y + "-0" + m + "-" + d2;
        }  console.log(day)  ;            
           if(json.All!==undefined){
                if(json.All.dates[day]!==undefined){
                const diff_conf = json.All.dates[day] - json.All.dates[day1];
                
                if(diff_conf!==undefined){
                const div = document.querySelector('#info');
               const Confermati  = document.createElement('p');
            Confermati.textContent='Nuovi casi giornalieri: ' + diff_conf;
            div.appendChild(Confermati);
            fetch('https://covid-api.mmediagroup.fr/v1/history?country=' + name_country + '&status=deaths')
   .then(onResponse)
    .then(onJson3);
            } }else {
                const not= document.createElement('p');
                not.textContent='I dati non sono ancora disponibili';
               info.appendChild(not);
            }
        }}

        function onJson3(json){
            const info = document.querySelector('#info');
            if(m<10 && d1<10 && d2<10){
                day = Y + "-0" + m + "-0" + d1;
                day1 = Y + "-0" + m + "-0" + d2;
            } else if(m>10 && d1<10 && d2<10){
                 day = Y + "-" + m + "-0" + d1;
                 day1 = Y + "-" + m + "-0" + d2;
                    } else if(m>10 && d1>10 && d2>10) {
                        day = Y + "-" + m + "-" + d1;
                        day1 = Y + "-" + m + "-" + d2;
                    } else {
                        day = Y + "-0" + m + "-" + d1;
                        day1 = Y + "-0" + m + "-" + d2;
                    }
                   
                    console.log(json.All.dates[day]);       
                if(json.All!==undefined){
                    if(json.All.dates[day]!==undefined){
                        console.log(json.All.dates[day]);
                        const diff_d = json.All.dates[day] - json.All.dates[day1];
                        if(diff_d!==undefined){
                        const div = document.querySelector('#info');          
                        const ConfermatiDeaths = document.createElement('p');
                    ConfermatiDeaths.textContent= 'Nuovi decessi giornalieri: ' + diff_d;
                    div.appendChild(ConfermatiDeaths);
                        } }else {
                            const not= document.createElement('p');
                            not.textContent='I dati non sono ancora disponibili';
                           info.appendChild(not);
                        }
        }
                }
            
        function onJson4(json){
            console.log(json.All);
            const info = document.querySelector('#info')
            if(json.All!==undefined){
            const numberVacc=json.All.people_vaccinated;
            const numberVaccPart=json.All.people_partially_vaccinated;            
            const vacc_part = document.createElement('p');
            vacc_part.textContent='Popolazione vaccinata parzialmente (1° dose): ' + numberVaccPart;  
            const vacc= document.createElement('p');
            vacc.textContent='Popolazione vaccinata (2° dose): ' + numberVacc;
            info.appendChild(vacc_part);
            info.appendChild(vacc);
        } else {
            const not_vacc= document.createElement('p');
            not_vacc.textContent='Il Paese cercato non ha iniziato una campagna vaccinale!';
           info.appendChild(not_vacc);
        }
        }

        const menu = document.querySelector('#menu');
        menu.addEventListener('click', showMenu)

        function showMenu(event){
            const menu= event.currentTarget;
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