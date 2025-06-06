/**
 * Renvoie un objet offrant un message d'erreur formaté pour les erreurs de validation
 */

exports.validationError = (field, message) => {
    return {
        statusCode: 400,
        message: `Le champ '${field} est invalide: ${message}`
    }
}