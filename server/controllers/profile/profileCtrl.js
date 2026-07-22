const User = require("../../models/User");
const {
  error500,
  errorResponse,
  successResponse,
} = require("../../utils/response");

const getMyProfile = async (req, res) => {
  try {
    const myData = await User.findById(req.user._id).lean();
    if (!myData) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, "User profile data fetched", myData);
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};

module.exports = { getMyProfile };
