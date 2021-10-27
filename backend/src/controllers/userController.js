export const userController = {
  async apiCreateUser(req, res) {
    const user = await userService.createUser(req.body);
    res.status(user.status).json(user);
  },
}
