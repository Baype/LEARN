import { validate } from "../validation/validation.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getAddressValidation } from "../validation/address-validation.js";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "contact is not found");
  }

  return contact;
};

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const totalInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

// const forcedelete = async (contactId) => {
//   try {
//     // Temukan kontak berdasarkan ID
//     const contact = await prismaClient.contact.findFirst({
//       where: {
//         id: parseInt(contactId, 10),
//       },
//     });

//     if (!contact) {
//       throw new Error("Kontak tidak ditemukan");
//     }

//     // Temukan semua alamat yang terkait dengan kontak
//     const addresses = await prismaClient.address.findMany({
//       where: { contact_id: parseInt(contactId, 10) },
//     });

//     // Hapus semua alamat terlebih dahulu
//     addresses.forEach((address) => {
//       prismaClient.address.delete({
//         where: { id: address.id },
//       });
//     });

//     // Setelah semua alamat dihapus, baru hapus kontak
//     prismaClient.contact.delete({
//       where: { id: parseInt(contactId, 10) },
//     });
//   } catch (error) {
//     throw error;
//   }
// };

const forcedelete = async (contactId) => {
    try {
      // Hapus semua alamat terlebih dahulu
      await prismaClient.address.deleteMany({
        where: { contact_id: parseInt(contactId, 10) },
      });
  
      // Hapus kontak setelah semua alamat dihapus
      await prismaClient.contact.delete({
        where: { id: parseInt(contactId, 10) },
      });
    } catch (error) {
      throw error;
    }
  };
  
  

const search = async (user, request) => {
  request = validate(searchContactValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
  forcedelete,
};
