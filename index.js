/*
 * Add your JavaScript to this file to complete the assignment.
*/

// DOM = Document Object Model | consisting of 3 different parts:
   // Core DOM - standard model for all document types
   // XML DOM - standard model for XML documents
   // HTML DOM - standard model for HTML documents
      // a standard for how to GET, CHANGE, ADD, or DELETE HTML elements

// find the modal, backdrop, trigger/button, closeButton
var modal = document.getElementById("create-twit-modal");
var backdrop = document.getElementById("modal-backdrop");
var trigger = document.getElementById("create-twit-button");
var cancelButton = document.querySelector(".modal-cancel-button");
var closeButton = document.querySelector(".modal-close-button");
var createButton = document.querySelector(".modal-accept-button");
var twit_text = document.getElementById("twit-text-input");
var twit_author = document.getElementById("twit-attribution-input");

// clear text input fields and initialize placeholder text(s)
function clearText(){
   // "Twit text" input
   twit_text.value = '';
   twit_text.placeholder = "Enter your twit here...";

   // "Author" input
   twit_author.value = '';
   twit_author.placeholder = "Your username...";
}

// toggles the modal backdrop & contents
function toggleModal(){
   modal.classList.toggle("hidden");
   backdrop.classList.toggle("hidden");
}

// only toggle the modal when you click the right areas on the window
function windowOnClick(event){
   if(event.target === modal){
      toggleModal();
   }
}

var test = document.getElementById("twit_post");

// allows users to create a new Twit
function addTwit(event){
   if ((twit_text.value == "") || (twit_author.value == "")){
      alert("Uh oh! You haven't specified the Twit's text or author...")
      return;
   }

   // recreate Twit container
   var icon = document.createElement('i');
   icon.classList.add('fa');
   icon.classList.add('fa-bullhorn');

   var twitIcon = document.createElement('div');
   twitIcon.classList.add('twit-icon');
   twitIcon.appendChild(icon);

   var text = document.createElement('p');
   text.classList.add('twit-text');
   text.textContent = twit_author.value;

   var author = document.createElement('a');
   author.href = '#';
   author.textContent = twit_author.value;

   var attribution = document.createElement('p');
   attribution.classList.add('twit-attribution');
   attribution.appendChild(author);

   var twitContent = document.createElement('div');
   twitContent.classList.add("twit-content");
   twitContent.appendChild(text);
   twitContent.appendChild(attribution);

   var twit = document.createElement('article');
   twit.classList.add('twit');
   twit.appendChild(twitIcon);
   twit.appendChild(twitContent);

   var body = document.getElementsbyClassName('twit-container')[0];
   body.appendChild(twit);

   toggleModal();
}

// searching Twit contents
function filterTwit(){
   var filterContent = document.getElementById('navbar-search-input');
   var TwitContainer = document.getElementsbyClassName('twit-container');
   var TwitText = document.getElementsbyClassName('twit-content');
   TwitText.filter(filterContent);
}

// filter Twit listener
var searchButton = document.getElementbyId('navbar-search-button');
searchButton.addEventListener("click", filterTwit);

// // [keyup] searching Twit content
// const searchBar = document.forms("navbar-search-input").querySelector("input");
// searchBar.addEventListener('keyup',function(e){
//    const term = e.target.value.toLowerCase();
//    const Twits = list.getElementsByTagName()
// })

/*#################################
 "listeners" for certain 'events' #
 #################################*/
// toggle (open) the modal & clear 'Twit text' field if the button is clicked
trigger.addEventListener("click", function(){
   clearText();
   toggleModal()
});
// toggle (close) the modal if the "x" button is clicked in the header
closeButton.addEventListener("click", toggleModal);
// toggle (close) the modal if anywhere outside of the modal is clicked
window.addEventListener("click", windowOnClick);
// toggle (close) the modal if the 'cancel' button is clicked in the footer
cancelButton.addEventListener("click", toggleModal);
// create a new twitter post
createButton.addEventListener("click", addTwit);
