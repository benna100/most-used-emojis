import "./index.scss";

const $input = document.querySelector("input");
const $ul = document.querySelector("ul");
const $span = document.querySelector("span");

function renderEmojis(emojis) {
  $span.classList.remove("shown");
  $ul.innerHTML = "";
  emojis.forEach(({ emoji, count }) => {
    const $li = document.createElement("li");

    $li.innerHTML = `<span>${emoji}</span><span>${count}</span>`;
    $ul.appendChild($li);
  });
}

document.querySelector("button").addEventListener("click", async () => {
  $span.classList.add("shown");

  const twitterUsername = $input.value;

  try {
    const mostUsedEmojisRequest = await fetch(
      `api/modules?username=${twitterUsername}`
    );
    const mostUsedEmojis = await mostUsedEmojisRequest.json();
    mostUsedEmojis.sort((a, b) => (a.count > b.count ? -1 : 1));
    renderEmojis(mostUsedEmojis);
  } catch (error) {
    alert(`Could not get Tweets for username: ${twitterUsername}`);
    $span.classList.remove("shown");
  }
});
