const app = {
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			decider: '',
			gameOver: false,
			gameLog: [],
		};
	},
	methods: {
		attackMonster() {
			this.currentRound++;
			const attackDamage = this.getRandomValue(12, 5);
			this.monsterHealth -= attackDamage;
			this.gameLog.unshift(
				`Player attacked monster for ${attackDamage} damage!`
			);
			this.attackPlayer();
			this.whoWon();
		},
		attackPlayer() {
			const attackDamage = this.getRandomValue(15, 8);
			this.gameLog.unshift(
				`Monster attacked player for ${attackDamage} damage!`
			);
			this.playerHealth -= attackDamage;
		},
		getRandomValue(max, min) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		specialAttackMonster() {
			this.currentRound++;
			const attackDamage = this.getRandomValue(20, 10);
			this.gameLog.unshift(
				`Player launched a special attack for ${attackDamage} damage!`
			);
			this.monsterHealth -= attackDamage;
			this.attackPlayer();
			this.whoWon();
		},
		healPlayer() {
			this.currentRound++;
			const healValue = this.getRandomValue(25, 10);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
			this.gameLog.unshift(`Player healed for ${healValue} health!`);
			this.attackPlayer();
			this.whoWon();
		},
		whoWon() {
			if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
				this.decider = "It's a draw!";
				this.gameOver = true;
			} else if (this.playerHealth <= 0) {
				this.decider = 'Monster won!';
				this.gameOver = true;
			} else if (this.monsterHealth <= 0) {
				this.decider = 'Player won!';
				this.gameOver = true;
			}
		},
		resetGame() {
			this.gameLog = [];
			this.gameOver = false;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.currentRound = 0;
		},

		surrender() {
			this.gameLog.unshift(`The player surrendered :( `);
			this.decider = 'Monster won!';
			this.gameOver = true;
			this.playerHealth = 0;
		},
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth <= 0) {
				return { width: 0 };
			} else {
				return { width: this.monsterHealth + '%' };
			}
		},
		playerBarStyles() {
			if (this.playerHealth <= 0) {
				return { width: 0 };
			} else {
				return { width: this.playerHealth + '%' };
			}
		},
		isThirdRound() {
			if (this.currentRound === 0) {
				return true;
			} else {
				return this.currentRound % 3 !== 0;
			}
		},
	},
};

Vue.createApp(app).mount('#game');
