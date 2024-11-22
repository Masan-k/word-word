function getDexie(){
  'use strict';
  return new Dexie('num-image-conversion');
}

function getDbColPlayLog(){
  'use strict';
  return  "&log_date, mode, range_index";
}

function getDbColInput(){
  'use strict';
  return  "&num, word, log_date";
}

function getDbColInputBack(){
  'use strict';
  return "++id, num, log_date, word, insert_date";
}

function getDbColTest(){
  'use strict';
  return "++id, num, log_date, word, sec";
}

function getSortNum(_rec){

  let workRec = _rec.slice();
  let newRec = [];
  let minNumIndex = -1;

  while(newRec.length < _rec.length){
    let minNum = 9999;

	for(let i in workRec){
    if(workRec[i].num <  minNum){
      minNum = workRec[i].num;
      minNumIndex = i;
    }
	}
    newRec.push(workRec[minNumIndex]);
    workRec.splice(minNumIndex, 1)
  }
  return newRec;
}

function getRecordSummary(_rec){
  //----------------
  //Sumary Record
  //----------------
  let recordNum = [];
  let recordCount = [];
  let recordLatestSec = [];
  let recordSumSec = [];
  let recordWorstSec = [];
  let recordBestSec = [];

  let recordCountNoAnswer = [];

  //let maxLogDate;
  let num = -1;
  let sec = -1;
  let cnt = 1;
  let sumSec = 0; //use average!
  let worstSec = -1;
  let bestSec = 9999;

  let cntNoAnswer = 0;

  for(let i in _rec){
    if(num !== -1 && num !== _rec[i].num){
      recordNum.push(num);
      recordCount.push(cnt);
      
      recordLatestSec.push(sec);
      recordSumSec.push(sumSec);
      recordWorstSec.push(worstSec);
      recordBestSec.push(bestSec);
      
      recordCountNoAnswer.push(cntNoAnswer);
    }

    if(num !== _rec[i].num){
      num = _rec[i].num;
      sec = _rec[i].sec;

      worstSec = sec;
      bestSec = sec;
      sumSec = sec;
      cnt = 1;
      cntNoAnswer = 0;

    }else{
      if(cnt <= 3){
        if(worstSec < _rec[i].sec ){worstSec = _rec[i].sec;}
        if(bestSec > _rec[i].sec){bestSec = _rec[i].sec;}
        sumSec += _rec[i].sec;
      }
      cnt += 1;
      if(_rec[i].sec === 10){
        cntNoAnswer += 1;
      }
    }
  }
  recordNum.push(num);
  recordCount.push(cnt);
  
  recordLatestSec.push(sec);
  recordSumSec.push(sumSec);
  recordWorstSec.push(worstSec);
  recordBestSec.push(bestSec);

  recordCountNoAnswer.push(cntNoAnswer);

  let result = {
    num: recordNum
    ,sumSec: recordSumSec 
    ,worstSec: recordWorstSec
    ,bestSec: recordBestSec
    ,count:   recordCount
    ,latestSec: recordLatestSec
    ,countNoAnswer: recordCountNoAnswer
   }

  return result;
}
function getLogdate(){
  'use strict';

  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = ('00' + (nowDate.getMonth()+1)).slice(-2);
  let day = ('00' + nowDate.getDate()).slice(-2);
  let hour = ('00' + nowDate.getHours()).slice(-2);
  let minute = ('00' + nowDate.getMinutes()).slice(-2);
  let second = ('00' + nowDate.getSeconds()).slice(-2);

  return year + month + day + '_' + hour + minute + second;
}

function clickBtnMenu(mode){
  'use strict';
    
  if(typeof mode === "object"){
    window.location.href = 'index.html';
  }else{
    window.location.href = 'index.html?mode=' + mode;
  }
}

function to2Digit(num){
  'use strict';
  return ('0' + num).slice(-2);
}


