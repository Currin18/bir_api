module.exports = () => (
  // RFC4122 version 4 compliant solution
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /*eslint-disable*/
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : (r & 0x3 | 0x8);
    /* eslint-enable */
    return v.toString(16);
  })
);
