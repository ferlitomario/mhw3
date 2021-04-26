// 1- In questa sezione creo i contenitori dinamici e vado a inserire gli elementi dentro di essi come titolo,descrizione ecc.



// CREAZIONE DIV CONT
for(let i=0;i<CONTENUTI.length;i++) {
    const div_cont=document.createElement('div');
    div_cont.classList.add('cont');
    div_cont.id=1;

    const struct= document.querySelector('.struttura');
    struct.appendChild(div_cont);
}


// CREAZIONE DIV HEAD
for(let i=0;i<CONTENUTI.length;i++) {
    const div_head= document.createElement('div');
    div_head.classList.add('head');

    const conte=document.querySelectorAll('.cont');
    conte[i].appendChild(div_head);
}


// CREAZIONE CONTENUTO DINAMICO
for (let i=0;i<CONTENUTI.length;i++) {
    const new_h1= document.createElement('h1');
    new_h1.textContent=CONTENUTI[i].titolo;
    const prefe = document.createElement('img');
    prefe.src = "favorites.png";
    prefe.classList.add('prefe');

    const inte=document.querySelectorAll('.head');
    inte[i].appendChild(new_h1);
    inte[i].appendChild(prefe);

    const new_img=document.createElement('img');
    new_img.src=CONTENUTI[i].immagine;
    const conte=document.querySelectorAll('.cont');
    conte[i].appendChild(new_img);

    const descr= document.createElement('p');
    descr.textContent= CONTENUTI[i].descrizione;
    descr.classList.add('hidden');
    conte[i].appendChild(descr);

    const testo=document.createElement('h3');
    testo.textContent="Leggi la descrizione";
    conte[i].appendChild(testo);
}


// 2- In questa sezione vado ad implementare la sezione preferiti in cui l'utente potrà scegliere le sue destinazioni.

let destinazioni_preferite=[];//LISTA NELLA QUALE VENGONO AGGIUNTE DESTINAZIONI PREFERITE AGGIUNTI TRA I PREFERITI


function controlla_sez_prefe(){
	const section_prefe=document.querySelector('#sez_prefe');

			//SE LA LISTA DESTINAZIONI PREFERITE E' VUOTA LA SEZIONE SCOMPARE
	if(destinazioni_preferite.length===0){
		section_prefe.classList.add('hidden');
	} else{
		section_prefe.classList.remove('hidden');
	}
}


function Remove(){
	console.log("Sono stato rimosso dai preferiti");
	console.log(destinazioni_preferite);

	const ref=document.querySelector('#sez_prefe');
	const ref2=event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	console.log(ref2);
	//controllo se l'evento è avvenuto sui preferiti
	if (ref===ref2){
	event.currentTarget.src="favorites.png";

	const conte=document.querySelectorAll('.struttura .cont');
	for(cont of conte){
		id=event.currentTarget.parentNode.parentNode.dataset.indice;
		if(id===cont.dataset.indice){
			cont.querySelectorAll('img');
			cont[0].src="favorites.png";
		}
	}



	event.currentTarget.removeEventListener('click',Remove);
	event.currentTarget.addEventListener('click',Preferiti);
	const id=event.currentTarget.parentNode.parentNode.dataset.indice;
	for (destinazioni of destinazioni_preferite){
		if(destinazioni.ind===id){
			const eliminaind=destinazioni_preferite.indexOf(destinazioni);
			destinazioni_preferite.splice(eliminaind,1);
		}
	}

	}
	event.currentTarget.src="favorites.png";
	event.currentTarget.removeEventListener('click',Remove);
	event.currentTarget.addEventListener('click',Preferiti);
	destinazioni_preferite.pop(event.currentTarget.parentNode.parentNode);

	controlla_sez_prefe();

}

function Preferiti(event){
	console.log("Sono stato aggiunto ai preferiti" + event.currentTarget.parentNode.parentNode.dataset.indice);
	event.currentTarget.src="remove.jpg";
	event.currentTarget.removeEventListener('click',Preferiti);
	event.currentTarget.addEventListener('click',Remove);

	const indice=(event.currentTarget.parentNode.parentNode).dataset.indice;



	//prendo l'elemento corrispondente all'indice nella struttura iniziale
	const elemento=CONTENUTI[indice];


	//costruisco una mappa che contiene il contenuto dell'elemento scelto come preferito
	const oggetto_preferito={
		titolo:elemento.titolo,
		immagine:elemento.immagine,
		ind: indice
	};


	//ho un array composto da titolo,immagine e indice dei preferiti
	destinazioni_preferite.push(oggetto_preferito);
	console.log(destinazioni_preferite);

	//si occupa di far apparire e sparire la sezione dei preferiti
	controlla_sez_prefe();

	const CONTENUTI= document.querySelector('#sez_prefe div');
	CONTENUTI.innerHTML='';

//per ogni elemento presente nell'array creo un elemento da mettere poi nei preferiti
for (let i=0;i<destinazioni_preferite.length;i++){
			const new_cont=document.createElement('div');//creo l'elemento contenitore
			new_cont.classList.add('cont');
			new_cont.dataset.ind=destinazioni_preferite[i].ind;

			const sez=document.querySelector('#sez_prefe div');
			sez.appendChild(new_cont);//appendo il contenitore nella sezione preferiti

			const new_head=document.createElement('div');
			new_head.classList.add('head');

			const cont=document.querySelectorAll('#sez_prefe .cont');

			cont[i].appendChild(new_head);//creo il contenitore e l'intestazione di un singolo film preferito e appendo
//in questo modo, a seconda della lunghezza dell'array creo i vari div contenitori e gli head

			const new_titolo=document.createElement('h1');
			new_titolo.textContent=destinazioni_preferite[i].titolo;

			const rem=document.createElement('img');
			rem.src="remove.jpg";
			rem.classList.add('prefe');
			rem.addEventListener('click',Remove);

			const head_rif=document.querySelectorAll('.head');
			head_rif[i].appendChild(new_titolo);
			head_rif[i].appendChild(rem);

			const imm=document.createElement('img');
			imm.src=destinazioni_preferite[i].immagine;
			cont[i].appendChild(imm);

		}

}


//FUNZIONI RELATIVE ALLA DESCRIZIONE.OK
function VisualizzaMeno(){
	event.currentTarget.textContent="Leggi la descrizione!";
	const mostra= event.currentTarget.parentNode.querySelector('p');
	mostra.classList.add('hidden');
	event.currentTarget.addEventListener('click',MostraDescrizione);
	event.currentTarget.removeEventListener('click', VisualizzaMeno);
}
function MostraDescrizione(){
	event.currentTarget.textContent="Mostra di meno!";
	const mostra= event.currentTarget.parentNode.querySelector('p');
	mostra.classList.remove('hidden');
	event.currentTarget.removeEventListener('click',MostraDescrizione);
	event.currentTarget.addEventListener('click', VisualizzaMeno);
}
//AGGIUNGE UN EVENT LISTENER SUI PREFERITI.OK
const pref=document.querySelectorAll('.prefe');
for (preferiti of pref){
preferiti.addEventListener('click',Preferiti);
}
//EVENTO SULLA DESCRIZIONE.OK
const de=document.querySelectorAll('.struttura h3')
for(descrizione of de){

	descrizione.addEventListener('click',MostraDescrizione);
}

//3- implementazione della barra di ricerca per trovare più velocemente le mete desiderate.

//EVENTO SULLA BARRA DI RICERCA Sto implementando la ricerca per ogni destinazione.
const barra=document.querySelector('header input');
//console.log(barra);
barra.addEventListener('keyup',Barra_di_Ricerca);

//OK FUNZIONA
function Barra_di_Ricerca(event){
		const ricerca=event.currentTarget.value.toLowerCase();
		//console.log(ricerca);
		if (ricerca===''){
			const cont=document.querySelectorAll('.struttura .cont');

			for(contenitore of cont){
				contenitore.classList.remove('nascondi');
			}
			controlla_sez_prefe();
		} else{
			const cont=document.querySelectorAll('.struttura .cont');
			console.log(cont);
			for (contenitore of cont) {
				contenitore.classList.add('nascondi');
			}
			console.log("La parola immessa in input è." + ricerca);
			for(let i=0;i<cont.length;i++){
			 const titolo=cont[i].querySelector('h1').textContent.toLowerCase();
			 //console.log(titolo);
			 if(titolo.indexOf(ricerca)!==-1){
					cont[i].classList.remove('nascondi');
			}
		}
	}
}



// -4 IMPLEMENTAZIONI DELLE API

// API quarantine per avere dati sul covid per ogni nazione in tempo reale


const endpoint= 'https://api.quarantine.country/api/v1/summary/region?region=';


var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};



  const form = document.querySelector(".DatiC")
  form.addEventListener("submit", search)

  function search (event){
    event.preventDefault()
    const content = document.querySelector("#CoronaV");
    const  value = content.value
    console.log('letto');

    if(!content){
      alert("Inserisci testo nella casella")
    }
    else{
      const text = encodeURIComponent(value)
      const request = endpoint + value;
      fetch(request).then(Onresponse).then(Onjsontotal_cases)
    }
  }

function Onresponse (response){
  return response.json()
}

function Onjsontotal_cases (json){
  console.log(json);
   const result = json.data.summary.total_cases;
   console.log(result);
   const cases = document.querySelector("h3");
   cases.textContent= "CASI TOTALI:"+result;

   const result2= json.data.summary.deaths;
   console.log(result2);
   const deaths = document.querySelector("h4");
   deaths.textContent = "MORTI TOTALI:"+result2;

}




// API2 ABSTRACT per la geolocalizzazione dell'utente



key='c626fc09ea9b4e71ad94c5622c5f6733';
https://ipgeolocation.abstractapi.com/v1/


  fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=c626fc09ea9b4e71ad94c5622c5f6733").then(onresponse).then(onjsonIP)


     function onresponse (response){
       return response.json()
     }


     function onjsonIP (json){
       console.log(json);
       const result3 = json.city;
       console.log(result3);
       const posizione = document.querySelector(".posizione");
       posizione.textContent = "CITTA':"+result3;


       const result4 = json.continent;
       console.log(result4);
       const continente = document.querySelector(".continente")
       continente.textContent = "CONTINENTE:"+result4;


       const result5 =json.ip_address;
       console.log(result5);
       const ip = document.querySelector(".ip")
       ip.textContent = "IP:"+result5;

     }
