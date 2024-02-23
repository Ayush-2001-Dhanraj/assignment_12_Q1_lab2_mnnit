import { video_games } from "./data.js";

const open_add_game_model_btn = document.getElementById(
  "open_add_game_model_btn"
);

const model_container = document.getElementById("model_container");
const add_new_game_model = document.getElementById("add_new_game_model");
const view_game_model = document.getElementById("view_game_model");
const game_list_section = document.getElementById("game_list_section");
const close_add_new_model = document.querySelector(
  "#add_new_game_model .close"
);
const close_view_more_model = document.querySelector("#view_game_model .close");
const add_game_form = document.getElementById("add_game_form");

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

add_game_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(formData.get("title"));
});

function show_view_game_details(game) {
  const {
    title,
    img,
    description,
    price,
    release_date,
    rating,
    developer,
    platform,
    genre,
  } = game;
  view_game_model.querySelector("h2").textContent = title;
  view_game_model.querySelector("#image_container img").src = img;
  view_game_model.querySelector("h3").textContent = `${price} ₹`;

  view_game_model.querySelector(
    "#details_container>#personal_details_section>:first-child p"
  ).textContent = `By: ${developer}`;

  view_game_model.querySelector(
    "#details_container>#personal_details_section>:last-child p"
  ).textContent = `${rating} ⭐`;

  view_game_model.querySelector(
    "#details_container>:nth-child(2) p:nth-of-type(1)"
  ).textContent = `Released On: ${release_date}`;

  view_game_model.querySelector(
    "#details_container>:nth-child(2) p:nth-of-type(2)"
  ).textContent = `${genre}`;

  view_game_model.querySelector(
    "#details_container>:nth-child(2) p:nth-of-type(3)"
  ).textContent = `${platform.join(" | ")}`;

  view_game_model.querySelector("#details_container>p").textContent =
    description;
}

function createGameCard(game) {
  const { title, img, description, price } = game;
  const gameCard = document.createElement("div");
  gameCard.className = "game_card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "game_image_container";

  const image = document.createElement("img");
  image.src = img;
  image.alt = title;

  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  titleSpan.textContent = title;

  imageContainer.appendChild(image);
  imageContainer.appendChild(titleSpan);

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = description;

  const priceSpan = document.createElement("span");
  priceSpan.className = "price";
  priceSpan.textContent = price + " ₹";

  const viewMoreBtn = document.createElement("button");
  viewMoreBtn.className = "view_more_btn";
  viewMoreBtn.textContent = "View More";

  viewMoreBtn.addEventListener("click", () => {
    model_container.classList.remove("hide");
    view_game_model.classList.remove("hide");
    show_view_game_details(game);
  });

  gameCard.appendChild(imageContainer);
  gameCard.appendChild(descriptionParagraph);
  gameCard.appendChild(priceSpan);
  gameCard.appendChild(viewMoreBtn);

  return gameCard;
}

function appendGameCards(games_arr) {
  games_arr.forEach((game) => {
    game_list_section.appendChild(createGameCard(game));
  });
}

appendGameCards(video_games);
