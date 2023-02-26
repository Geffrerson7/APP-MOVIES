import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const store = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        const client = await prisma.client.create({ data })
        return success({ res, status: 201, data: client, message: "Client created" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const client = await prisma.client.findUnique({ where: { id }, include: { loans: true } });
        return success({ res, data: client ?? "Client not found" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findAll = async (_req: Request, res: Response): Promise<Response> => {

    try {
        const clients = await prisma.client.findMany({ include: { loans: true } });
        return success({ res, data: clients });
    } catch (error) {
        return failure({ res, message: error });
    }

}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const data = req.body;
        const client = await prisma.client.update({
            where: { id }, data: {
                "name": data.name,
                "last_name": data.last_name,
                "dni": data.dni
            }
        })
        return success({ res, data: client, message: "Client updated successfully" });
    } catch (error) {
        return failure({ res, message: error });
    }
}