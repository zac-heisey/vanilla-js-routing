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

  // Main app component (renders homepage UI)
  var todoApp = new Reef('#app', {
    data: {
      createListBtnText: 'Create a New Todo List',
      myListBtnText: 'View My Lists',
      todoLists: ['Todo List 1', 'Todo List 2', 'Todo List 3']
    },
    template: function (data) {
      var html = '<button id="create-list">' + data.createListBtnText + '</button><button id="view-lists">' + data.myListBtnText + '</button>';
      return html;
    }
  });
  // Todo lists component (renders lists UI)
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

  // Create new list
  var createList = function() {
    app.innerHTML += '<h2>Let\'s Create Your New Todo List!</h2>' +
    '<form id="add-todolist">' +
    '<label for="list-name">Name Your List</label><br>' +
    '<input type="text" name="list-name" id="list-name" autofocus><br>' +
    '<input type="text" name="add" placeholder="Add a todo item to your new list">' +
    '<button type="button" class="button">Add Todo</button>' +
    '</form>';
  }

  // Show existing lists
  var showLists = function() {
    location.assign('/lists/');
  };

  /**
  *** EVENT HANDLERS
  **/

  document.addEventListener('click', function(event) {
    // Create new list
    if (event.target.id === 'create-list') {
      event.preventDefault();
      createList();
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
