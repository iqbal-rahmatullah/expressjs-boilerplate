import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { ErrorResponse } from "../error/error.response"

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation Error",
      details: error.errors.map((err) => {
        return {
          message: err.message,
        }
      }),
    })
  } else if (error instanceof ErrorResponse) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    })
  }
}
