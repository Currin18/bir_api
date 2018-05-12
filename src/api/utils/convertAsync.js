/**
 * Converts async function to regular function
 * @param {asyncFunction} asyncFunction
 */
function convertAsync(asyncFunction) {
  return (req, res) => { asyncFunction(req, res).then(); };
}

module.exports = convertAsync;
