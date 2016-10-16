"use strict";
var Category = (function () {
    function Category(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.ShopName = '';
        Object.assign(this, values);
    }
    return Category;
}());
exports.Category = Category;
