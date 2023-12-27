const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { prismaInstance } = require('../db/index');
const PrimsaTypes = require('@prisma/client');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<PrimsaTypes.users>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email_address)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  let createUser = await prismaInstance.users.create({
    data: userBody,
  });
  return createUser;
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<PrimsaTypes.users>}
 */
const getUserById = async (id) => {
  return prismaInstance.users.findUnique({
    where: {
      user_id: id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<PrimsaTypes.users>}
 */
const getUserByEmail = async (email) => {
  return prismaInstance.users.findUnique({
    where: {
      email_address: email,
    },
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<PrimsaTypes.users>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email_address && (await isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await prismaInstance.users.delete({
    where: {
      user_id: userId,
    },
  });
};

const isEmailTaken = async (email_address, excludeUserId) => {
  let checkEmail = await prismaInstance.users.findFirst({
    where: {
      email_address: email_address,
      NOT: {
        user_id: excludeUserId,
      },
    },
  });
  return Promise.resolve(!!checkEmail);
};

module.exports = {
  createUser,
  // queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
