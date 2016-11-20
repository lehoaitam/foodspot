"use strict";
var Food = (function () {
    function Food(values) {
        if (values === void 0) { values = {}; }
        this.Name = '';
        this.Description = '';
        this.Price = 0;
        this.Image = '';
        this.ImageURL = '';
        this.ActiveFlg = true;
        this.CategoryId = 0;
        this.CategoryName = '';
        this.Selected = false;
        Object.assign(this, values);
    }
    return Food;
}());
exports.Food = Food;
