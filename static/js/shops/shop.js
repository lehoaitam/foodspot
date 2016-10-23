"use strict";
var Shop = (function () {
    function Shop(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        Object.assign(this, values);
    }
    return Shop;
}());
exports.Shop = Shop;
