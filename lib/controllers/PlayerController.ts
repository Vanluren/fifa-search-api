import mongoose from "mongoose";
import { request, Request, response, Response } from "express";
import {
  dbError,
  failureResponse,
  insufficientParameters,
  notFoundResponse,
  successResponse,
} from "../utils/common-response-types";
import { Team } from "../types";
import PlayerService from "../services/PlayserService";
import TeamService from "../services/TeamService";

class PlayerController {
  private PlayerService = new PlayerService();
  private TeamService = new TeamService();

  public getPlayers(req: Request, res: Response) {
    const {
      query: { q },
    } = req;

    if (q && q !== "") {
      this.PlayerService.getPlayers(
        {
          $or: [
            { Name: { $regex: q, $options: "i" } },
            { Club: { $regex: q, $options: "i" } },
            { Nationality: q },
          ],
        },
        (e: any, players: any[]) => {
          if (e) return dbError(e, res);
          if (players.length <= 0) {
            return notFoundResponse(res);
          }
          return successResponse("Players found", players, res);
        }
      );
    } else {
      return insufficientParameters(res);
    }
  }

  public async setTeam(req: Request, res: Response) {
    const {
      query: { q },
    } = req;

    if (typeof q === "string") {
      const budget = parseInt(q);

      if (budget) {
        const team = await this.TeamService.getTeamForBudget(budget);
        if (team.length <= 0) {
          return notFoundResponse(res);
        }
        return successResponse("Team found", team, res);
      } else {
        return insufficientParameters(res);
      }
    }
    return failureResponse("Input an integer please", null, res);
  }
}

export default PlayerController;
