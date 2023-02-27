"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findOne = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const store = async (req, res) => {
    try {
        const data = req.body;
        data.deadline = new Date(data.deadline);
        const loan = await datasource_1.default.loan.create({ data });
        return (0, responses_1.success)({ res, status: 201, data: loan, message: "Loan created" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const loans = await datasource_1.default.loan.findMany({ include: { client: true, copymovie: true } });
        return (0, responses_1.success)({ res, data: loans });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const findOne = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const loan = await datasource_1.default.loan.findUnique({ where: { id }, include: { client: true, copymovie: true } });
        return (0, responses_1.success)({ res, data: loan ?? "Loan not found" });
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
        const loan = await datasource_1.default.loan.update({
            where: { id }, data: {
                "deadline": new Date(data.deadline),
                client: { connect: { id: data.client_id } },
                copymovie: { connect: { id: data.copymovie_id } }
            }
        });
        return (0, responses_1.success)({ res, data: loan, message: "Loan updated successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update = update;
//# sourceMappingURL=controller.js.map