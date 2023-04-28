class InternalError extends Error {
  constructor(message, reason) {
    super(message);
    this.name = 'InternalError';
    this.reason = reason;
  }
}

module.exports = {
  InternalError
};
