const video_games = [
  {
    title: "The Witcher 3: Wild Hunt",
    developer: "CD Projekt",
    release_date: "2015-05-19",
    description: "An open-world action RPG with a captivating storyline.",
    price: 29.99,
    genre: "Action",
    rating: 5,
    platform: ["PC", "PS4", "Xbox One", "Nintendo Switch"],
    img: "https://example.com/witcher3.jpg",
  },
  {
    title: "Red Dead Redemption 2",
    developer: "Rockstar Games",
    release_date: "2018-10-26",
    description: "A western-themed action-adventure game set in an open world.",
    price: 49.99,
    genre: "Action",
    rating: 4.5,
    platform: ["PS4", "Xbox One", "PC"],
    img: "https://example.com/rdr2.jpg",
  },

  {
    title: "The Legend of Zelda: Breath of the Wild",
    developer: "Nintendo",
    release_date: "2017-03-03",
    description:
      "An action-adventure game set in an open world, exploring Hyrule.",
    price: 59.99,
    genre: "Adventure",
    rating: 5,
    platform: ["Nintendo Switch"],
    img: "https://example.com/zelda.jpg",
  },
  {
    title: "Uncharted 4: A Thief's End",
    developer: "Naughty Dog",
    release_date: "2016-05-10",
    description:
      "A thrilling action-adventure game featuring Nathan Drake's final adventure.",
    price: 39.99,
    genre: "Adventure",
    rating: 4.7,
    platform: ["PS4"],
    img: "https://example.com/uncharted4.jpg",
  },
];

const open_add_game_model_btn = document.getElementById(
  "open_add_game_model_btn"
);

const model_container = document.getElementById("model_container");
const add_new_game_model = document.getElementById("add_new_game_model");
const view_game_model = document.getElementById("view_game_model");
const view_more_btns = document.querySelectorAll(".view_more_btn");

console.log(view_more_btns);

const close_add_new_model = document.querySelector(
  "#add_new_game_model .close"
);
const close_view_more_model = document.querySelector("#view_game_model .close");

model_container.classList.add("hide");
add_new_game_model.classList.add("hide");
view_game_model.classList.add("hide");

open_add_game_model_btn.addEventListener("click", () => {
  model_container.classList.remove("hide");
  add_new_game_model.classList.remove("hide");
});

close_add_new_model.addEventListener("click", () => {
  model_container.classList.add("hide");
  add_new_game_model.classList.add("hide");
});

close_view_more_model.addEventListener("click", () => {
  model_container.classList.add("hide");
  view_game_model.classList.add("hide");
});

view_more_btns.forEach((element) => {
  element.addEventListener("click", () => {
    model_container.classList.remove("hide");
    view_game_model.classList.remove("hide");
  });
});
