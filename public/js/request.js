/*
 * Name: Ryan DiRezze
 * Assignment: Website Project - Consulting Services Company
 * File Description: Additional JavaScript for Sending POST Requests to Store Form Data in a Database
 * Due Date: May 26, 2019 (05/26/2019)
 */

/* 
 * add a form field if the user chooses, "Other," as his/her, "Country" 
 * so that he/she can manually enter his/her country 
 */

/* 
 * un-hide a text box for the user to manually input his/her country if 
 * "Other" is chosen from the drop-down list 
 */
function addCountryField() {
    /* define the value for the drop-down list selection */
    var value = document.getElementById("country");

    /* hide the text box by default and if the user HAS NOT chosen "Other" */
    if (value.value != "other") {
        var hiddenLabel = document.getElementById("otherCountryLabel");
        hiddenLabel.style.visibility = "hidden";

        var hiddenField = document.getElementById("otherCountry");
        hiddenField.style.visibility = "hidden";
    }

    /* only un-hide the text box if the user chooses "Other" from the country drop-down list */
    else {
        var hiddenLabel = document.getElementById("otherCountryLabel");
        hiddenLabel.style.visibility = "visible";

        var hiddenField = document.getElementById("otherCountry");
        hiddenField.style.visibility = "visible";
    }
}

/* event listener for when the "Country" drop-down list selection changes */
var country = document.getElementById("country");
country.addEventListener("change", addCountryField());

//
//#########################################################
//
