import $ from 'jquery';
import ClubTeamTemplateeast from './templates/clubeast.hbs';
import TeamTemplate from './templates/team.hbs';
import PlayerTemplateTeam from './templates/playerTeams.hbs';
/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */

function search() {

		$("body").on("keyup", ".search_surname", function() {
			var pattern = $(this). val().toLowerCase();
			$(".blocjoueur").each(function(i) {
				console.log('hello');
				var content = $(this).find("h4.lastname").text().toLowerCase();
				if (!content.includes(pattern)) {
					$(this).addClass("not_matched");
				}

				else {
					$(this).removeClass("not_matched");
				}
			});

		});

			$("body").on("keyup", ".search_name", function() {
			var pattern = $(this). val().toLowerCase();
			$(".blocjoueur").each(function(i) {
				console.log('hello');
				var content = $(this).find("h4.lastname").text().toLowerCase();
				if (!content.includes(pattern)) {
					$(this).addClass("not_matched");
				}

				else {
					$(this).removeClass("not_matched");
				}
			});

		});

				$("body").on("keyup", ".search_team", function() {
			var pattern = $(this). val().toLowerCase();
			$(".bloclub").each(function(i) {
				console.log('hello');
				var content = $(this).find("span.info").text().toLowerCase();
				if (!content.includes(pattern)) {
					$(this).addClass("not_matched");
				}

				else {
					$(this).removeClass("not_matched");
				}
			});

		});



	}
	search();


export default class Third {
	constructor(){
		this.initEls();
		this.initEvents();
	}


	initEls () {

	}

	initEvents() {
		this.getTeam_each();
		this.team_id();
		// this.getNba_each(team_id);
		
	}



	getTeam_each() {
		const api = {
			endpoint: `https://api-nba-v1.p.rapidapi.com/teams/confName/East`,  

		};
		$.ajaxSetup({cache:false});


		var team_id = $(this).attr('data-id');
		$.ajax({"url" : api.endpoint,
			"data": api.params,
			"headers":{
				'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
				'x-rapidapi-key': '51f1c1baddmsh02e892b0bd99394p10ae11jsn80c5aa2b10d4'
			}
		}).then((response) => {

			console.log(response);

			const nBteam = response.api.teams;

			$(nBteam).each( (i , item) => {
				this.renderNbaTeam(item);

			}).catch((e) => {
				console.log('error with the quote :', e);
			});
		});
	}



	renderNbaTeam (item) {

		var rendered = TeamTemplate(item);
		// console.log(rendered);
		$('.team_east').append(rendered);
	}
	



	getNba_each(team_id) {
		const api = {
			endpoint: `https://api-nba-v1.p.rapidapi.com/players/teamId/${team_id}`,


		};

		$.ajaxSetup({cache:false});

		$.ajax({"url" : api.endpoint,
			"data": api.params,
			"headers":{
				'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
				'x-rapidapi-key': '51f1c1baddmsh02e892b0bd99394p10ae11jsn80c5aa2b10d4',  
			}
		}).then((response) => {

			const nBPlayer = response.api.players;

			$(nBPlayer).each( (i , item) => {
				this.renderNbaplayer_team(item);
			})
		})
		.catch((e) => {
			console.log('error with the quote :', e);
		});
	}

	renderNbaplayer_team (item) {
		var rendered = PlayerTemplateTeam(item);
				// console.log(rendered);
				$('.playerteameast').append(rendered);
			}




		getNba_team(team_id) {
		const api = {
			endpoint: `https://api-nba-v1.p.rapidapi.com/teams/teamId/${team_id}`,


		};

		$.ajaxSetup({cache:false});

		$.ajax({"url" : api.endpoint,
			"data": api.params,
			"headers":{
				'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
				'x-rapidapi-key': '51f1c1baddmsh02e892b0bd99394p10ae11jsn80c5aa2b10d4',  
			}
		}).then((response) => {

			const teams_second = response.api.teams[0];

			console.log(teams_second);

			$(teams_second).each( (i , item) => {
				this.renderteam(item);
			})

			// console.log(response)

			// 	this.renderteam(response);
		})
		.catch((e) => {
			console.log('error with the quote :', e);
		});
	}

	renderteam (item) {
		var rendered = ClubTeamTemplateeast(item);
				console.log(rendered);
				$('.clubeast').append(rendered);
			}



			team_id(){
				$('body').on('click', '.bloclub', (event) => {

					var team_id = $(event.currentTarget).attr('data-id');

					console.log(team_id);

					this.getNba_each(team_id);
					this.getNba_team(team_id);



					$(".playerteam").addClass("open");
					$("body").addClass("scroll");

// $('.clubeast').append(rendered);

					$('body').on('click', '.cross', function() {
						$(".clubeast").empty();
						$(".playerteameast").empty();

						$(".playerteam.open").removeClass("open");
						$("body.scroll").removeClass("scroll");


					});



				});
			// getNba_each(team_id);
		}
	}






