import { Request, Response } from "express";

export default function (
  err: any,
  req: Partial<Request>,
  res: Partial<Response>,
  next: any,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}
