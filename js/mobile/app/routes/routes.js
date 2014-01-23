app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'commande': 'commande',
        'client': 'client',
    },
    home: function() {
        // on affiche les catégories
        $.ajax({
            type: 'GET',
            url: app.config.url + '/basic_auth',
            success: function(data, textStatus, request) {
                app.user.set({
                    logged: true
                });
                app.routes.navigate('commande', {
                    trigger: true,
                    replace: true
                });
            },
            error: function(request, textStatus, errorThrown) {
                app.routes.navigate('login', {
                    trigger: true,
                    replace: true
                });
            }
        });
    },
    login: function() {
        alert('route login');
        if (app.views.login === undefined) {
            app.views.login = new app.Views.LoginView({
                el: $('#content')
            });
        }
        app.views.login.render();
    },
    commande: function() {
        alert('route commande');
        if (app.views.app === undefined) {
            app.views.app = new app.Views.App({
                el: $('#content')
            });
        } else {
            app.views.app.render();
        }

    },
    client: function() {
        alert('route recherche client');
        app.views.app.delete();
        new app.Views.SearchUser({
            el: $('#content')
        }).render();
        app.collections.users.fetch();
    },

});