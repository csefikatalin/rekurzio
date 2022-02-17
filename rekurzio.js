//segédfüggvény
function $(nev) {
    return document.getElementsByClassName(nev);
}
function ID(nev) {
    return document.getElementById(nev);
}
var tomb = [12, 43, 53, 66, 67, 72, 85, 99];
function kezd() {


    ID('eredmeny').innerHTML = "";
    document.querySelectorAll('p')[1].style.fontSize = "30px";
    document.querySelectorAll('p')[0].style.fontSize = "30px";
    szamok();

}
function szamok() {
    var szint = parseInt(ID("szint").value);
//    ID('eredmeny').innerHTML +="fibonacci";
//     ID('eredmeny').innerHTML += fibo(szint) + "<br>";  
//     ID('eredmeny').innerHTML +="faktoriális";
    ID('eredmeny').innerHTML += fakt(szint) + "<br>";

}
function fibo(szint) {

    if (szint <= 2)
        return 1;
    else {
        return fibo(szint - 1) + fibo(szint - 2);
    }


}
function fakt(szint) {

    if (szint <= 1)
        return 1;
    else {
        return fakt(szint - 1) * szint;
    }


}

function kereses(e,v){
    var kiirando="";
    console.log("rekurzio "+ e+" "+v);

    for (var i = e; i < v; i++) {
         console.log("tömb "+ tomb[i]+" ");
    }
    if (tomb[e]%2===0) {
        kiirando ="A keresett elem "+ tomb[e];
        console.log(kiirando);
       return  kiirando;
    }
    else  if (e>=v) 
    {
         kiirando ="Nincs ilyen elem";
         console.log(kiirando);
        return  kiirando;
    }
    else {return kereses(e+1,v);}
    
    
}

function binkereses(e,v,mit){
    k=parseInt((e+v)/2);
    if (tomb[k]===mit) {return "a keresett elem helye "+(k+1);}
    else if (mit>tomb[k]) {e=k+1; return binkereses(e,v,mit);}
    else if (mit<tomb[k]) {v=k-1; return binkereses(e,v,mit);}
    
}

function kereseskiirasa() {
//lineáris keresés  : negatív szám keresésése rekurzióval

    ID('kereses').innerHTML +="lineáris keresés "+ kereses(0, tomb.length) +"<br>" ;
    ID('kereses').innerHTML +="binaris kereses "+ binkereses(0, tomb.length,72)  ;

}

//init
function init() {



    ID('kezd').addEventListener('click', kezd, false);
    ID('szint').addEventListener('change', szamok, false);
    ID('keres').addEventListener('click', kereseskiirasa, false);
}
window.addEventListener('load', init, false);


