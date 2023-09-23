import userService from "../service/user-service.js";


const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.get(username);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async () => {
    // Tambahkan validasi otorisasi di sini jika diperlukan
  
    try {
      const users = await prismaClient.user.findMany({
        select: {
          username: true,
          name: true
        }
      });
  
      return users;
    } catch (error) {
      // Handle kesalahan jika terjadi
      console.error("Error fetching all users:", error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const request = req.body;
        request.username = username;

        const result = await userService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const forcedelete = async (req, res, next) => {
    try {
        //const user = req.user;
        const username = req.params.username;
        //const contactId = req.params.contactId;

        await userService.forcedelete(username);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}
const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        //const user = req.user;
        //const contactId = req.params.contactId;
        const result = await userService.list();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login,
    get,
    update,
    logout,
    getAll,
    list,
    forcedelete
}
