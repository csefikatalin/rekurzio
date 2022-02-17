//segédfüggvény
function $(nev) {
    return document.getElementsByClassName(nev);

}
function ID(nev) {
    return document.getElementById(nev);
}

const szelesseg = 640;
const magassag = 480;
const alfa = Math.PI / 3;
var myVar;
var vaszon ;
    var rajz;;

function vonal( kx, ky, vx, vy, szin) {
    // vonal rajzolása  

    rajz.beginPath(); // elkezdjük az alakzatot  
    rajz.strokeStyle = szin; // a toll színének állítása
    rajz.lineWidth = 1; // a toll vastagságának beállítás
    rajz.moveTo(kx, ky); // a 10;10 koordinátájú helyre mozgatjuk a képzeletbeli tollat
    rajz.lineTo(vx, vy); // vonal a 10;10-ből a 10;200-ba
    rajz.stroke(); // az alakzat körvonalának megrajzolása    
    rajz.closePath(); // az alakzat lezárása
}

function haromszog( ex, ey, vx, vy, szin) {
    // vonal rajzolása  
    var ax = ex + (vx - ex) / 3;
    var ay = ey + (vy - ey) / 3;
    var cx = ex + 2 * (vx - ex) / 3;
    var cy = ey + 2 * (vy - ey) / 3;
    var bx = ax + (cx - ax) * Math.cos(-alfa) + (cy - ay) * Math.sin(alfa);
    var by = ay + (cy - ay) * Math.cos(-alfa) + (cx - ax) * Math.sin(-alfa);




    rajz.beginPath(); // elkezdjük az alakzatot  
    rajz.strokeStyle = szin; // a toll színének állítása
    rajz.lineWidth = 1; // a toll vastagságának beállítás
    rajz.moveTo(ax, ay); // a 10;10 koordinátájú helyre mozgatjuk a képzeletbeli tollat
    rajz.lineTo(bx, by); // vonal a 10;10-ből a 10;200-ba    
    rajz.stroke();
    rajz.lineTo(cx, cy); // vonal a 10;10-ből a 10;200-ba
    rajz.stroke();
    rajz.lineTo(ax, ay); // vonal a 10;10-ből a 10;200-ba

    rajz.stroke(); // az alakzat körvonalának megrajzolása    
    rajz.closePath(); // az alakzat lezárása
}

function sierpinsky(szint,  x1, y1, x2, y2, szin) {
    if (szint <= 1) {
        haromszog( x1, y1, x2, y2, szin);
        return;
    } else {

        var xa = x1 + 1 / 3 * (x2 - x1);
        var ya = y1 + 1 / 3 * (y2 - y1);
        var xb = x1 + 2 / 3 * (x2 - x1);
        var yb = y1 + 2 / 3 * (y2 - y1);
        var xc = xa + (xb - xa) * Math.cos(-alfa) - (yb - ya) * Math.sin(-alfa);
        var yc = ya + (yb - ya) * Math.cos(-alfa) + (xb - xa) * Math.sin(-alfa);



        sierpinsky(szint - 1,  xb, yb, xa, ya, szin);

        sierpinsky(szint - 1,  xa, ya, xc, yc, szin);
        sierpinsky(szint - 1,  xc, yc, xb, yb, szin);
    }
}



function koch(szint,  x1, y1, x2, y2, szin) {
    if (szint <= 1)
    {

        vonal( x1, y1, x2, y2, szin);
        return;
    } else {

        var xa = x1 + 1 / 3 * (x2 - x1);
        var ya = y1 + 1 / 3 * (y2 - y1);
        var xb = x1 + 2 / 3 * (x2 - x1);
        var yb = y1 + 2 / 3 * (y2 - y1);
        var xc = xa + (xb - xa) * Math.cos(-alfa) - (yb - ya) * Math.sin(-alfa);
        var yc = ya + (yb - ya) * Math.cos(-alfa) + (xb - xa) * Math.sin(-alfa);

        koch(szint - 1,  x1, y1, xa, ya, szin);
        koch(szint - 1,  xa, ya, xc, yc, szin);
        koch(szint - 1,  xc, yc, xb, yb, szin);
        koch(szint - 1,  xb, yb, x2, y2, szin);
    }
}


function fa(szint,  x1, y1, x2, y2, szog, szin) {
    if (szint <= 1) {
        vonal( x1, y1, x2, y2, szin);
        return;
    } else {

        var hossz = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) / 2;
        var v1x = x2 - hossz * Math.cos(szog);
        var v1y = y2 + hossz * Math.sin(szog);
        var v2x = x2 + hossz * Math.cos(szog);
        var v2y = y2 + hossz * Math.sin(szog);
        fa(szint - 1,  x2, y2, v1x, v1y, Math.PI / 3, "red");
        fa(szint - 1,  x2, y2, v2x, v2y, Math.PI / 3, "blue");
    }

}

function valasztas() {
   

    var szint = ID("szint").value ;

    console.log("clear előtt " + myVar);
    clearInterval(myVar);
    var szin=ID('szin').value;
//    
    switch (ID('alakzatok').value) {
        case 'fa':
            //rekurzív fa *********************************************
            rajz.clearRect(0, 0, szelesseg, magassag);
            for (var i = 1; i < szint; i++) {
                fa(i,  szelesseg / 2, 0, szelesseg / 2, 100, Math.PI / 3, szin);
            }

            break;
        case 'koch':
            //KOCH  *********************************************

            var i = 1;

            myVar = setInterval(function () {
//                rajz.clearRect(0, 0, szelesseg, magassag);
                koch(i,  10, magassag - 200, szelesseg - 10, magassag - 200, szin);
                i++;
                if (i > szint) {
                    i = 1;
                    clearInterval(myVar);
                }

            }, 800);
            console.log("Koch " + myVar);
            break;
        case 'kochbent':
            //koch háromszög befelé *********************************************

            var i = 1;
            myVar = setInterval(function () {
                rajz.clearRect(0, 0, szelesseg, magassag);
                koch(i,  216, 280, 423, 280, szin);
                koch(i,  423, 280, 320, 101, szin);
                koch(i,  320, 101, 216, 280, szin);
                i++;
                if (i >= szint) {
                    i = 1;
                }

            }, 800);

            break;
        case 'kochkint':
            //koch háromszög kifelé *********************************************

            var i = 1;
            myVar = setInterval(function () {
               rajz.clearRect(0, 0, szelesseg, magassag);
                koch(i,  423, 280, 216, 280, szin);
                koch(i,  320, 101, 423, 280, szin);
                koch(i,  216, 280, 320, 101, szin);
                i++;
                if (i >= szint) {
                    i = 1;
                }

            }, 800);







            break;
        case 'sierpinsky':
            //Sierpinsky  *********************************************

//            var i=1;
//            setInterval(function () {
//                rajz.clearRect(0, 0, szelesseg, magassag);
//                 sierpinsky(i, rajz, 10, magassag - 200, szelesseg - 10, magassag - 200, "grey");
//                i++;
//                if (i===8) {i=1;}
//
//            }, 800);
            for (var i = 1; i < szint; i++) {
                sierpinsky(i,  10, magassag - 200, szelesseg - 10, magassag - 200, szin);
            }


            break;
        case 'torol':
            rajz.clearRect(0, 0, szelesseg, magassag);
            break;
        default:
        // code block
    }
}


//init
function init() {
     //vásznak inicializálása
     vaszon = ID("vaszon");
     rajz = vaszon.getContext("2d");
    vaszon.width = szelesseg; // szélesség beállítása
    vaszon.height = magassag; // magasság beállítása
    //legördülő menü eseménykezelése
    ID('alakzatok').addEventListener('change', valasztas, false);
}
window.addEventListener('load', init, false);

