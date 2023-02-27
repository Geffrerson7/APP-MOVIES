"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
function success({ res, status = 200, data, message }) {
    return res.status(status).json({
        ok: true,
        data,
        message,
    });
}
exports.success = success;
function failure({ res, status = 500, message }) {
    return res.status(status).json({
        ok: false,
        message,
    });
}
exports.failure = failure;
//# sourceMappingURL=index.js.map