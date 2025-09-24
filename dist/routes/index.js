"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const person_route_1 = require("../module/person/person.route");
exports.router = express_1.default.Router();
exports.router.use('/auth', auth_route_1.AuthRoute);
exports.router.use('/person', person_route_1.PersonRoute);
