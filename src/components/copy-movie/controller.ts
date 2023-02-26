import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const store = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        const copymovie = await prisma.copymovie.create({ data })
        return success({ res, status: 201, data: copymovie, message: "Movie copy created" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const moviecopies = await prisma.copymovie.findMany({ include: { loans: true } })
        return success({ res, data: moviecopies });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findAllForMovie = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idMovie = Number(req.params.idMovie)
        const moviecopies = await prisma.copymovie.findMany({
            where: {
                movie_id: idMovie,
            },
            include: {
                loans: true,
            },
        })
        return success({ res, data: moviecopies });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const moviecopy = await prisma.copymovie.findUnique({
            where: {
                id
            },
            include: {
                loans: true,
            },
        })
        return success({ res, data: moviecopy });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const data = req.body;
        const copymovie = await prisma.copymovie.update({
            where: { id }, data: {
                "format": data.format,
                "price": data.price,
                "status":data.status,
                "movie_id":data.movie_id
            }
        })
        return success({ res, data: copymovie, message: "Movie copy updated successfully" });
    } catch (error) {
        return failure({ res, message: error });
    }
}