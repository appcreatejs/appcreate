const path = require('path');

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

/**
 * Normaliza o caminho de um diretório.
 *
 * @param {string} [pathString='']
 * @returns
 */
function normalizePath(pathString = '') {
  
  return (
    pathString.replace(/\/|\\/g, path.sep)
  );
}

/**
 * Normaliza o caminho de um diretório.
 *
 * @param {string} path
 * @returns
 */
function isWritable(path) {

  try {

    fs.accessSync(path, fs.constants.W_OK);
    return true;
  } catch {
    return false
  }
}

module.exports = {
  isClass,
  normalizePath,
  isWritable,
};
