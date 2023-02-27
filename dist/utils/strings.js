"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hashPassword(password) {
    return (0, node_crypto_1.createHmac)("sha256", "silabuz-secret").update(password).digest("hex");
}
exports.hashPassword = hashPassword;
function comparePassword(password, checkPassword) {
    return password === hashPassword(checkPassword);
}
exports.comparePassword = comparePassword;
const generateToken = (uid) => {
    const expiresIn = "2 days";
    try {
        const token = jsonwebtoken_1.default.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    }
    catch (error) {
        return error;
    }
};
exports.generateToken = generateToken;
//# sourceMappingURL=strings.js.map