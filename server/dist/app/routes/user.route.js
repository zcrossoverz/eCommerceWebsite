"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user = __importStar(require("../controllers/user.controller"));
const express_1 = __importDefault(require("express"));
const validation = __importStar(require("../middlewares/validation"));
const auth = __importStar(require("../middlewares/auth"));
const UserRoutes = (app) => {
    const router = express_1.default.Router();
    router.get(/^\/get_all(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, user.getAll);
    router.post("/", [validation.validateEmail, validation.validatePhoneNumber], user.createNew);
    router.get("/:id(\\d+)", user.getOne);
    router.put("/:id", [validation.validateEmail, validation.validatePhoneNumber, auth.verifyToken()], user.updateOne);
    router.post("/:id/add_address", [auth.verifyToken()], user.addAddress);
    router.patch("/:id/set_default_address", [auth.verifyToken()], user.setDefaultAddress);
    router.patch("/change_password", auth.verifyToken(), user.changePassword);
    router.put("/:id_user/update_address/:id_address", auth.verifyToken(), user.updateAddress);
    router.delete("/:id", [auth.verifyToken(), auth.require_admin()], user.deleteOne);
    router.delete("/:id_user/delete_address/:id_address", auth.verifyToken(), user.deleteAddress);
    app.use("/api/user", router);
};
exports.UserRoutes = UserRoutes;
