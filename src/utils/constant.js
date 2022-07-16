class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'AppError';
  }
}

Error.create = function ({ code, message }) {
  const err = new AppError(code, message);
  return err;
};
// Error.errorInvalidParam = (message) => Error.create({ code: 9, message: `Tham số ${message} không hợp lệ` });

Error.prototype.errorInvalidParam = function errorInvalidParam(msg) {
  return Error.create({ code: 9, message: `Tham số ${msg} không hợp lệ` });
};
Error.prototype.withMessage = function withMessage(msg) {
  return Error.create({ code: this.code, message: msg });
};

module.exports = {
  AppError,
  // error code
  statusCode: {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 403,
    MULTIPLE_CHOICES: 300,
    FORBIDDEN: 403,
  },

  apiCode: {
    SUCCESS: Error.create({ code: 1, message: 'Thành công' }),
    DB_ERROR: Error.create({ code: 2, message: 'Truy vấn lỗi' }),
    ACCOUNT_EXIST: Error.create({ code: 5, message: 'Tài khoản đã tồn tại' }),
    LOGIN_FAIL: Error.create({ code: 6, message: 'Sai tài khoản hoặc mật khẩu' }),
    INVALID_PARAM: Error.create({ code: 9, message: 'Tham số không hợp lệ' }),
    NOT_FOUND: Error.create({ code: 10, message: 'Dữ liệu không tồn tại' }),
    UNAUTHORIZED: Error.create({ code: 403, message: 'Không có quyền truy cập' }),
    INVALID_ACCESS_TOKEN: Error.create({ code: 404, message: 'Token không hợp lệ' }),
    NO_PERMISSION: Error.create({ code: 11, message: 'Không có quyền thực hiện chức năng' }),
    EMAIL_EXIST: Error.create({ code: 5, message: 'Email đã tồn tại' }),
    PHONE_EXIST: Error.create({ code: 5, message: 'SĐT đã tồn tại' }),
    DATA_EXIST: Error.create({ code: 4, message: 'Dữ liệu đã tồn tại' }),
    UPDATE_FAIL: Error.create({ code: 12, message: 'Cập nhật lỗi' }),
    EXPIRED_DATE: Error.create({
      code: 3,
      message: 'Bạn đã hết thời gian dùng ứng dụng, vui lòng liên hệ với chúng tôi để gia hạn',
    }),
    DELETE_FAIL: Error.create({ code: 13, message: 'Xoá lỗi' }),
    FAIL_CHANGE_PASS: Error.create({ code: 14, message: 'Mật khẩu không đúng' }),
    CONFIG_ROW_FAIL: Error.create({ code: 15, message: 'Số dòng chỉ cho phép tối đa là 5' }),
  },

  restfullApiCode: {
    GET_SUCCESS: { code: 1, status: 1, message: 'Thành công' },
    CREATED_SUCCESS: { code: 1, status: 1, message: 'Thành công' },
    DELETED_SUCCESS: { code: 1, status: 1, message: 'Xoá thành công' },
  },

  config: {
    PAGING_LIMIT: 6,
    FREE_DAY: 7,
  },
  PLATFORM: {
    WEB: 1,
    APP: 2,
  },
  ROLE: {
    ADMIN: 1,
    STAFF: 2,
    CUSTOMER: 3,
  },

  ACTIVE: {
    ACTIVE: 1,
    INACTIVE: 0,
    DEACTIVE: 2,
  },

  TYPE_OF_VALIDATE: {
    PRODUCT: 1,
    PACKAGE: 2,
    USER: 3,
  },
  MAX_ROW: 5,
  STATUS_TRANSACTION: {
    PENDING: 1,
    ACCEPTED: 2,
    REJECT: 3,
  },
  STATUS_COMPLAIN: {
    PENDING: 1,
    ACCEPTED: 2,
    REJECT: 3,
  },

  PAYMENT_STATUS: {
    DEPOSITED: 1,
    PAID: 2,
  },
  DF_ORDER_TRANSACTION_TYPE: {
    PAY_DOWN: 1,
    TRANSFER: 2,
  },
};
