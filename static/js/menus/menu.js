"use strict";
var Menu = (function () {
    function Menu(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.Image = '';
        this.ImageURL = '';
        this.Selected = false;
        Object.assign(this, values);
    }
    return Menu;
}());
exports.Menu = Menu;
