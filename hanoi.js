//segédfüggvény
function $(nev) {
    return document.getElementsByClassName(nev);

}
function ID(nev) {
    return document.getElementById(nev);
}
//globális változók
const szelesseg = 640;
const magassag = 280;

var myVar;
var vaszon;
var rajz;
var rudX = [szelesseg / 4 - 30, szelesseg / 2, szelesseg * 3 / 4 + 30];

var rud1 = new Array();
var rud2 = new Array();
var rud3 = new Array();
var allapotter = [rud1, rud2, rud3];
var mentettAllapotTer = new Array();
var lepes = 0;


function alap() {
    rajz.beginPath(); // elkezdjük az alakzatot  
    rajz.fillStyle = 'darkGray';
    rajz.strokeStyle = 'darkGray'; // a toll színének állítása
    rajz.lineWidth = 1; // a toll vastagságának beállítás
    rajz.fillStyle = 'black';
    rajz.fillRect(10, magassag - 30, szelesseg - 20, 15); // 
    rajz.stroke(); // az alakzat körvonalának megrajzolása    
    rajz.closePath(); // az alakzat lezárása
}
function rud(kx, ky, szin) {
    rajz.beginPath(); // elkezdjük az alakzatot  
    rajz.fillStyle = szin;
    var my_gradient;
    my_gradient = rajz.createLinearGradient(5, 0, szelesseg, 0);
    my_gradient.addColorStop(1, "gray");
    my_gradient.addColorStop(0, "white");
    rajz.fillStyle = my_gradient;
    rajz.strokeStyle = szin; // a toll színének állítása
    rajz.lineWidth = 1; // a toll vastagságának beállítás
    rajz.fillRect(kx - 7, ky, 14, magassag - ky - 15); // 
    rajz.stroke(); // az alakzat körvonalának megrajzolása    
    rajz.closePath(); // az alakzat lezárása
    alap();
}
function korong(rudx, nagysag, pozicio) {


    szinek = ["", "#d68080", "#95d680", "#8ED6FF", "#8095d6", "#9580d6", "#d680c0", "##33001a"];
    var szin = szinek[nagysag];
    rajz.beginPath();
    var ky = +magassag - pozicio * 17 - 30;
    rajz.beginPath(); // elkezdjük az alakzatot  
    rajz.fillStyle = szin;
    rajz.strokeStyle = szin; // a toll színének állítása
    rajz.lineWidth = 1; // a toll vastagságának beállítás
    rajz.fillRect(rudx - nagysag * 20, ky, nagysag * 40, 15); // 
    rajz.stroke(); // az alakzat körvonalának megrajzolása    
    rajz.closePath(); // az alakzat lezárása

//    console.log("clearinterval" + myVar);
//    clearInterval(myVar);
//    
}

function alapallapot() {


    for (var i = 0; i < 3; i++) {
        allapotter[i] = [];
    }
    
        mentettAllapotTer=new Array();
   
    rajz.clearRect(0, 0, szelesseg, magassag);
    for (var i = 0; i < 3; i++) {
        rud(rudX[i], 50, "grey");
    }
    lepes = 0;
    ID('eredmeny').innerHTML = "";
    var szint = parseInt(ID("szint").value);
    for (var i = szint; i >= 1; i--) {
        allapotter[0].push(i);
    }
    allapotRajzoleredeti();



}

function kezd() {
    alapallapot();
    var szint = parseInt(ID("szint").value);

    hanoi(szint, 1, 2, 3);


}
function  allapotRajzoleredeti() {

    rajz.clearRect(0, 0, szelesseg, magassag);

    for (var i = 0; i < 3; i++) {
        rud(rudX[i], 50, "grey");
    }
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < allapotter[j].length; i++) {
            //korong(rud, nagysag, pozicio) 
            korong(rudX[j], allapotter[j][i], i + 1);

        }
    }


}
function  allapotRajzol(akt) {

    rajz.clearRect(0, 0, szelesseg, magassag);

    for (var i = 0; i < 3; i++) {
        rud(rudX[i], 50, "grey");
    }
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < mentettAllapotTer[akt][j].length; i++) {
            //korong(rud, nagysag, pozicio) 
            korong(rudX[j], mentettAllapotTer[akt][j][i], i + 1);

        }
    }


}
function hanoi(szint, honnan, hova, seged) {

    if (szint === 1) {
        mozgat(honnan, hova, szint);
  ID('eredmeny').innerHTML += lepes + ". lépés Honnan: " + honnan + "-->" + " hova: " + hova + " melyiket : " + szint + "<br>";
    } else {
        hanoi(szint - 1, honnan, seged, hova);
        mozgat(honnan, hova, szint);
        hanoi(szint - 1, seged, hova, honnan);
//        myVar = setInterval(function () { }, 800);

    }

}

function mozgat(honnan, hova, szint) {

    honnanrud = honnan - 1;
    hovarud = hova - 1;
    allapotter[hovarud].push(allapotter[honnanrud].pop());
//    const tomb=new Array();

//    for (var i = 0; i < allapotter.length; i++) {
//        tomb[i]=allapotter[i];
//    }
//    tomb=[...allapotter];
    const tomb = JSON.parse(JSON.stringify(allapotter));
    mentettAllapotTer.push(tomb);
    lepes++;
    ID('eredmeny').innerHTML += lepes + ". lépés Honnan: " + honnan + "-->" + " hova: " + hova + " melyiket : " + szint + "<br>";
    // allapotRajzol();
//    allapotRajzoleredeti();

}

var aktlep = 0;
function leptet() {
    kezd();
    var szint = parseInt(ID("szint").value);
    console.log(aktlep);
//    if (aktlep <lepes) {
//        allapotRajzol(aktlep);
//        aktlep++;
//    }
    myVar = setInterval(function () {
        allapotRajzol(aktlep);
        aktlep++;
        if (aktlep >= lepes) {
            aktlep = 0;
            clearInterval(myVar);
//    }
        }
    }, 800);



}
//init
function init() {
    vaszon = ID("vaszon");
    rajz = vaszon.getContext("2d");
    vaszon.width = szelesseg; // szélesség beállítása
    vaszon.height = magassag; // magasság beállítása

    alapallapot();
    ID('kezd').addEventListener('click', kezd, true);
    ID('szint').addEventListener('change', alapallapot, true);
    ID('leptet').addEventListener('click', leptet, true);


}
window.addEventListener('load', init, false);


