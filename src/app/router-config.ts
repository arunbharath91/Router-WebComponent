import { RouterOutlet } from "./router";

RouterOutlet.route('/', {
    templateUrl: 'assets/templates/template.html',
    controller: function() {

    },
    style: 'assets/scss/template.css'
});

RouterOutlet.route('/blog', {
    templateUrl: 'assets/templates/templatedashboard.html',
    controller: function() {

    },
    style: 'assets/scss/templatedashboard.css'
});

RouterOutlet.route('/about', {
    templateUrl: 'assets/templates/about.html',
    controller: function() {

    },
    style: 'assets/scss/templatedashboard.css'
});
