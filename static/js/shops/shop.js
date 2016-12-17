"use strict";
var Shop = (function () {
    function Shop(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.Image = '';
        this.ImageURL = '';
        this.Lat = 10.0309641; // Lat, Long của CTU
        this.Long = 105.7667154;
        this.ActiveFlg = true;
        this.Selected = false;
        Object.assign(this, values);
    }
    return Shop;
}());
exports.Shop = Shop;
