function CreateCalculator() {
  this.display = document.querySelector(".display");
  this.ball = document.querySelector(".ball");
  this.containerCalculator = document.querySelector(".container-calculator");

  this.pointColor = () => {
    const audio = new Audio("./audio/audio.mp3");
    audio.volume = 0.2;

    this.containerCalculator.addEventListener("mousedown", (e) => {
      if (!e.target.classList.contains("btn-calculator"));

      this.ball.style.cssText = `background-color: var(--color-background-default)`;
      audio.play();
    });

    this.containerCalculator.addEventListener("mouseup", (e) => {
      if (!e.target.classList.contains("btn-calculator"));

      audio.currentTime = 0;
      this.ball.style.cssText = `background-color: #050506`;
    });
  };

  this.clearDisplay = () => {
    this.display.value = "";
  };

  this.deleteFinal = () => {
    this.display.value = this.display.value.slice(0, -1);
  };

  this.resultEq = () => {
    let eq = this.display.value;
    const audio = new Audio("./audio/erro.mp3");
    audio.volume = 0.3;

    try {
      eq = eval(eq);

      if (!eq) {
        return;
      }

      this.display.value = String(eq);
    } catch (e) {
      audio.volume = 0.3;
      audio.play();
      eq = "invalid equation";

      this.display.value = String(eq);
      this.ball.style.cssText = `background-color: red`;
      return;
    }
  };

  this.init = () => {
    this.buttonClick();
    this.pointColor();
  };

  this.buttonClick = () => {
    document.addEventListener(
      "click",
      function (e) {
        const el = e.target;

        if (this.display.value == "invalid equation") this.display.value = "";
        if (el.classList.contains("btn-num")) this.btnParaDisplay(el.innerText);
        if (el.classList.contains("btn-clear")) this.clearDisplay();
        if (el.classList.contains("btn-del")) this.deleteFinal();
        if (el.classList.contains("btn-eq")) this.resultEq();
      }.bind(this)
    );
  };

  this.btnParaDisplay = (valor) => {
    this.display.value += valor;
  };
}

const calculator = new CreateCalculator();
calculator.init();
