import "./index.scss";

const $input = document.querySelector("input");
const $ul = document.querySelector("ul");
const $span = document.querySelector("span");
const $facebookShare = document.querySelector("a.facebook");
const $twitterShare = document.querySelector("a.twitter");
const $shareSection = document.querySelector("section.share");

function renderEmojis(emojis) {
  $span.classList.remove("shown");
  $ul.innerHTML = "";
  emojis.forEach(({ emoji, count }) => {
    const $li = document.createElement("li");

    $li.innerHTML = `<span>${emoji}</span><span>${count}</span>`;
    $ul.appendChild($li);
  });
}

function renderShareButtons(mostUsedEmojis, username) {
  let shareText = `${username}'s most used emojis are:`;

  mostUsedEmojis.forEach(({ emoji, count }, i) => {
    if (i < 5) {
      shareText += `${emoji} `;
    }
  });
  shareText += `%0aWhat are yours? Try here 👇👇👇%0a`;

  $twitterShare.href = `https://twitter.com/share?url=http://most-used-emojis.herokuapp.com/&text=${shareText}`;

  $shareSection.classList.add("shown");
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  $span.classList.add("shown");
  $shareSection.classList.remove("shown");

  const twitterUsername = $input.value;

  try {
    const mostUsedEmojisRequest = await fetch(
      `api/modules?username=${twitterUsername}`
    );
    const mostUsedEmojis = await mostUsedEmojisRequest.json();
    mostUsedEmojis.sort((a, b) => (a.count > b.count ? -1 : 1));
    renderEmojis(mostUsedEmojis);
    renderShareButtons(mostUsedEmojis, twitterUsername);
  } catch (error) {
    alert(`Could not get Tweets for username: ${twitterUsername}`);
    $span.classList.remove("shown");
  }
});
