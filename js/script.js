var storage;
var actualList = 1;

function clearList(){
  $(".list-item").each((index, item) => {
    $(item).remove();
  });
}

function cargarDatos(){
  clearList();
  storage = JSON.parse(window.localStorage.getItem(actualList+5));
$(storage).each((e, item) => {
  $(".list-items").append(
    `<div class="list-item"><div class="list-item-text"><input type="checkbox" name="li1" id="li1"><div class="text">${item}</div></div><span class="material-symbols-outlined cross">close</span></div>`
  );
})
let elements = $(".list-item-text input");
if(window.localStorage.getItem(actualList) != 0){
  elements.slice(-window.localStorage.getItem(actualList)).each((num, item) =>{
    $(item).prop("checked", "true");
    $(item).parent().css({ "text-decoration": "line-through", color: "red" });
  })
}
}

 cargarDatos();

$(".selector-item").click((e) => {
  console.log("hola")
  $(".active-selector").removeClass("active-selector");
  $(e.target).addClass("active-selector")
  actualList = parseInt($(e.target).text());
  console.log(actualList);
  cargarDatos()
})

$(".search-bar button").click((e) => {
  let text = $(".search-bar input").val();
  if (text) {
    $(".list-items").prepend(
      `<div class="list-item"><div class="list-item-text"><input type="checkbox" name="li1" id="li1"><div class="text">${text}</div></div><span class="material-symbols-outlined cross">close</span></div>`
    );
    $(".search-bar input").val("");
    actualizarLista()
  }
});


$(".list-items").on("click", "span.cross", (e) => {
  $(e.target).parent().remove();
  actualizarLista();
});

$(document).keypress(function (e) {
  let text = $(".search-bar input").val();
  var key = e.which;
  if (key == 13) {
    if (text) {
      $(".list-items").prepend(
        `<div class="list-item"><div class="list-item-text"><input type="checkbox" name="li1">${text}</div><span class="material-symbols-outlined cross">close</span></div>`
      );
      $(".search-bar input").val("");
    }
  }
  actualizarLista()
});

$(".list-items").on("change", ".list-item-text input", (e) => {
  if (e.target.checked) {
    $('.list-items').append($(e.target).parent().parent())
    let audio = new Audio();
    audio.src = "sounds/completed.mp3";
    audio.volume = 0.3;
    audio.play();
    $(e.target)
      .parent()
      .css({ "text-decoration": "line-through", color: "red" });
  } else {
    $(e.target).parent().css({ "text-decoration": "", color: "black" });
    $('.list-items').prepend($(e.target).parent().parent())
  }
  actualizarLista();
});

$(".delete-icon span").click(() => {
  let res = confirm("Are you sure? \nAll tasks will be deleted.");
    let longitud = $(".list-item").length;
  let x = 0;
  $(".list-item input[type=checkbox]").each((pos, item) => {
    console.log(item)
    if (item.checked) {
        x++;
    }
  });

  if (res) {
    $(".list-item").each((index, item) => {
      $(item).remove();
    });
    actualizarLista();
    alert("You completed " + x + " tasks out of " + longitud);
  }
});


function actualizarLista(){
  let items = [];
  let x = 0;
  $(".list-item-text").each((e, item) => {
    items.push($(item).text())
  })
  $(".list-item input[type=checkbox]").each((pos, item) => {
    if (item.checked) {
        x++;
    }
  });
  window.localStorage.setItem(actualList, x);
  window.localStorage.setItem(actualList+5, JSON.stringify(items));
}
