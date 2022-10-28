import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { AuthenticateUserServiceMobile } from "../services/AuthenticateUserServiceMobile";

class AuthenticateUserControllerMobile {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthenticateUserServiceMobile();

    try {
      const result = await service.execute(code);
      return response.json(result);
    } catch (err) {
      return response.json(err.message);
    }
  }
}

export { AuthenticateUserControllerMobile };
