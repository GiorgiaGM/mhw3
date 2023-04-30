
function OnJson(json){
    console.log("Json ricevuto");
    console.log(json);
    const sezione=document.querySelector('#opere_visualizzate');
    sezione.innerHTML='';
    let risultati=json.totalResults;
    if(risultati>6){
        risultati=6;
    }
    for(let i=0;i<risultati;i++){
        const items=json.items[i];
        //Leggo il titolo , immagine
        const titolo=items.title;    
        const immagine=items.edmIsShownBy;
        console.log(immagine);
        if(immagine){

            const opera=document.createElement('div');
            const img=document.createElement('img');
            img.src=immagine;
            
            img.addEventListener('click',apriModale);
            const didascalia=document.createElement('span');
            didascalia.textContent=titolo;
            didascalia.classList.add("didascalia");
            opera.appendChild(img);
            opera.appendChild(didascalia);
            sezione.appendChild(opera);
        }         
    }  
}

function onResponse(response){
    console.log("Risposta ricevuta");
    return response.json();
}


function apriModale(event){
    const immagine=document.createElement('img');
    immagine.id='immagine_modale';
    immagine.src = event.currentTarget.src;
	modale.appendChild(immagine);
	modale.classList.remove('hidden');
	document.body.classList.add('no-scroll');

}

function chiudiModale(event) {
	console.log(event);
	if(event.key === 'Escape')
	{
		console.log(modale);
		modale.classList.add('hidden');
		img = modale.querySelector('img');
		img.remove();
		document.body.classList.remove('no-scroll');
	}
}



function onResponseEv(response){
    console.log("Risposta ricevuta");
    return response.json();
}

function OnJsonEv(json){
    console.log("Json ricevuto");
    console.log(json);

    const sezione=document.querySelector('#eventi_visualizzati');
    sezione.innerHTML='';
    let risultati=json.page.totalElements;
    if(risultati>20){
        risultati=20;
    }
    for(let i=0;i<risultati;i=i+3){
        const ev=json._embedded.events[i];
        //leggo immagine ,nome dell'artista, data e luogo
        const immagine=ev.images[0].url;    
        const nome=ev.name;
        const data=ev.dates.start.localDate;
        const luogo=ev.dates.timezone;


        const evento=document.createElement('div');

        const img=document.createElement('img');
        img.src=immagine;       
        img.addEventListener('click',apriModale);

        const didascalia=document.createElement('span');
        didascalia.textContent=data;
        didascalia.classList.add("didascalia");

        const nome_artista=document.createElement('span');
        nome_artista.textContent=nome;
        nome_artista.classList.add("nome_artista");

        const luogo_evento=document.createElement('span');
        luogo_evento.textContent=luogo;
        luogo_evento.classList.add("luogo_evento");

        evento.appendChild(img);
        evento.appendChild(nome_artista);
        evento.appendChild(didascalia);
        evento.appendChild(luogo_evento);
        sezione.appendChild(evento);        

    }

}





function  ricerca_artista(event){
    event.preventDefault();
    const opera_ingresso=document.querySelector('#opera');
    const opera_valore=encodeURIComponent(opera_ingresso.value);
    console.log("Eseguo la ricerca : " + opera_valore);
    //Richiesta
    url='https://api.europeana.eu/record/v2/search.json?wskey='+api_key+ '&query=who:' +opera_valore;
    fetch(url).then(onResponse).then(OnJson);
}

function ricerca_eventi(event){
    event.preventDefault();
    const evento_ingresso=document.querySelector('#evento');
    const evento_valore=encodeURIComponent(evento_ingresso.value);
    console.log("Eseguo la ricerca : " + evento_valore);
    url_eventi='https://app.ticketmaster.com/discovery/v2/events.json?countryCode='+evento_valore+'&apikey='+api_key_eventi;
    fetch(url_eventi).then(onResponseEv).then(OnJsonEv);
}




const api_key='dightpront';
form=document.querySelector('form');
form.addEventListener('submit',ricerca_artista);

const modale = document.querySelector('#modale');
window.addEventListener('keydown', chiudiModale);


const api_key_eventi='vudKODYExVF3mz8CnWx7oAETLxQZZ6iG';
form_eventi=document.querySelector('#Eventi');
form_eventi.addEventListener('submit',ricerca_eventi);


