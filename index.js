const screenLower = document.getElementById("screen-lower");

const pad = document.querySelectorAll(".pad")
const numpad = document.querySelectorAll(".numpad");
const btnReset = document.getElementById("pad-reset");
const btnDel = document.getElementById("pad-del");
const btnPlusMin = document.getElementById("pad-plusmin");
const controlpad = document.querySelectorAll(".controlpad");
const btnEqual = document.getElementById("pad-equal");
const btnPercent = document.getElementById("pad-percentage");

let isClearNextInput = false;

pad.forEach(p => {
  p.addEventListener("click", () => {
    console.log(`${p.innerText} clicked`)
  })
});

let buffExp = [];

numpad.forEach((n) => {
  n.addEventListener("click", () => {
    if (isClearNextInput) {
      screenLower.innerText = ''
      isClearNextInput = false
    }

    screenLower.innerText += n.innerText
  })
})

btnReset.addEventListener("click", () => {
  screenLower.innerText = '';
  buffExp = [];
});

btnDel.addEventListener("click", () => {
  screenLower.innerText = screenLower.innerText.slice(0, -1);
});

btnPlusMin.addEventListener("click", () => {
  const pattern = /^(0*)$/;

  if (pattern.test(screenLower.innerText)) return

  if (screenLower.innerText.includes('-')) {
    if (screenLower.innerText.length == 0) return
    screenLower.innerText = screenLower.innerText.replace('-', '')
  }
  else screenLower.innerText = "-" + screenLower.innerText;
})

controlpad.forEach((c) => {
  c.addEventListener("click", () => {
    // prevent empty number
    if (screenLower.innerText == '') return

    if (buffExp.length >= 2) {
      let result = Math.round(eval(buffExp) * 100) / 100
      screenLower.innerText = result
      buffExp = [result, c.innerText === '×' ? '*' : c.innerText]
    } else {
      buffExp.push(screenLower.innerText, c.innerText === '×' ? '*' : c.innerText)
      screenLower.innerText = '0';
    }
    isClearNextInput = true
  })
})

btnEqual.addEventListener("click", () => {
  try {
    buffExp.push(screenLower.innerText);
    let result = Math.round(eval(buffExp.join(' ')) * 100) / 100
    screenLower.innerText = result;
    buffExp = [];
    isClearNextInput = true

  } catch (e) {
    console.log(e)
  }
})

btnPercent.addEventListener("click", () => {
  screenLower.innerText = eval(`${screenLower.innerText} / 100`)
})