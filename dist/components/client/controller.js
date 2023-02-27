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
        const client = await datasource_1.default.client.create({ data });
        return (0, responses_1.success)({ res, status: 201, data: client, message: "Client created" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.store = store;
const findOne = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const client = await datasource_1.default.client.findUnique({ where: { id }, include: { loans: true } });
        return (0, responses_1.success)({ res, data: client ?? "Client not found" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findOne = findOne;
const findAll = async (_req, res) => {
    try {
        const clients = await datasource_1.default.client.findMany({ include: { loans: true } });
        return (0, responses_1.success)({ res, data: clients });
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
        const client = await datasource_1.default.client.update({
            where: { id }, data: {
                "name": data.name,
                "last_name": data.last_name,
                "dni": data.dni
            }
        });
        return (0, responses_1.success)({ res, data: client, message: "Client updated successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update = update;
//# sourceMappingURL=controller.js.map