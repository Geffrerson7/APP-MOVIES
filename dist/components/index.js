"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRouter = exports.ClientRouter = exports.CopymovieRouter = exports.MovieRouter = exports.UserRouter = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var movie_1 = require("./movie");
Object.defineProperty(exports, "MovieRouter", { enumerable: true, get: function () { return __importDefault(movie_1).default; } });
var copy_movie_1 = require("./copy-movie");
Object.defineProperty(exports, "CopymovieRouter", { enumerable: true, get: function () { return __importDefault(copy_movie_1).default; } });
var client_1 = require("./client");
Object.defineProperty(exports, "ClientRouter", { enumerable: true, get: function () { return __importDefault(client_1).default; } });
var loan_1 = require("./loan");
Object.defineProperty(exports, "LoanRouter", { enumerable: true, get: function () { return __importDefault(loan_1).default; } });
//# sourceMappingURL=index.js.map