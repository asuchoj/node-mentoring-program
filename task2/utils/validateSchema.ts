import {errorResponse} from "./errorResponse"

export function validateSchema (schema: any) :any {
  return (req, res, next) => {
    const {error} = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    })

    if (error && error.isJoi) {
      res.status(400).send(errorResponse(error.details));
    } else {
      next();
    }
  }
}