// Get the app container
var app = document.querySelector('[data-app]');
// Determine the view/UI
var page = app.getAttribute('data-app');

//========================================//
// Create new component via Reef.js
var todoApp = new Reef(app, {
  data: {
    createListBtnText: 'Create a New Todo List',
    myListBtnText: 'See My Lists'
  },
  template: function (data) {
    var html = '<button>' + data.createListBtnText + '</button><button>' + data.myListBtnText + '</button>';
    return html;
  }
});

// Render Todo App
todoApp.render();
