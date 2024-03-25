import login from "../module/login.js";

class loginController {
  static async verficontrol(req, res) {
    console.log(req.body);
    const { email, password, poste } = req.body;

    if (!email || !password || !poste) {
      return res
        .status(400)
        .json({ error: "erreur email ou password ou poste" });
    }

    var [data] = await login.verfie(email, password, poste);
    if (data) {
      res.status(200).json({
        message: "good",
        data,
      });
      console.log(data);
      return;
    } else {
      res.status(401).json({ error: "email ou password ou poste incorect" });
      return;
    }
  }
}
export default loginController;
