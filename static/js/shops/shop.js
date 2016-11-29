"use strict";
var Shop = (function () {
    function Shop(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.Image = '';
        this.ImageURL = '';
        this.Lat = 0;
        this.Long = 0;
        this.ActiveFlg = true;
        this.Selected = false;
        Object.assign(this, values);
    }
    return Shop;
}());
exports.Shop = Shop;
