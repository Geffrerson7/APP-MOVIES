"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const responses_1 = require("../../responses");
dotenv_1.default.config();
function requireToken(req, res, next) {
    try {
        let token = req.headers?.authorization;
        if (!token)
            return (0, responses_1.success)({ res, status: 401, message: "Unauthorized" });
        if (!token.startsWith("Bearer "))
            return (0, responses_1.success)({ res, status: 401, message: "Token format wrong" });
        token = token.split(' ')[1];
        const uid = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    }
    catch (error) {
        return (0, responses_1.failure)({ res, status: 401, message: error });
    }
}
exports.requireToken = requireToken;
//# sourceMappingURL=requireToken.js.map