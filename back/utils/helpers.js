/**
 * Renvoie un objet offrant un message d'erreur formaté pour les erreurs de validation
 */

/**
 * 
 * @param {string} field 
 * @param {string} message 
 * @returns {{statusCode: number, message: string}}
 */

export function validationError(field, message) {
    return {
        statusCode: 400,
        message: `Le champ '${field} est invalide: ${message}`
    }
}

export default validationError

