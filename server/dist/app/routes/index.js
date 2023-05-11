"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const user_route_1 = require("./user.route");
const order_route_1 = require("./order.route");
const product_route_1 = require("./product.route");
const auth_route_1 = require("./auth.route");
const productOption_route_1 = require("./productOption.route");
const specification_route_1 = require("./specification.route");
const brand_route_1 = require("./brand.route");
const inventory_route_1 = require("./inventory.route");
const notification_route_1 = require("./notification.route");
const feedback_route_1 = require("./feedback.route");
const analysis_route_1 = require("./analysis.route");
const coupon_route_1 = require("./coupon.route");
exports.Routes = [
    user_route_1.UserRoutes,
    order_route_1.OrderRoutes,
    product_route_1.ProductRoutes,
    auth_route_1.AuthRoutes,
    productOption_route_1.ProductOptionRoutes,
    specification_route_1.specificationRoutes,
    brand_route_1.brandRoutes,
    inventory_route_1.InventoryRoutes,
    notification_route_1.NotifyRoutes,
    feedback_route_1.feedbackRoutes,
    analysis_route_1.AnalysisRoutes,
    coupon_route_1.CouponRoutes
];
