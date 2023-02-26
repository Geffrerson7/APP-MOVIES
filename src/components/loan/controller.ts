import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const store = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const data=req.body
        data.deadline = new Date(data.deadline);
        const loan =await prisma.loan.create({data})
        return success({ res, status: 201, data: loan, message: "Loan created" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findAll = async (_req: Request, res: Response): Promise<Response> =>{
    try {
        const loans = await prisma.loan.findMany({ include: { client: true, copymovie:true } });
        return success({ res, data: loans });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findOne = async (
    req: Request,
    res: Response
): Promise<Response> =>{
    try {
        const id = Number(req.params.id)
        const loan =await prisma.loan.findUnique({where: { id }, include: { client: true, copymovie:true } });
        return success({ res, data: loan ?? "Loan not found" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const data = req.body;
        const loan = await prisma.loan.update({
            where: { id }, data: {
                "deadline": new Date(data.deadline),
                client :{ connect: { id: data.client_id } },
                copymovie :{ connect: { id: data.copymovie_id } }
            }
        })
        return success({ res, data: loan, message: "Loan updated successfully" });
    } catch (error) {
        return failure({ res, message: error });
    }
}