import type { Request, Response } from "express";
import prisma from "../../datasource";
import { success, failure } from "../../responses";

export const store = async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body;
        data.release_year = new Date(data.release_year);
        const movie = await prisma.movie.create({ data });

        return success({ res, status: 201, data: movie, message: "Movie created" });
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
        const movie = await prisma.movie.findUnique({ where: { id }, include: {copymovies:true}});
        return success({ res, data: movie ?? "movie not found" });
    } catch (error) {
        return failure({ res, message: error });
    }
}

export const findAll = async (req: Request, res: Response): Promise<Response> => {

    try {
        const movies = await prisma.movie.findMany({include: {copymovies:true}});
        return success({ res, data: movies });
    } catch (error) {
        return failure({ res, message: error });
    }

}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id)
        const data = req.body;
        const movie = await prisma.movie.update({
            where: { id }, data: {
                "title": data.title,
                "release_year": new Date(data.release_year),
            }
        })
        return success({ res, data: movie, message: "Movie updated successfully" });
    } catch (error) {
        return failure({ res, message: error });
    }
}