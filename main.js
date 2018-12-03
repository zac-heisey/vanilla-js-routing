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
// Get sub-heading
var subHeading = document.getElementById('sub-heading');
// Get list label
var listLabel = document.querySelector('label');
// Get query string data from URL
var params = getParams();
// Check for saved lists and todo items in localStorage
var getSavedLists = localStorage.getItem('savedLists');
var getSavedListItems = JSON.parse(localStorage.getItem('savedItems'));

// Render saved lists to DOM
if (getSavedLists && params['list-name'] === undefined) {
  createdLists.innerHTML = getSavedLists;
} else if (getSavedListItems && params['list-name'] !== undefined) {
  for (var i = 0; i < getSavedListItems.length; i++) {
    if (getSavedListItems[i].list === params['list-name']) {
      createdLists.innerHTML = getSavedListItems[i].markup;
    }
  }
}

// Render individual todo list page
if (params['list-name'] !== undefined) {
  // Update sub-heading with current list title
  subHeading.innerText = params['list-name'];
  // Update input field label text
  listLabel.innerText = 'Add a Todo Item to Your List';
  // Update delete button text
  deleteLists.innerText = 'Delete All Todo Items';
}

// Function to add todo list to created lists div
function addTodoList(newList) {
  // Creat url from list name
  var listURL = newList.split(' ').join('%20');
  // Create new <a> element to append to form
  var a = document.createElement('a');
  a.setAttribute('href', `?list-name=${listURL}`);
  // Add input text to the <a> element
  a.innerText = newList;
  // Add the <a> element to the created lists
  createdLists.append(a);
  // Store new list in local localStorage
  var storedLists = createdLists.innerHTML;
  localStorage.setItem('savedLists', storedLists);
}

// Function to add todo list item to created list
function addTodoItem(newItem) {
  // Create new <label> element to append to list
  var checkboxLabel = document.createElement('label');
  // Create new <input> element to append to checkboxLabel
  var checkboxInput = document.createElement('input');
  // Create new <span> element to append to checkboxInput
  var checkboxSpan = document.createElement('span');
  // Add type attribute to checkbox input element
  checkboxInput.setAttribute('type', 'checkbox');
  // Add new class to checkbox span element
  checkboxSpan.classList.add('todo-item');
  // Add the input field text to the checkboxSpan element
  checkboxSpan.innerText = newItem;
  // Append checkboxInput & checkboxSpan to checkboxLabel
  checkboxLabel.append(checkboxInput);
  checkboxLabel.append(checkboxSpan);
  // Add the <label> element to the created lists
  createdLists.append(checkboxLabel);
  // Store new list item in localStorage
  if (getSavedListItems) {
    getSavedListItems.push({ list: params['list-name'], markup: createdLists.innerHTML });
    localStorage.setItem('savedItems', JSON.stringify(getSavedListItems));
  } else {
    var listItems = [];
    listItems.push({ list: params['list-name'], markup: createdLists.innerHTML });
    localStorage.setItem('savedItems', JSON.stringify(listItems));
  }
}

// Listen for keypress event on list name input field
listNameInput.addEventListener('keypress', function(event) {
  // Get value of list name input field
  var listNameValue = listNameInput.value;
  // Check if 'enter' key is pressed
  if (event.which === 13) {
    if (listNameValue.length > 0 && params['list-name'] === undefined) {
      newList = listNameValue;
      addTodoList(newList);
    } else if (listNameValue.length > 0) {
      newItem = listNameValue;
      addTodoItem(newItem);
    }
    // Prevent default behavior on 'enter' keypress
    event.preventDefault();
    // Clear input field
    listNameInput.value = '';
  }
}, false);

// Clear lists from localStorage on button click
deleteLists.addEventListener('click', function(event) {
  // Bail if click is not on submit button
  if (event.target.id !== 'delete-lists') return;
  // Clear localStorage and createdLists HTML
  localStorage.clear();
  createdLists.innerHTML = '';
}, false);
