import PlayerSchema from "../schema/player";

export default class PlayerService {
  public createUser(callback: any) {
    return new PlayerSchema({
      name: "villads",
      club: "Tottenham",
      nationality: "Danish",
    }).save(callback);
  }

  public getPlayers(query: any, callback: any) {
    return PlayerSchema.find(query, callback).collation({
      locale: "en",
      strength: 2,
    });
  }
}
