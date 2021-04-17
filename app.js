function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
////////////////////
const app = Vue.createApp({
  data() {
    return {
      userHealth: 100,
      monsterHealth: 100,
      currentRound: 1,
      winner: null,
      log: [],
    };
  },
  watch: {
    userHealth(value) {
      if (value > 0 && this.monsterHealth <= 0) {
        this.winner = "won";
        // setTimeout(function () {
        //   window.location.reload(true);
        // }, 2500)
      } else if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0 && this.monsterHealth >= 1) {
        this.winner = "lost";
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth > 0) {
        return { width: this.monsterHealth + "%" };
      } else {
        return { width: 0 + "%" };
      }
    },
    playerBarStyle() {
      if (this.userHealth > 0) {
        return { width: this.userHealth + "%" };
      } else {
        return { width: 0 + "%" };
      }
    },
    mayUseSpecial() {
      return this.currentRound % 3 !== 0;
    },
    mayHeal() {
      return this.currentRound % 5 !== 0;
    },
  },
  methods: {
    userAttack() {
      this.currentRound++;
      const hitPoints = getRandomValue(6, 12);
      this.monsterHealth -= hitPoints;
      this.logMessage(
        "The Knight",
        " attacked the Monster ",
        "and did " + hitPoints + " damage"
      );
      this.delayedMonster();
    },
    monsterAttack() {
      const hit = getRandomValue(9, 15);
      this.userHealth -= hit;
      this.logMessage(
        "The Monster",
        " retaliated ",
        "and did " + hit + " damage"
      );
    },
    delayedMonster() {
      setTimeout(this.monsterAttack, 1000);
    },
    specialAttack() {
      this.currentRound++;
      const hitPoints = getRandomValue(10, 17);
      this.monsterHealth -= hitPoints;
      this.logMessage(
        "The Knight",
        " used a special attack against the Monster ",
        "and did " + hitPoints + " damage"
      );
      this.delayedMonster();
    },
    heal() {
      const healed = getRandomValue(3, 10);
      this.userHealth += healed;
      this.logMessage("The Knight", " healed ", healed + " points");
      this.currentRound++;
    },
    surrender() {
      this.winner = "surrender";
    },
    newGame() {
      this.userHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 1;
      this.winner = null;
      this.log = [];
    },
    logMessage(who, what, value) {
      this.log.unshift({
        actor: who,
        action: what,
        result: value,
      });
    },
  },
});

app.mount('#game')