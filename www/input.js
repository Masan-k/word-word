/*globals window, document, event */

let eBtnEntry;
let eTxtInput;
let eLblNumber;
let eBtnMenu;

let inputWord = [];
let inputNumber = [];

let db;
function keyInput() {
    'use strict';
    const KEYCODE_ENTER = 13;
    if(event.keyCode === KEYCODE_ENTER) {
        clickBtnEntry();
    }
    if(event.keyCode === 9){ //9:tab
      clickBtnMenuInput();
    }
}

function saveScore(){
  'use strict';

  let logDate = getLogdate();
  db.play_log.add({log_date:logDate,mode:'input',range_index:rangeIndex});

  for(let i in inputNumber){
    db.input
	    .get(inputNumber[i])
	    .then((dbData)=>{
        if(dbData === undefined){
          //new data
          db.input.add({num:inputNumber[i], word:inputWord[i], logDate});
        }else{
          if(inputWord[i] !== dbData.word){
            db.input_back.add({num:dbData.num,log_date:logDate,word:dbData.word,insert_date:dbData.log_date});
            //delete & insert
            db.input.delete(inputNumber[i])
            db.input.add({num:inputNumber[i], word:inputWord[i], log_date:logDate});
          }
        }
      })
    .catch((error)=>{console.log(error);});
  }
}

function clickBtnEntry(){
  'use strict';
  if(eTxtInput.value.trim().length===0){
    alert('Input is required.');
    return;
  }

  if(currentNumber >= endNumber){return}

  inputWord.push(eTxtInput.value);
  inputNumber.push(currentNumber);

  currentNumber += 1;
  if(currentNumber < endNumber){
    eLblNumber.innerText = to2Digit(currentNumber);
    setWord();
  }else{
    saveScore();
    eLblNumber.innerText = to2Digit(startNumber) + '-' + to2Digit((parseInt(startNumber) + 9));
    eTxtInput.value = 'Completion of registration';
  }
}

function setWord(){
  console.log('currentNumber -> ' + currentNumber);
  db.input.get(currentNumber)
  　.then((rec)=>{
    if(rec !== undefined){
	    eTxtInput.value = rec.word;
    }else{
	    eTxtInput.value = '';
    }
  })
}
let endNumber;
let currentNumber;
let rangeIndex;
let startNumber;

window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  let el = document.createElement("script");
  el.src = "common.js";
  document.body.appendChild(el);
})
function clickBtnMenuInput(){
    'use strict';
    clickBtnMenu('input');
}
window.onload = function () {
  'use strict';
  
  //---
  //DB
  //---
  db = getDexie(); 
  db.version(4).stores({
    play_log: getDbColPlayLog(),
    input: getDbColInput(),
    input_back: getDbColInputBack(), 
    test: getDbColTest()
  });

  //-----------
  //getElement
  //-----------
  eBtnEntry = document.getElementById("btnEntry");
  eBtnMenu = document.getElementById("btnMenu");
  eTxtInput = document.getElementById("txtInput");
  eLblNumber = document.getElementById("lblNumber");

  //event
  document.body.onkeyup = keyInput;
  eBtnEntry.addEventListener("click", clickBtnEntry, false);
  eBtnMenu.addEventListener("click", clickBtnMenuInput, false);

  //-----------
  //form init
  //-----------
  let param = location.search.split('=')
  rangeIndex = param[1];
  startNumber = parseInt(rangeIndex) * 10;
  eLblNumber.innerText = to2Digit(startNumber);
  currentNumber = startNumber;
  endNumber = startNumber + 10;
  setWord();
  eTxtInput.focus();
}


