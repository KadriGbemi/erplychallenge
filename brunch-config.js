exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "js/app.js"
    },
    stylesheets: {
      joinTo: "css/app.css",
      order: {
        after: ["web/static/css/app.scss"] // concat app.css last
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor/]
  },

  copycat: {
    "fonts": ["node_modules/bootstrap-sass/assets/fonts/bootstrap"] // copy node_modules/bootstrap-sass/assets/fonts/bootstrap/* to priv/static/fonts/
  },
  sass: {
    options: {
      includePaths: ["node_modules/bootstrap-sass/assets/stylesheets"], // tell sass-brunch where to look for files to @import
      precision: 8 // minimum precision required by bootstrap-sass 
    }
  }
},
  modules: {
    autoRequire: {
      "js/app.js": ["web/static/js/app"]
    }
  },

  npm: {
    enabled: true,
    aliases: { vue: "vue/dist/vue.common.js" },
    globals: { // bootstrap-sass' JavaScript requires both '$' and 'jQuery' in global scope
      $: 'jquery',
      jQuery: 'jquery',
      bootstrap: 'bootstrap-sass' // require bootstrap-sass' JavaScript globally
    }
}
};
