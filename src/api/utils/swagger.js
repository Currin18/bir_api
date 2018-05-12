/**
 * Utils class for swagger information
 */
class swaggerUtils {
  /**
   * Parses request payload and checks parameters defined in swagger spec
   * It does not check the schema (swagger does that), just prevent the endpoints to
   * consume fields that aren't in the schema for security reasons(swagger doesn't do that).
   * @param {Request} req
   * @param {string} payloadName
   * @param {Object} payload
   */
  static parseEndpointPayload(req, payloadName) {
    const payload = req.swagger.params[payloadName].value;
    let payloadSchema;
    try {
      // get swagger schema
      payloadSchema = req.swagger.params[payloadName].schema.schema.properties;
    } catch (error) {
      // if can't get the swagger schema
      return payload;
    }
    const fieldList = Object.keys(payloadSchema);
    const rightPayload = {};
    fieldList.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(payload, field)) {
        rightPayload[field] = payload[field];
      }
    });
    return rightPayload;
  }
}

module.exports = swaggerUtils;
