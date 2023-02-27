"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const store = async (req, res) => {
    try {
        const data = req.body;
        data.release_year = new Date(data.release_year);
        const movie = await datasource_1.default.movie.create({ data });
        return (0, responses_1.success)({ res, status: 201, data: movie, message: "Movie created" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.store = store;
const findOne = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const movie = await datasource_1.default.movie.findUnique({ where: { id }, include: { copymovies: true } });
        return (0, responses_1.success)({ res, data: movie ?? "movie not found" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne = findOne;
const findAll = async (req, res) => {
    try {
        const movies = await datasource_1.default.movie.findMany({ include: { copymovies: true } });
        return (0, responses_1.success)({ res, data: movies });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const movie = await datasource_1.default.movie.update({
            where: { id }, data: {
                "title": data.title,
                "release_year": new Date(data.release_year),
            }
        });
        return (0, responses_1.success)({ res, data: movie, message: "Movie updated successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update = update;
//# sourceMappingURL=controller.js.map