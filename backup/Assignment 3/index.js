/*
 * Add your JavaScript to this file to complete the assignment.
 */
var button = document.getElementById("create-twit-button");
var modalBackdrop = document.getElementById("modal-backdrop");
var modal = document.getElementById("create-twit-modal");
var modalCancelButton  = document.getElementsByClassName("modal-cancel-button")[0];
var modalCloseButton = document.getElementsByClassName("modal-close-button")[0];
var modalAcceptButton = document.getElementsByClassName("modal-accept-button")[0];
var twitText = document.getElementById("twit-text-input");
var twitAuthor = document.getElementById("twit-attribution-input");
var twitSearch = document.getElementById("navbar-search-input");
var twitSearchButton = document.getElementById("navbar-search-button")

// toggles whether the 'create Twit' modal appears or not
function modalToggle(event) {
  if (modal.classList.contains("hidden")) {
    twitText.value = "";
    twitText.placeholder = "Enter your Twit here...";
    twitAuthor.value = "";
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
  }
  else {
    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
  }
}

// allow users to add a Twit to the page
function addTwit(event) {
  if ((twitText.value == "") || (twitAuthor.value == "")) {
    alert("You have not entered a value for either text or author")
    return;
  }

  var icon = document.createElement('i');
  icon.classList.add('fa');
  icon.classList.add('fa-bullhorn');

  var twitIcon = document.createElement('div');
  twitIcon.classList.add('twit-icon');
  twitIcon.appendChild(icon);

  var text = document.createElement('p');
  text.classList.add('twit-text');
  text.textContent = twitText.value;

  var author = document.createElement('a');
  author.href = '#';
  author.textContent = twitAuthor.value;

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

  var body = document.getElementsByClassName('twit-container')[0];
  body.appendChild(twit);

  modalToggle();
}

// keyup search filtering
function search(event){
   // define other variables for filtering/searching
   var input, filter, ul, li, a, i;
   input = document.getElementById('navbar-search-input');
   filter = input.value.toLowerCase();
   twit = document.getElementsByClassName('twit');
   text = document.getElementsByTagName("p");
   var txt = document.getElementsByClassName("twit-text");
   var auth = document.getElementsByClassName("twit-attribution");

   // loop through all list items, and hide those who don't match the search query
   for(i = 0; i < twit.length; i++){
      // NOTE: with childNodes, the DOM is counted, and the DOM's text is counted as well
      if(twit[i].childNodes[3].childNodes[1].textContent.toLowerCase().includes(filter) || twit[i].childNodes[3].childNodes[3].textContent.toLowerCase().includes(filter)){
         twit[i].style.display = "";
      }
      else{
         twit[i].style.display = "none";
      }
   }
}

button.addEventListener('click', modalToggle);
modalCancelButton.addEventListener('click', modalToggle);
modalCloseButton.addEventListener('click', modalToggle);
modalAcceptButton.addEventListener('click', addTwit);
twitSearchButton.addEventListener('click', search);
twitSearch.addEventListener('keyup', search);
