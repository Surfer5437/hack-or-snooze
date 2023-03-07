"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $createStoryForm = $("#new-story-form");
const $navcreatestory = $("#navcreatestory");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
if (JSON.stringify(window.localStorage.getItem('favorites'))==='null' ||JSON.stringify(window.localStorage.getItem('favorites'))==''){
  localStorage.setItem('favorites','[]')
}
const favorites=localStorage.favorites;
/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

$createStoryForm.on("submit", addStory);
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);

function toggleFavBtn(){
  const btn = this.target
    const index = favorites.indexOf(this.target.id);
    if (index > -1) { // only splice array when item is found
      favorites.splice(index, 1); // 2nd parameter means remove one item only
      btn.style.backgroundcolor='grey'
      btn.innerText='Not Fav!';
    } else {
      favorites.push(btn.id)
      btn.style.backgroundcolor='blue'
      btn.innerText='FAVORITE!';
    }
  }
