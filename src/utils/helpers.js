/**
 * Verifica se um objeto é uma classe.
 *
 * @param {*} obj
 * @returns
 */
function isClass(obj) {
  return (
    typeof obj === 'function'
    && obj.hasOwnProperty('prototype')
    && !obj.hasOwnProperty('arguments')
  );
}

module.exports = {
  isClass,
};