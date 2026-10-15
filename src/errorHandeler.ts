import {Request, Response} from "express"

const errorHandler = (fn: Function) => {
    return (req: Request, res: Response)=> {
        fn(req,res).catch((error: any)=> {
            res.status(500).json({
                message:" Internal server error",
                error: error.message || "An unexpected error occurred"
            })
        })
    }
}
export default errorHandler