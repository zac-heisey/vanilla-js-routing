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
// Check for saved todo lists and todo items in localStorage
var getSavedListItems = JSON.parse(localStorage.getItem('savedItems'));

// Render saved lists and todo items to DOM
if (getSavedListItems) {
  for (var i = 0; i < getSavedListItems.length; i++) {
    if (params['list-name'] === undefined) {
      renderTodos(getSavedListItems[i].list);
    } else if (params['list-name'] === getSavedListItems[i].list && getSavedListItems[i].items.length > 0) {
      getSavedListItems[i].items.forEach(function(item) {
        renderTodos(item);
      });
    }
  }
}

// Render individual todo list page(s)
if (params['list-name'] !== undefined) {
  // Update sub-heading with current list title
  subHeading.innerText = params['list-name'];
  // Update input field label text
  listLabel.innerText = 'Add a Todo Item to Your List';
  // Update delete button text
  deleteLists.innerText = 'Delete Completed Todo Items';
}

// Create markup for todo list name(s) or list item(s) depending on URL params
function renderTodos(newItem) {
  if (params['list-name'] === undefined) {
    // Create url from list name
    var listURL = newItem.split(' ').join('%20');
    // Add new list to createdLists markup
    createdLists.innerHTML +=
    `<a href="?list-name=${listURL}">${newItem}</a>`;
  } else {
    // Add new list item to createdLists markup
    createdLists.innerHTML +=
    `<label><input type="checkbox"><span class="todo-item">${newItem}</span></label>`;
  }
}

// Add new todo list or list item
function addTodo(newItem) {
  // Run renderTodos function
  renderTodos(newItem);
  // Check for existing list items in localStorage
  if (getSavedListItems) {
    // Return an array of saved list names
    var listItems = getSavedListItems.map(function(item) {
    	return item.list;
    });
    // If a saved list name matches the current params list name...
    if (listItems.indexOf(params['list-name']) !== -1) {
      // Update that list's todo items in localStorage
      i = listItems.indexOf(params['list-name']);
      getSavedListItems[i].items.push(newItem);
      localStorage.setItem('savedItems', JSON.stringify(getSavedListItems));
    // Else push the new todo item(s) to localStorage
    } else {
      getSavedListItems.push({ list: newItem, items: [] });
      localStorage.setItem('savedItems', JSON.stringify(getSavedListItems));
    }
  } else {
    // If there are no list items in localStorage, create & store new list item(s)
    getSavedListItems = [];
    getSavedListItems.push({ list: newItem, items: [] });
    localStorage.setItem('savedItems', JSON.stringify(getSavedListItems));
  }
}

// Listen for keypress event on list name input field
listNameInput.addEventListener('keypress', function(event) {
  // Get value of list name input field
  var listNameValue = listNameInput.value;
  // Check if 'enter' key is pressed
  if (event.which === 13) {
    if (listNameValue.length > 0) {
      newItem = listNameValue;
      addTodo(newItem);
    }
    // Prevent default behavior on 'enter' keypress
    event.preventDefault();
    // Clear input field
    listNameInput.value = '';
  }
}, false);

// Listen for button clicks on document
document.addEventListener('click', function(event) {
  // If click is on delete button
  if (event.target.id === 'delete-lists') {
    // Clear localStorage and createdLists HTML
    localStorage.clear();
    createdLists.innerHTML = '';
  }
  // If click is on checkbox input
  if (event.target.type === 'checkbox') {
    // Toggle 'checked' class
    event.target.toggleAttribute('checked');
    event.target.nextSibling.classList.toggle('checked');
  }
}, false);
