enum Environments {
  DEV = "dev",
  PROD = "prod",
}

class Environment {
  private environment: String;

  constructor(environment: String) {
    this.environment = environment;
  }

  getPort(): Number {
    if (this.environment === Environments.PROD) {
      return 6201;
    } else {
      return 3000;
    }
  }

  getDBName(): String {
    return "fifa";
  }
}

export default new Environment(Environments.DEV);
