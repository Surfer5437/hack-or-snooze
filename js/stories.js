"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
const favorites = localStorage.getItem('favorites').split(',');
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    const favButton = document.createElement('button');
    favButton.id = story.storyId;
    

    if (favorites.includes(story.storyId)){
      favButton.style.backgroundColor='blue';
      favButton.innerText='FAVORITE!';
    }else if (!favorites.includes(story.storyId)){
      favButton.style.backgroundColor='grey';
      favButton.innerText='Not Fav!';
    }
    favButton.addEventListener('click', (e)=>{

      const fav = Array.from(localStorage.getItem('favorites').split(','));
      const o = fav.indexOf(e.target.id);
      if (o>-1){
        fav.splice(o, 1);
        localStorage.setItem('favorites',fav)
        favButton.style.backgroundColor='grey';
      favButton.innerText='Not Fav!';
    }else{
      fav.push(e.target.id)
      localStorage.setItem('favorites',fav)
      favButton.style.backgroundColor='blue';
      favButton.innerText='FAVORITE!';
    }

    checkTrueOrFalseFav(e.target.id)
  });
    
    $allStoriesList.append($story);
    $allStoriesList.append(favButton);
    if (localStorage.getItem('username') === story.username){
        const delButton = document.createElement('button');
    delButton.id = story.storyId;
    delButton.style.backgroundColor='red';
    delButton.innerText='delete';
    delButton.addEventListener('click',delPost)
    $allStoriesList.append(delButton);
    }
  
  }

  $allStoriesList.show();
}
function checkTrueOrFalseFav(id){
  const fav = Array.from(localStorage.getItem('favorites'));
  if (fav.indexOf(id)>-1){
return true
}else{
  return false
}
}
async function delPost(e){
const thisId = e.target.id;
console.log(thisId)
const response = await axios({
  url: `${BASE_URL}/stories/${thisId}`,
  method: "DELETE",
  data: { "token":localStorage.token },
});

getAndShowStoriesOnStart()
}
