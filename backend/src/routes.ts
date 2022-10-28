import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { AuthenticateUserControllerMobile } from "./controllers/AuthenticateUserControllerMobile";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessageController } from "./controllers/GetLast3MessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

/* Rotas POST */
router.post("/authenticate", new AuthenticateUserController().handle);
router.post(
  "/authenticatemobile",
  new AuthenticateUserControllerMobile().handle
);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

/* Rotas GET */
router.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

router.get("/messages/last3", new GetLast3MessageController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
