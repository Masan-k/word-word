/*globals window, document, setInterval, event */
'use strict';
let db;
let eBtn00;
let eBtn10;
let eBtn20;
let eBtn30;
let eBtn40;
let eBtn50;
let eBtn60;
let eBtn70;
let eBtn80;
let eBtn90;

let eBtnView;

let eBtnRandom;

let eRdoInput;
let eRdoMode;
let eRdoTest;

function clickBtnView(){
  window.location.href = 'view.html';
}

window.addEventListener('DOMContentLoaded', function() {
  let el = document.createElement("script");
  el.src = "common.js";
  document.body.appendChild(el);
})

function clickBtnNum() {

  const WORD_COUNT = 10;
  let mode;

  for(let i=0;i<eRdoMode.length;i++){
    if(eRdoMode[i].checked){mode = eRdoMode[i].value}
  }
  let rangeIndex = event.currentTarget.dataset['index'];

  if(mode === 'input' && (rangeIndex.split(',')[0] === 'random' || rangeIndex === 'all')){
    alert('When "input" is selected in the mode, select "number" as the target.');
    return;

  }else if(mode === 'test'){

    let fromNumber = parseInt(rangeIndex) * 10;
    let toNumber = fromNumber + WORD_COUNT;

    let randomPrams = rangeIndex.split(',');
    console.log(randomPrams);

    if(randomPrams[0] !== 'random'){

      db.input.where("num")
        .between(fromNumber, toNumber)
        .toArray()
        .then((rec)=>{

        if(rec.length  === 10){
          window.location.href = mode + '.html?rangeIndex=' + rangeIndex;
        }else{
          console.log('[errorlog] rec.length -> ' + rec.length);
          alert("There is no target registration. Please enter before the test.");
        }
      })
      .catch((error)=>{console.log(error);});

    }else{
      db.input
        .toArray()
        .then((rec)=>{

        if(rec.length  >= parseInt(randomPrams[1])){
          window.location.href = mode + '.html?rangeIndex=' + rangeIndex;
        }else{
          console.log('[errorlog] rec.length -> ' + rec.length);
          alert("There is no target registration. Please enter before the test.");
        }
      })
      .catch((error)=>{console.log(error);});
    }
  }else{
    window.location.href = mode + '.html?rangeIndex=' + rangeIndex;
  }
}
function getRectColor(count){
  if(count === 0){
    return '#EAECF0';
  }else if(count <= 2){
    return '#6BF8A3';
  }else if(count <= 4){
    return '#00D65D';
  }else if(count <= 6){
    return '#00AF4A';
  }else {
    return '#007839';
  }
}


function keyInput() {
  console.log(event.keyCode);
  let e = new Event('click');
  if(event.keyCode >=48 && event.keyCode <=57){
    let target;
    if(event.keyCode === 48){target = document.getElementById('btn00');} 
    if(event.keyCode === 49){target = document.getElementById('btn10');} 
    if(event.keyCode === 50){target = document.getElementById('btn20');} 
    if(event.keyCode === 51){target = document.getElementById('btn30');} 
    if(event.keyCode === 52){target = document.getElementById('btn40');} 
    if(event.keyCode === 53){target = document.getElementById('btn50');} 
    if(event.keyCode === 54){target = document.getElementById('btn60');} 
    if(event.keyCode === 55){target = document.getElementById('btn70');} 
    if(event.keyCode === 56){target = document.getElementById('btn80');} 
    if(event.keyCode === 57){target = document.getElementById('btn90');} 
    target.dispatchEvent(e);
  }
  if(event.keyCode === 84){
    document.getElementsByName('rdoMode')[0].checked = true;
  }
  if(event.keyCode === 73){
    document.getElementsByName('rdoMode')[1].checked = true;
  }
}
function fillButton(button){
  button.disabled = false;
  button.classList.add('button-fill');
  button.classList.remove('button-disable');
  button.classList.remove('button-outline');
}
function outlineButton(button){
  button.disabled = false;
  button.classList.remove('button-fill');
  button.classList.remove('button-disable');
  button.classList.add('button-outline');
}
function disableButton(button){
  button.disabled = true;
  button.classList.remove('button-fill');
  button.classList.add('button-disable');
  button.classList.remove('button-outline');
}
function enableButton(button){
  button.disabled = false;
  button.classList.add('button-fill');
  button.classList.remove('button-disable');
  button.classList.remove('button-outline');
}
function clickRdoInput(){
  outlineButton(eBtn00);
  outlineButton(eBtn10);
  outlineButton(eBtn20);
  outlineButton(eBtn30);
  outlineButton(eBtn40);
  outlineButton(eBtn50);
  outlineButton(eBtn60);
  outlineButton(eBtn70);
  outlineButton(eBtn80);
  outlineButton(eBtn90);

  disableButton(eBtnRandom);

  db.input.toArray().then((rec)=>{
    for(let i = 0; i <= rec.length -1; i++){
      if (rec[i].num === 0) {fillButton(eBtn00);continue;}
      if (rec[i].num === 10) {fillButton(eBtn10);continue;}
      if (rec[i].num === 20) {fillButton(eBtn20);continue;}
      if (rec[i].num === 30) {fillButton(eBtn30);continue;}
      if (rec[i].num === 40) {fillButton(eBtn40);continue;}
      if (rec[i].num === 50) {fillButton(eBtn50);continue;}
      if (rec[i].num === 60) {fillButton(eBtn60);continue;}
      if (rec[i].num === 70) {fillButton(eBtn70);continue;}
      if (rec[i].num === 80) {fillButton(eBtn80);continue;}
      if (rec[i].num === 90) {fillButton(eBtn90);continue;}
    }
  })
}
function clickRdoTest(){
 let arrayInput = [];
  let inputCount = 0;

  disableButton(eBtn00);
  disableButton(eBtn10);
  disableButton(eBtn20);
  disableButton(eBtn30);
  disableButton(eBtn40);
  disableButton(eBtn50);
  disableButton(eBtn60);
  disableButton(eBtn70);
  disableButton(eBtn80);
  disableButton(eBtn90);
  disableButton(eBtnRandom);

  db.input.toArray().then((rec)=>{

    for(let i = 0; i <= rec.length -1; i++){

      if (rec[i].num === 0) {
        enableButton(eBtn00); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 10){
        enableButton(eBtn10); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 20){
        enableButton(eBtn20); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 30){
        enableButton(eBtn30); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 40){
        enableButton(eBtn40); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 50){
        enableButton(eBtn50); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 60){
        enableButton(eBtn60); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 70){
        enableButton(eBtn70); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 80){
        enableButton(eBtn80); 
        inputCount++;
        continue;
       }
      if (rec[i].num === 90){
        enableButton(eBtn90); 
        inputCount++;
        continue;
      }
    }
    if(inputCount===10){
      enableButton(eBtnRandom);
    }else{
      disableButton(eBtnRandom);
    }
  })
}

window.onload = function () {
  document.body.onkeyup = keyInput;

  let mode = null
  let param = location.search.split('=')

  eRdoMode = document.getElementsByName("rdoMode");
  eRdoInput = document.getElementById("rdoInput");
  eRdoTest = document.getElementById("rdoTest");

  eBtn00 = document.getElementById("btn00");
  eBtn10 = document.getElementById("btn10");
  eBtn20 = document.getElementById("btn20");
  eBtn30 = document.getElementById("btn30");
  eBtn40 = document.getElementById("btn40");
  eBtn50 = document.getElementById("btn50");
  eBtn60 = document.getElementById("btn60");
  eBtn70 = document.getElementById("btn70");
  eBtn80 = document.getElementById("btn80");
  eBtn90 = document.getElementById("btn90");

  eBtnRandom = document.getElementById("btnRandom");
  eBtnView = document.getElementById('btnView');

  eBtnView.addEventListener("click", clickBtnView, false);

  eRdoInput.addEventListener("click", clickRdoInput, false);
  eRdoTest.addEventListener("click", clickRdoTest, false);

  eBtn00.addEventListener("click", clickBtnNum, false);
  eBtn10.addEventListener("click", clickBtnNum, false);
  eBtn20.addEventListener("click", clickBtnNum, false);
  eBtn30.addEventListener("click", clickBtnNum, false);
  eBtn40.addEventListener("click", clickBtnNum, false);
  eBtn50.addEventListener("click", clickBtnNum, false);
  eBtn60.addEventListener("click", clickBtnNum, false);
  eBtn70.addEventListener("click", clickBtnNum, false);
  eBtn80.addEventListener("click", clickBtnNum, false);
  eBtn90.addEventListener("click", clickBtnNum, false);
  eBtnRandom.addEventListener("click", clickBtnNum, false);

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

  if(param.length === 2){
    mode = param[1]
  }

  if(mode === 'test'){
    eRdoTest.checked = true;
    clickRdoTest();
  }else if(mode === 'view'){
    eRdoTest.checked = true;
    clickRdoTest();

  }else if(mode === 'input'){
    eRdoInput.checked = true;
    clickRdoInput();

  }else{
    eRdoTest.checked = true;
    clickRdoTest();
  }
}


