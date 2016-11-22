"use strict";
var MenuDetail = (function () {
    function MenuDetail(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.Left = 0;
        this.Top = 0;
        this.Width = 0;
        this.Height = 0;
        this.ImageURL = '';
        this.Selected = false;
        Object.assign(this, values);
    }
    return MenuDetail;
}());
exports.MenuDetail = MenuDetail;
