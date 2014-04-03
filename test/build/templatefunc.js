(function($) {
    $.jqotecache["template-main"] = function(i, j, data, fn) {
        var out = [];
        try {
            out.push("<div class=\"g-ct-module p-addrlst-wrap\"><div class=\"p-addrlst f-cb\"><div class=\"g-sd-addr js-list\"></div><div class=\"g-mn-addr js-detail\"></div></div></div>");
            return out.join("");
        } catch (e) {
            e.type = "TemplateExecutionError";
            e.args = arguments;
            e.template = arguments.callee.toString();
            throw e;
        }
    };
    $.jqotecache["demo"] = function(i, j, data, fn) {
        var out = [];
        try {
            out.push("<h1>");
            out.push(this.title);
            out.push("</h1><div>hello, ");
            out.push(this.name);
            out.push("</div>");
            return out.join("");
        } catch (e) {
            e.type = "TemplateExecutionError";
            e.args = arguments;
            e.template = arguments.callee.toString();
            throw e;
        }
    };
})(jQuery);