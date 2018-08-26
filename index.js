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

function newPost(){
   var temp = document.getElementById("twit_post");
   var posts = document.querySelector("article");
   var clone = document.importNode(temp.content, true);
   p = clone.querySelectorAll("p");
   p[0].textContent = twit_text;
   console.log(p[0]);
   p[1].textContent = twit_author;
   p.InsertBefore(p, posts);
}


// function createTwit(){
//    var p-text = document.createElement('p');
//    p-text.append(twit_text);
//    var author-text = document.createElement('p');
//    author-text.append(twit)
// }



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
createButton.addEventListener("click", newPost);
