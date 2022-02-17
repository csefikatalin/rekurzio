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
vaszon="";
   
function rajzolas(){
    rajz.beginPath(); // elkezdjük az alakzatot  
    
  rajz.rect(20, 20, 150, 100);
  rajz.stroke();  
    rajz.closePath();

    
}

//init
function init() {
    vaszon = ID("vaszon");
    rajz = vaszon.getContext("2d");
    vaszon.width = szelesseg; // szélesség beállítása
    vaszon.height = magassag; // magasság beállítása
    vaszon.style.border = "1px solid grey";
  
    rajzolas();
  




}
window.addEventListener('load', init, false);


