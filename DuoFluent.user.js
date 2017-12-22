// ==UserScript==
// @name DuoFluent
// @description Duolingo keyboard switcher
// @author Ken Guru
// @license MIT
// @version 1.0
// @include https://www.duolingo.com/*
// ==/UserScript==

// wrap the script in a closure (opera, ie)
// do not spoil the global scope
// The script can be transformed into a bookmarklet easily :)
(function(window, undefined ) {

// normalized window
var w;
if (unsafeWindow != "undefined"){
  w = unsafeWindow;
  } else {
    w = window;
}

// You can inject almost any javascript library here.
// Just pass the w as the window reference,
// e.g. jquery.min.js embedding:
// (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);


// do not run in frames
if (w.self != w.top){
  return;
}

var ruArray=[];

ruArray['!']='!';  ruArray['@']='"';  ruArray['#']='№';  ruArray['$']=';';
ruArray['%']='%';  ruArray['^']=':';  ruArray['&']='?';  ruArray['*']='*';
ruArray['(']='(';  ruArray[')']='0';  ruArray['_']='_';  ruArray['+']='+';

ruArray['1']='1';  ruArray['2']='2';  ruArray['3']='3';  ruArray['4']='4';
ruArray['5']='5';  ruArray['6']='6';  ruArray['7']='7';  ruArray['8']='8';
ruArray['9']='9';  ruArray['0']='0';  ruArray['-']='-';  ruArray['=']='=';

ruArray['Q']='Й';  ruArray['W']='Ц';  ruArray['E']='У';  ruArray['R']='К';  ruArray['T']='Е';  ruArray['Y']='Н';  ruArray['U']='Г';  ruArray['I']='Ш';  ruArray['O']='Щ';  ruArray['P']='З';  ruArray['{']='Х';  ruArray['}']='Ъ';  ruArray['A']='Ф';  ruArray['S']='Ы';  ruArray['D']='В';  ruArray['F']='А';  ruArray['G']='П';  ruArray['H']='Р';  ruArray['J']='О';  ruArray['K']='Л';  ruArray['L']='Д';  ruArray[':']='Ж';  ruArray['"']='Э';  ruArray['Z']='Я';  ruArray['X']='Ч';  ruArray['C']='С';  ruArray['V']='М';  ruArray['B']='И';  ruArray['N']='Т';  ruArray['M']='Ь';  ruArray['<']='Б';  ruArray['>']='Ю';

ruArray['q']='й';  ruArray['w']='ц';  ruArray['e']='у';  ruArray['r']='к';  ruArray['t']='е';  ruArray['y']='н';  ruArray['u']='г';  ruArray['i']='ш';  ruArray['o']='щ';  ruArray['p']='з';  ruArray['[']='х';  ruArray[']']='ъ';  ruArray['a']='ф';  ruArray['s']='ы';  ruArray['d']='в';  ruArray['f']='а';  ruArray['g']='п';  ruArray['h']='р';  ruArray['j']='о';  ruArray['k']='л';  ruArray['l']='д';  ruArray[';']='ж';  ruArray["'"]='э';  ruArray['z']='я';  ruArray['x']='ч';  ruArray['c']='с';  ruArray['v']='м';  ruArray['b']='и';  ruArray['n']='т';  ruArray['m']='ь';  ruArray[',']='б';  ruArray['.']='ю';  ruArray['/']='.';  ruArray['?']=',';  ruArray[' ']=' ';

ruArray['~']='Ё';  ruArray['`']='ё';  ruArray['\\']='\\';  ruArray['|']='/';

function keyToRu(enKey) {
  return ruArray[enKey];
}

var eventBlur = new Event("blur", {bubbles: true, cancelable: true});

function watchLang(e) {
  if (e.target.lang != "ru") return; 
  if (e.ctrlKey || e.altKey || e.metaKey) return; // the modifier key is pressed 
  var char = e.key;
  if (char.length > 1) return; // special key - backspace etc.
  if(char > '~')  return; // Russian layout
  var str = e.target.value;
  var pos = e.target.selectionStart;
  str = str.slice(0,pos) + keyToRu(char) + str.slice(pos);
  e.target.value = str;
  e.target.selectionStart = e.target.selectionEnd = ++pos;
  e.target.dispatchEvent(eventBlur);
  return false;
}


// additional url check.
// Google Chrome do not treat @match as intended sometimes.
if (/https:\/\/www.duolingo.com/.test(w.location.href)){
// Run it
  document.body.onkeypress =  watchLang;
}
})(window);
