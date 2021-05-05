module.exports = {
  configureWebpack: config => {
    config.plugins.forEach((plugin) => {
      if(plugin.constructor.name === 'HtmlWebpackPlugin') {
        plugin.options.inject = false;
        plugin.options.minify.collapseWhitespace = false;
      }
    });
  },
  lintOnSave: false,
  outputDir: "../server_rna/flask_app/static/dist_vuejs",
  publicPath: "/static/dist_vuejs",
  pages: {
    edit_map: {
      // entry for the page
      entry: "src/pages/EditMap.js",
      // the source template
      template: "../server_rna/flask_app/templates/vue_templates/edit_map.html",
      // output as dist/index.html
      filename: "../../../flask_app/templates/map/edit_map.html",
    },
    // display_map: {
    //   // entry for the page
    //   entry: "src/pages/DisplayMap.js",
    //   // the source template
    //   template: "../server_rna/flask_app/templates/vue_templates/display_map.html",
    //   // output as dist/index.html
    //   filename: "../../../flask_app/templates/map/display_map.html",
    // },
  },
};
