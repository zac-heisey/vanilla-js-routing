/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  url = url || window.location.href;
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i=0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

// Get list name input field
var listNameInput = document.querySelector('#list-name');
// Get created lists div
var createdLists = document.querySelector('#created-lists');
// Get delete lists button
var deleteLists = document.querySelector('#delete-lists');

listNameInput.addEventListener('keypress', function(event) {
  // Get value of list name input field
  var listNameValue = listNameInput.value;
  // Create message variable
  var newList;
  if (event.which === 13) {
    if (listNameValue.length > 0) {
      newList = listNameValue;
      addTodoList(newList);
    }
    // Prevent default behavior on 'enter' keypress
    event.preventDefault();
    // Clear input field
    listNameInput.value = '';
  }
}, false);

// Function to add todo list to created lists div
function addTodoList(newList) {
  // Creat url from list name
  var listURL = newList.split(' ').join('%20');
  // Create new <a> element to append to form
  var a = document.createElement('a');
  a.setAttribute('href', `?list-name=${listURL}`);
  // Add the message to the <a> element
  a.innerText = newList;
  // Add the <a> element to the created lists
  createdLists.append(a);
  // Store new list in local localStorage
  var storedLists = createdLists.innerHTML;
  localStorage.setItem('savedLists', storedLists);
}

// Check for saved lists in localStorage
var getSavedLists = localStorage.getItem('savedLists');
// Render saved lists to DOM
if (getSavedLists) {
  createdLists.innerHTML = getSavedLists;
}

// Clear lists from localStorage on button click
deleteLists.addEventListener('click', function(event) {
  // Bail if click is not on submit button
  if (event.target.id !== 'delete-lists') return;
  // Clear localStorage and createdLists HTML
  localStorage.clear();
  createdLists.innerHTML = '';
}, false);

// Render Individual Todo List Pages
var params = getParams();
