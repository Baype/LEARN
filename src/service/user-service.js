import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import axios from "axios";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};


// const login = async (request) => {
//   const loginRequest = validate(loginUserValidation, request);

//   const user = await prismaClient.user.findUnique({
//     where: {
//       username: loginRequest.username,
//     },
//     select: {
//       username: true,
//       password: true,
//     },
//   });

//   if (!user) {
//     throw new ResponseError(401, "Username or password wrong");
//   }

//   const isPasswordValid = await bcrypt.compare(
//     loginRequest.password,
//     user.password
//   );
//   if (!isPasswordValid) {
//     throw new ResponseError(401, "Username or password wrong");
//   }

//   const token = uuid().toString();
//   localStorage.setItem(token);

//   // Kirim token ke URL yang dituju (pastikan URL yang benar)
//   try {
//     // Cek respons dari server, Anda dapat menambahkan log atau logika lainnya di sini
//     console.log('Token sent to server:', response.token);

//     // Selanjutnya, Anda dapat mengembalikan token atau respons lain sesuai kebutuhan Anda
//     return response.data;
//   } catch (error) {
//     console.error('Failed to send token to server:', error);

//     // Handle kesalahan saat permintaan ke server gagal
//     throw new ResponseError(500, 'Failed to send token to server');
//   }
// };



const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }
  const token = uuid().toString();
 
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
    
  });
  
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const list = async () => {
      const users = await prismaClient.user.findMany({
          select: {
              username: true,
              name: true,
          }
      });
      return users;
}


const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

const forcedelete = async (username,contactId) => {
  try {
    
    var contacts = await prismaClient.contact.findMany({
        where: { username: username },
      });
    // Hapus semua alamat terlebih dahulu
    
    for (const contact of contacts) {
        await prismaClient.address.deleteMany({
            where: { contact_id: parseInt(contact.id, 10) },
          });
      }

    // Hapus kontak setelah semua alamat dihapus
    await prismaClient.contact.deleteMany({
      where: { username: username },
    });
    // Hapus kontak setelah semua alamat dihapus
    await prismaClient.user.delete({
      where: { username: username },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
  list,
  forcedelete,
};
