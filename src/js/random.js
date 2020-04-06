import $ from 'jquery';

/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */

export default class Nba {
	constructor(){
		this.initEls();



		this.initEvents();
	}


	initEls () {
		this.Els = {
			cityText: $('.js-city'),
			clubName: $('.js-name-club'),
			conferenceText: $('.js-conference'),
			idText: $('.js-id'),
			nicknameText: $('.js-nickname'),
			container: $('.js-container'),

			playernamelastText: $('.js-playerlast'),
			playerclubName: $('.js-playerid'),
			playerjerseyText: $('.js-playerjersey'),
			playernameText: $('.js-playername'),
			playernationalityText: $('.js-playercountry'),
			playersizeText: $('.js-playersize'),
			playerpositionText: $('.js-playerpos'),
			playerweightText: $('.js-playerweight'),


		}
		
		this.club;
			this.randomButton = document.querySelector('#randomClub');
			this.randomButton_player = document.querySelector('#randomPlayer');
	}

	initEvents() {
		this.getNba_random();
		this.getNba_new_random();

		this.randomButton.addEventListener('click', event => this.getNba_random());
		this.randomButton_player.addEventListener('click', event => this.getNba_new_random());

	}

	// getNba() {
	// 	const api = {
	// 		 endpoint: 'https://www.balldontlie.io/api/v1/teams',  // https://api-nba-v1.p.rapidapi.com/teams/city/%7Bcity%7D'  //https://api-nba-v1.p.rapidapi.com/teams/city/%7Bcity%7D'

  getNba_random() {
		const api = {
			 endpoint: `https://api-nba-v1.p.rapidapi.com/teams/teamId/${this.randomClub()}`,  // https://api-nba-v1.p.rapidapi.com/teams/city/%7Bcity%7D'  //https://api-nba-v1.p.rapidapi.com/teams/city/%7Bcity%7D'

		};

		$.ajaxSetup({cache:false});

		$.ajax({"url" : api.endpoint,
			"data": api.params,
			"headers":{
    		'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
    		'x-rapidapi-key': '51f1c1baddmsh02e892b0bd99394p10ae11jsn80c5aa2b10d4'
  			}
  		})
		.then((response) => {
			console.log(response);
			this.renderNba(response.api.teams[0].teamId,response.api.teams[0].city,response.api.teams[0].fullName,response.api.teams[0].leagues.standard.confName,response.api.teams[0].nickname);
		})
		.catch((e) => {
			console.log('error with the quote :', e);
		});
	}

	 renderNba (id, city, club, conference, nickname) {
    	this.Els.idText.text(id);
        this.Els.cityText.text(city);
        this.Els.clubName.text(club);
        this.Els.conferenceText.text(conference);
        this.Els.nicknameText.text(nickname);
        


        this.Els.container.addClass('is-ready');
	}

	randomClub () {
    let randomClubID = Math.floor(Math.random() * 44);
    console.log(randomClubID);
    
    if (randomClubID) {
    	randomClubID =Math.floor(Math.random() * 44);
    }
    return randomClubID;
  }


  getNba_new_random() {
		const api = {
			 endpoint: `https://api-nba-v1.p.rapidapi.com/players/playerId/${this.randomPlayer()}`,  

		};

		$.ajaxSetup({cache:false});

		$.ajax({"url" : api.endpoint,
			"data": api.params,
			"headers":{
    		'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
    		'x-rapidapi-key': '51f1c1baddmsh02e892b0bd99394p10ae11jsn80c5aa2b10d4'
  			}
  		})
		.then((response) => {
			console.log(response.api.players[0].country);
			this.renderNbaplayer(response.api.players[0].firstName,response.api.players[0].lastName,response.api.players[0].playerId,response.api.players[0].leagues.standard.jersey,response.api.players[0].country,response.api.players[0].heightInMeters,response.api.players[0].leagues.standard.pos,response.api.players[0].weightInKilograms);
		})
		.catch((e) => {
			console.log('error with the quote :', e);
		});
	}

	 renderNbaplayer (firstName, lastName, playerId,jersey,country,heightInMeters,pos,weightInKilograms) {


	 	this.Els.playernameText.text(firstName);
        this.Els.playernamelastText.text(lastName);
        this.Els.playerclubName.text(playerId);
        this.Els.playerjerseyText.text(jersey);
        this.Els.playernationalityText.text(country);
        this.Els.playersizeText.text(heightInMeters);
        this.Els.playerpositionText.text(pos);
        this.Els.playerweightText.text(weightInKilograms);




        this.Els.container.addClass('is-ready');
	}
randomPlayer () {
    let randomPlayerID = Math.floor(Math.random() * 2529);
    console.log(randomPlayerID);
    
    if (randomPlayerID) {
    	randomPlayerID =Math.floor(Math.random() * 2529);
    }
    return randomPlayerID;
  }
}



	

// const nBPlayer = response.api.players;

//        $(nBPlayer).each( () => {


