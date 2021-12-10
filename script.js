let table = [];
let favoris = [];
if (localStorage.fav != undefined) {
  favoris = JSON.parse(localStorage.fav);
  afficherFavoris();
}
function cherche() {
  let url = 'https://www.omdbapi.com/?apikey=8d684aed&s=';
  let film = document.querySelector('#film').value;
  document.querySelector('#film').value = '';
  let url2 = url + film;
  //requete AJAX
  fetch(url2)
    .then(response => response.json()) // retourn au 2em then le body = contenu JSON
    .then(data => {
      if (data.Error == undefined) {
        //      let tab = data.Search;
        //      for (let film of tab) {
        //   table.push(film);
        let template = document.querySelector('#template');
        let tbody = document.querySelector('#tableau');
        tbody.innerHTML = '';
        table = data.Search;
        for (let i = 0; i < table.length; i++) {
          let tr = template.content.cloneNode(true);
          let tabtd = tr.querySelectorAll('td');
          tabtd[0].innerHTML = table[i].Title;
          let img = tr.querySelector('#image');
          img.setAttribute('src', table[i].Poster);
          let btn = tr.querySelector('.btn-primary');

          btn.onclick = function () {
            let j = this.parentElement.parentElement.rowIndex - 1;
            favoris.push(table[j]);
            afficherFavoris();
            //       console.log(favoris);
            let str = JSON.stringify(favoris);
            // pour une variable
            localStorage.fav = str;
          }
          tbody.appendChild(tr);
        }
      }
      else {
        console.log(data.Error);
      }
    });
}
function afficherFavoris() {
  let template2 = document.querySelector('#template2');
  let tbody1 = document.querySelector('#tableFavoris');
  tbody1.innerHTML = '';
  for (let k = 0; k < favoris.length; k++) {
    let tr = template2.content.cloneNode(true);
    let tabtd = tr.querySelectorAll('td');
    tabtd[0].innerHTML = favoris[k].Title;
    let img1 = tr.querySelector('#image1');
    img1.setAttribute('src', favoris[k].Poster);
    let btnDel = tr.querySelector('.btn-danger');
    btnDel.onclick = function () {
      let u = this.parentElement.parentElement.rowIndex - 1;
      favoris.splice(u, 1);
      //          this.parentElement.parentElement.remove();
      afficherFavoris();
      localStorage.fav = JSON.stringify(favoris);
    }
    tbody1.appendChild(tr);
  }
}
