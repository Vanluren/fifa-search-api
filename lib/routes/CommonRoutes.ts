import { Application, Response, Request } from "express";
import PlayerController from "../controllers/PlayerController";
import RESPONSE_CODES from "../utils/common-response-codes";

class CommonRoutes {
  private controller: PlayerController = new PlayerController();
  private VERSION = "v1";
  private BASE_URL = `/api/${this.VERSION}`;

  public route(app: Application) {
    app.get(`${this.BASE_URL}/players`, (req: Request, res: Response) => {
      return this.controller.getPlayers(req, res);
    });

    app.get(`${this.BASE_URL}/set-team`, (req: Request, res: Response) => {
      return this.controller.setTeam(req, res);
    });

    app.all("*", (_, res: Response) => {
      return res
        .status(RESPONSE_CODES.NOT_FOUND)
        .send({ error: true, message: "Check your URL please" });
    });
  }
}

export default CommonRoutes;
