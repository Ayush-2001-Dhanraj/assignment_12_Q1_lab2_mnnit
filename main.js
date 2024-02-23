import { video_games } from "./data.js";
const imageLinkRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;

const selected_filter = { platform: "", genre: "", max_price: "1000" };

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
const platform_selector = document.getElementById("platform_selector");
const max_price_selector = document.getElementById("max_price_selector");
const genre_selector = document.getElementById("genre_selector");

model_container.classList.add("hide");
add_new_game_model.classList.add("hide");
view_game_model.classList.add("hide");

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

function get_game_card(game) {
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

function add_game_cards(games_arr) {
  games_arr.forEach((game) => {
    const { platform, price, genre } = game;
    const meetsCriteria =
      (!selected_filter.platform ||
        platform.includes(selected_filter.platform)) &&
      (!selected_filter.genre || selected_filter.genre == genre) &&
      (!selected_filter.max_price ||
        parseInt(selected_filter.max_price) > price);

    if (meetsCriteria) {
      game_list_section.appendChild(get_game_card(game));
    }
  });
}

function handle_filter_change(e) {
  e.preventDefault();
  console.log(e.target.name, e.target.value);
  selected_filter[e.target.name] = e.target.value;
  game_list_section.innerHTML = "";
  add_game_cards(video_games);
}

function set_notification(type) {
  const notification_box = document.getElementById("notification_box");
  notification_box.style.display = "block";

  switch (type) {
    case "warning":
      notification_box.innerText = "Invalid Image/Title";
      break;
    case "ok":
      notification_box.innerText = "Done!!!!";
      break;

    default:
      break;
  }

  setTimeout(() => {
    document.getElementById("notification_box").style.display = "none";
  }, 5000);
}

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
  const temp = formData.get("release_date").split("-") || "";

  const formatted_date =
    temp.length > 2 ? `${temp[2]}/${temp[1]}/${temp[0]}` : "";

  if (
    !imageLinkRegex.test(formData.get("url")) ||
    !formData.get("title").length
  ) {
    set_notification("warning");
  } else {
    const new_game = {
      title: formData.get("title"),
      developer: formData.get("developer") || "",
      release_date: formatted_date || "",
      description: formData.get("description") || "",
      price: +formData.get("price") || "",
      genre: formData.get("genre") || "",
      rating: parseFloat(formData.get("rating")) || "",
      platform: [formData.get("platform")] || "",
      img: imageLinkRegex.test(formData.get("url"))
        ? formData.get("url")
        : "data:image/png;base64,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",
    };

    game_list_section.innerHTML = "";
    video_games.unshift(new_game);
    add_game_cards(video_games);
    model_container.classList.add("hide");
    add_new_game_model.classList.add("hide");
    set_notification("ok");
  }
});

platform_selector.addEventListener("change", handle_filter_change);

max_price_selector.addEventListener("change", handle_filter_change);

genre_selector.addEventListener("change", handle_filter_change);

add_game_cards(video_games);
