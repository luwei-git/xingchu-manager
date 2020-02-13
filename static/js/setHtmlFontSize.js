import  fastclick from 'fastclick';
(function () {
    var constMaxWidth = 375;
    var constMaxHtmlFontSize = 100;//1rem=constMaxHtmlFontSize
    var minUnit = 1 / constMaxHtmlFontSize;//最小刻度
    var self = window;
    self.width = constMaxWidth;//设置默认最大宽度
    self.fontSize = constMaxHtmlFontSize;//默认字体大小
    self.widthProportion = function () {
        var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / self.width;
        return p < minUnit ? minUnit : p;
    };
    self.changePage = function () {
        self.val = self.widthProportion() * self.fontSize;
        if (self.val > constMaxHtmlFontSize) {
            self.val = constMaxHtmlFontSize
        }
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + self.val + "px !important");
    }
    self.changePage();
    window.addEventListener("resize", function () {
        self.changePage();
    }, false);
    window.addEventListener('load', function () {
        fastclick.attach(document.body);
    }, false);
})();
