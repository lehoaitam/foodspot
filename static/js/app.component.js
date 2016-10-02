(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'categories-app',
      template: '<h2>Categories</h2>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));