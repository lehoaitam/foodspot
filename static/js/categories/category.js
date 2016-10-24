"use strict";
var Category = (function () {
    function Category(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.ShopId = 0;
        this.ShopName = '';
        this.Selected = false;
        Object.assign(this, values);
    }
    return Category;
}());
exports.Category = Category;
