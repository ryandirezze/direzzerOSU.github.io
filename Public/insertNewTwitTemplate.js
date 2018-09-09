(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['insertNewTwit'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"twit\">\n   <div class=\"twit-icon\">\n     <i class=\"fa fa-bullhorn\"></i>\n   </div>\n   <div class=\"twit-content\">\n     <p class=\"twit-text\">\n       "
    + alias4(((helper = (helper = helpers.TWIT_TEXT || (depth0 != null ? depth0.TWIT_TEXT : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"TWIT_TEXT","hash":{},"data":data}) : helper)))
    + "\n     </p>\n     <p class=\"twit-attribution\">\n       <a href=\"#\">"
    + alias4(((helper = (helper = helpers.TWIT_AUTHOR || (depth0 != null ? depth0.TWIT_AUTHOR : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"TWIT_AUTHOR","hash":{},"data":data}) : helper)))
    + "</a>\n     </p>\n   </div>\n</article>\n";
},"useData":true});
})();