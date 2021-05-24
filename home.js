const article = document.querySelector('article');
const img1 = document.createElement('img');
const img2 = document.createElement('img');
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div1a = document.createElement('div');
const div2a = document.createElement('div');
const head1 = document.createElement('a');
const head2 = document.createElement('a');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
img1.src='vaccino.jpg';
img2.src='esami.jpg'
div1a.appendChild(img1);
div2a.appendChild(img2);
article.appendChild(div1);
article.appendChild(div2);
head1.textContent= 'PRENOTA UN VACCINO';
head2.textContent= 'PRENOTA UN TICKET';
//metti i riferimenti alle pagine
head1.href= 'Prenotazione.php';
head2.href= 'ticket.php';
div1a.appendChild(head1);
div2a.appendChild(head2);
div1.appendChild(div1a);
div2.appendChild(div2a);
p1.textContent='Inserendo i tuoi dati, potrai prenotare un vaccino contro la malattia da coronavirus(COVID-19). Inoltre sarà possibile indicare quale sia la preferenza riguardo al vaccino.';
p2.textContent='Prenota un ticket e salta la fila! In questo modo verrà fornito un numero che permetterà di evitare la coda allo sportello. '
div1.appendChild(p1);
div2.appendChild(p2);