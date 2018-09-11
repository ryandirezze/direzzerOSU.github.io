(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['insertNewTwit'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <p class=\"twit-text\">\n          "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\n        </p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"#\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<article class=\"twit\">\n   <div class=\"twit-icon\">\n     <i class=\"fa fa-bullhorn\"></i>\n   </div>\n   <div class=\"twit-content\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.text : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "     <p class=\"twit-attribution\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.author : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "     </p>\n   </div>\n</article>\n";
},"useData":true});
})();