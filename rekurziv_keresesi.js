//segédfüggvény
function $(nev) {
    return document.querySelectorAll(nev);
}
function ID(nev) {
    return document.getElementById(nev);
}

var tomb = [12, 43, 53, 66, 67, 72, 85, 99];

function hatvany(alap, kitevo) {
    if (kitevo === 0) {
        return 1;
    } else {
        return alap * hatvany(alap, kitevo - 1);
    }

}
function rekurzio() {
    //2 n-en hatvány számolása rekurzióval. 
    var n = ID("y").value;

    ID("rekurzio").innerHTML += " 2 hatványa: " + hatvany(2, n) + "<br>";

}

function fordit(szoveg) {
    if (szoveg.length === 1) {
        return szoveg;
    } else {
        return szoveg.slice(szoveg.length - 1, szoveg.length) + fordit(szoveg.slice(0, szoveg.length - 1));
    }

}
function szovegfordit() {
    var szoveg = new String;
    szoveg = ID("x_text").value;
    ID("rekurzio").innerHTML += "A szöveg fordítva: " + fordit(szoveg) + "<br>";

}

function kereses(e, v) {
    var kiirando = "";
    console.log("rekurzio " + e + " " + v);

    for (var i = e; i < v; i++) {
        console.log("tömb " + tomb[i] + " ");
    }
    if (tomb[e] % 2 === 0) {
        kiirando = "A keresett elem " + tomb[e];
        console.log(kiirando);
        return  kiirando;
    } else if (e >= v)
    {
        kiirando = "Nincs ilyen elem";
        console.log(kiirando);
        return  kiirando;
    } else {
        return kereses(e + 1, v);
    }


}

function binkereses(e, v, mit) {
    k = parseInt((e + v) / 2);
    if (tomb[k] === mit) {
        return "a keresett elem helye " + (k + 1);
    } else if (mit > tomb[k]) {
        e = k + 1;
        return binkereses(e, v, mit);
    } else if (mit < tomb[k]) {
        v = k - 1;
        return binkereses(e, v, mit);
    }

}
function paros(szam) {
    if (szam === 0) {
        return true;
    } else
    if (szam === 1) {
        return false;
    } else {
        return paratlan(szam - 1);
    }
}

function paratlan(szam) {
    if (szam === 0) {
        return false;
    } else
    if (szam === 1) {
        return true;
    } else {
        return paros(szam - 1);
    }
}

function kereseskiirasa() {
//lineáris keresés  : negatív szám keresésése rekurzióval
    ID('rekurzio').innerHTML += tomb.join(" ; ") + "<br>";
    ID('rekurzio').innerHTML += "lineáris keresés " + kereses(0, tomb.length) + "<br>";
    ID('rekurzio').innerHTML += "binaris kereses " + binkereses(0, tomb.length, 72) + "<br>";
    var szam = ID("x_text").value;
    ID('rekurzio').innerHTML += "páros-e " + paros(szam) + "<br>";


}
//init
function init() {
    ID("y").addEventListener("change", rekurzio);
    ID("gomb").addEventListener("click", szovegfordit);
    ID("keresesek").addEventListener("click", kereseskiirasa);




}
window.addEventListener('load', init, false);
