// Get the app container
var app = document.querySelector('[data-app]');
// Determine the view/UI
var page = app.getAttribute('data-app');

// Create new component via Reef.js
var todoApp = new Reef(app, {
  data: {
    createListBtnText: 'Create a New Todo List',
    myListBtnText: 'View My Lists'
  },
  template: function (data) {
    var html = '<button id="create-list">' + data.createListBtnText + '</button><button id="view-lists">' + data.myListBtnText + '</button>';
    return html;
  }
});

// Render Todo App
todoApp.render();

// Create new list
var createList = function() {
  // code block TBD
}

// Show existing lists
var showLists = function() {
  // code block TBD
};

document.addEventListener('click', function(event) {
  // Create new list
  if (event.target.id === 'create-list') {
    // code block TBD
  }
  // View existing lists
  if (event.target.id === 'view-lists') {
    location.assign('/lists/');
  }
});
