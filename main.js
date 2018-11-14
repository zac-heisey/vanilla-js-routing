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
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

;(function() {
  /**
  *** APP COMPONENTS (using Reef.js)
  **/

  // Main app component (render homepage UI)
  var todoApp = new Reef('#app', {
    data: {
      myListBtnText: 'View Existing Lists',
      todoLists: ['Todo List 1', 'Todo List 2', 'Todo List 3']
    },
    template: function (data) {
      var html = '</button><button id="view-lists">' + data.myListBtnText + '</button>' +
      '<h2>Let\'s Create Your New Todo List!</h2>' +
      '<form id="add-todolist">' +
      '<label for="list-name">Name Your List</label><br>' +
      '<input type="text" name="list-name" id="list-name" autofocus><br>' +
      '<label for="add-items">Add Your Todo Items</label><br>' +
      '<input type="text" name="list-item" id="list-item" placeholder="what needs to get done?">' +
      '<button type="button" id="add-todo-btn">Add Todo</button><br>' +
      '<div id="new-list-items"></div>' +
      '<button type="submit" id="save-todo-list">Save My Todo List</button>'
      '</form>';
      return html;
    }
  });
  // Todo lists component (render lists UI)
  var todoLists = new Reef('#app', {
    data: todoApp.data,
    template: function(data) {
      var html = '<h2>My Existing Todo Lists</h2><ul>';
      data.todoLists.forEach(function (todoList) {
  			html += '<li>' + todoList + '</li>';
  		});
  		html += '</ul>';
  		return html;
    },
  });

  /**
  *** METHODS
  **/

  // Save new list
  var saveList = function() {
    // TBD
  }

  // Display new list
  var displayNewList = function() {
    // Get todo item input
    var todoListInput = document.querySelector('#list-item');
    // Get new list items div element
    var newListDiv = document.querySelector('#new-list-items');
    // Create new checkbox + label elements to append to new list div
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.type = 'checkbox';
    label.innerText = todoListInput.value;
    todoListInput.value = '';
    newListDiv.appendChild(li);
    li.appendChild(input);
    li.appendChild(label);
  }

  // Show existing lists
  var showLists = function() {
    location.assign('/lists/');
  };

  /**
  *** EVENT HANDLERS
  **/

  document.addEventListener('click', function(event) {
    // Display new list
    if (event.target.id === 'add-todo-btn') {
      displayNewList();
    }
    // View existing lists
    if (event.target.id === 'view-lists') {
      showLists();
    }
  });

  /**
  *** RENDER APP
  **/

  // Get the app container
  var app = document.querySelector('[data-app]');
  // Determine the view/UI (homepage or lists)
  var page = app.getAttribute('data-app');

  // Render the correct UI for todo app
  if (page === 'homepage') {
  	todoApp.render();
  }
  if (page === 'lists') {
  	todoLists.render();
  }

}());
