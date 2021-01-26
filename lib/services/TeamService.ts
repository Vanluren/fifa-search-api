import { Team } from "../types";
import PlayerSchema from "../schema/player";

class TeamService {
  HB = [
    "CB",
    "LCB",
    "RCB",
    "CDM",
    "LDM",
    "RDM",
    "CM",
    "LCM",
    "RCM",
    "LM",
    "RM",
  ];

  FB = ["LB", "RB", "LWB", "RWB"];

  GK = "GK";

  FW = ["CAM", "LAM", "RAM", "LWF", "RWF", "CF", "LCF", "RCF"];

  public team = [];

  public async getTeamForBudget(budget: number): Promise<Team> {
    const fw = await PlayerSchema.find({ Position: { $in: this.FW } })
      .sort({ Overall: 1 })
      .limit(5)
      .exec();
    const gk = await PlayerSchema.find({ Position: this.GK })
      .sort({ Overall: 1 })
      .limit(1)
      .exec();
    const fb = await PlayerSchema.find({ Position: { $in: this.FB } })
      .sort({ Overall: 1 })
      .limit(2)
      .exec();
    const hb = await PlayerSchema.find({ Position: { $in: this.HB } })
      .sort({ Overall: 1 })
      .limit(3)
      .exec();

    this.team = [...gk, ...fb, ...hb, ...fw];

    return this.team;
  }

  private convertValue(value: string) {
    let result;
    result = value.split("€").filter((e) => e !== "");
    result = value[0].split(/[m,k]/i);
    if (value[1] === "M") {
      return parseFloat(result[0]) * 10000000;
    }
    return parseFloat(result[0]) * 1000;
  }
}

export default TeamService;
