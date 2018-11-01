var app = new Vue({
	el: "#app",
	data: {
		title: "Awesome Pathfinder Combat Manager",
		chars: [
			// {
			// 	name: "Arles",
			// 	maxHp: "150",
			// 	currentHp: "150",
			// 	initiative: 80,
			// 	currentTurn: false,
			// 	isEnemy: false,
			// 	mythicPoints: 3,
			// 	countdown: []
			// },
			// {
			// 	name: "Garruk",
			// 	maxHp: "120",
			// 	currentHp: "120",
			// 	initiative: 25,
			// 	currentTurn: false,
			// 	isEnemy: false,
			// 	mythicPoints: 4,
			// 	countdown: []
			// },
			// {
			// 	name: "Ramon",
			// 	maxHp: "120",
			// 	currentHp: "120",
			// 	initiative: 20,
			// 	currentTurn: false,
			// 	isEnemy: true,
			// 	mythicPoints: 0,
			// 	countdown: []
			// }
		],
		currentRound: 0
	},
	methods:{
		addChar: function () {
			charName = document.getElementById("charName").value
			charMaxHp = document.getElementById("charMaxHp").value
			isEnemy = document.getElementById("foe").checked
			mythicPoints = document.getElementById("myth").value
			charData =  {
										name: charName,
										maxHp: charMaxHp,
										currentHp: charMaxHp,
										initiative: "?",
										currentTurn: false,
										isEnemy: isEnemy,
										mythicPoints: mythicPoints
									}
			this.chars.push(charData)
			document.getElementById("charName").value = ""
			document.getElementById("charMaxHp").value = ""

			this.sortInitiative()
		},
		changeHP: function () {
			hpChange = event.target.value
			if (hpChange.length > 0) {
				currentHp = this.chars[event.target.name].currentHp

				this.chars[event.target.name].currentHp = parseInt(currentHp) + parseInt(hpChange)

				event.target.value = ""
			}
		},
		setInitiative: function (event) {
			charIndex = event.target.attributes.index.value
			this.chars[charIndex].initiative = event.target.value

			event.target.value = ""

			this.sortInitiative()
		},
		nextTurn: function () {
			for (var i = 0; i < this.chars.length; i++) {
				
				if (this.chars[i].currentTurn) {
					if (this.chars.length == i+1) {
						this.chars[i].currentTurn = false
						this.chars[i-i].currentTurn = true
						this.currentRound++

						countdowns = this.chars[i-i].countdown
						for (var i = 0; i < countdowns.length; i++) {
							if (countdowns[i].rounds > 0) {
								countdowns[i].rounds--
							}
						}
						break
					}
					this.chars[i].currentTurn = false
					this.chars[i+1].currentTurn = true
					
					countdowns = this.chars[i+1].countdown
					for (var i = 0; i < countdowns.length; i++) {
						if (countdowns[i].rounds > 0) {
							countdowns[i].rounds--
						}
					}
					break
				}

			}
		},
		sortInitiative() {
			this.chars.sort(function(a,b) {
				return b.initiative - a.initiative
			})
		},
		setCurrentTurn: function () {
			for (var i = 0; i < this.chars.length; i++) {
				this.chars[i].currentTurn = false
			}
			index = event.target.attributes.name.value
			this.chars[index].currentTurn = true

			this.sortInitiative()
		},
		decreaseMP: function () {
			// console.log(event.target.attributes)
			index = event.target.attributes.init.value
			this.chars[index].mythicPoints--
		},
		addCountdown: function () {
			index = event.target.attributes.name.value
			desc = document.getElementById("countDes-"+index).value
			num = document.getElementById("countNum-"+index).value
			countdownData =  {
										description: desc,
										rounds: num
									}
			
			this.chars[index].countdown.push(countdownData)
			document.getElementById("countDes-"+index).value = ""
			document.getElementById("countNum-"+index).value = ""
		}
	},
	created: function () {
		this.sortInitiative()
		if (this.chars.length > 0) {
			this.chars[0].currentTurn = true
		}
	}
})
	
