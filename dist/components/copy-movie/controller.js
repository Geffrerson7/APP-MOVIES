"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findOne = exports.findAllForMovie = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const store = async (req, res) => {
    try {
        const data = req.body;
        const copymovie = await datasource_1.default.copymovie.create({ data });
        return (0, responses_1.success)({ res, status: 201, data: copymovie, message: "Movie copy created" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const moviecopies = await datasource_1.default.copymovie.findMany({ include: { loans: true } });
        return (0, responses_1.success)({ res, data: moviecopies });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const findAllForMovie = async (req, res) => {
    try {
        const idMovie = Number(req.params.idMovie);
        const moviecopies = await datasource_1.default.copymovie.findMany({
            where: {
                movie_id: idMovie,
            },
            include: {
                loans: true,
            },
        });
        return (0, responses_1.success)({ res, data: moviecopies });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAllForMovie = findAllForMovie;
const findOne = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const moviecopy = await datasource_1.default.copymovie.findUnique({
            where: {
                id
            },
            include: {
                loans: true,
            },
        });
        return (0, responses_1.success)({ res, data: moviecopy });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne = findOne;
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const copymovie = await datasource_1.default.copymovie.update({
            where: { id }, data: {
                "format": data.format,
                "price": data.price,
                "status": data.status,
                "movie_id": data.movie_id
            }
        });
        return (0, responses_1.success)({ res, data: copymovie, message: "Movie copy updated successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update = update;
//# sourceMappingURL=controller.js.map