import "./index.scss";

const $input = document.querySelector("input");
const $ul = document.querySelector("ul");
const $span = document.querySelector("span");

document.querySelector("button").addEventListener("click", async () => {
  $span.classList.add("shown");

  const twitterUsername = $input.value;

  const mostUsedEmojisRequest = await fetch(
    `api/modules?username=${twitterUsername}`
  );
  const mostUsedEmojis = await mostUsedEmojisRequest.json();
  $span.classList.remove("shown");
  mostUsedEmojis.sort((a, b) => (a.count > b.count ? -1 : 1));
  $ul.innerHTML = "";
  mostUsedEmojis.forEach(({ emoji, count }) => {
    const $li = document.createElement("li");

    $li.innerHTML = `<span>${emoji}</span><span>${count}</span>`;
    $ul.appendChild($li);
  });
});
