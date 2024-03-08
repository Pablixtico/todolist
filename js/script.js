$(".search-bar button").click((e) => {
  let text = $(".search-bar input").val();
  if (text) {
    $(".list-items").append(
      `<div class="list-item"><div class="list-item-text"><input type="checkbox" name="li1" id="li1"><div class="text">${text}</div></div><span class="material-symbols-outlined cross">close</span></div>`
    );
    $(".search-bar input").val("");
  }
});

$(".list-items").on("click", "span.cross", (e) => {
  $(e.target).parent().remove();
});

$(document).keypress(function (e) {
  let text = $(".search-bar input").val();
  var key = e.which;
  if (key == 13) {
    if (text) {
      $(".list-items").append(
        `<div class="list-item"><div class="list-item-text"><input type="checkbox" name="li1">${text}</div><span class="material-symbols-outlined cross">close</span></div>`
      );
      $(".search-bar input").val("");
    }
  }
});

$(".list-items").on("change", ".list-item-text input", (e) => {
  if (e.target.checked) {
    let audio = new Audio();
    audio.src = "/sounds/completed.mp3";
    audio.volume;
    audio.play();
    $(e.target)
      .parent()
      .css({ "text-decoration": "line-through", color: "red" });
  } else {
    $(e.target).parent().css({ "text-decoration": "", color: "black" });
  }
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
    alert("You completed " + x + " tasks out of " + longitud);

  }


});
