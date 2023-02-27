"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findOne = exports.findAll = exports.login = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const responses_1 = require("../../responses");
const strings_1 = require("../../utils/strings");
const store = async (req, res) => {
    try {
        const data = req.body;
        data.password = (0, strings_1.hashPassword)(data.password);
        data.last_session = new Date(data.last_session);
        data.date_born = new Date(data.date_born);
        const user = await datasource_1.default.user.create({ data });
        return (0, responses_1.success)({ res, status: 201, data: user, message: "User created successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.store = store;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await datasource_1.default.user.findFirst({ where: { email } });
        if (!user) {
            return (0, responses_1.failure)({ res, status: 403, message: "Username doesn't exist" });
        }
        else {
            if (!(0, strings_1.comparePassword)(user?.password, password)) {
                return (0, responses_1.failure)({ res, message: "Incorrect password" });
            }
            else {
                const token = (0, strings_1.generateToken)(user?.id);
                const loggedUser = await datasource_1.default.user.update({
                    where: {
                        email: user.email,
                    },
                    data: {
                        last_session: new Date(),
                    },
                });
                return (0, responses_1.success)({ res, data: { loggedUser, token }, message: "Logged user" });
            }
        }
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.login = login;
const findAll = async (_req, res) => {
    try {
        const users = await datasource_1.default.user.findMany();
        return (0, responses_1.success)({ res, data: users });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.findAll = findAll;
const findOne = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await datasource_1.default.user.findUnique({ where: { id } });
        return (0, responses_1.success)({ res, data: user ?? "User not found" });
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
        const user = await datasource_1.default.user.update({ where: { id }, data: {
                "name": data.name,
                "email": data.email,
                "password": (0, strings_1.hashPassword)(data.password),
                "date_born": new Date(data.date_born),
                "phone_number": data.phone_number,
                "role": data.role
            } });
        return (0, responses_1.success)({ res, data: user, message: "User updated successfully" });
    }
    catch (error) {
        return (0, responses_1.failure)({ res, message: error });
    }
};
exports.update = update;
//# sourceMappingURL=controller.js.map