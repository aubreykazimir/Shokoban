/**
 * Créer un objet coordinate qui a deux propriétés x et y.
 *  @typedef {Object} Coordinates contient les coordonées x et y d'un objet du jeu
 *  @property {number} x
 *  @property {number} y
 */

/**
 * Sauvegarde de l'état du jeu.
 * @type {Object}
 * @property {Coordinates} playerPosition les coordonées du player
 * @property {Coordinates} boxPosition les coordonées de la boîte déplacer, si {x: -1; y: -1} pas de boîte déplacer
 */
class State {
    /**
     * @private
     * @type {number}
     */
    player_x;

    /**
     * @private
     * @type {number}
     */
    player_y;

    /**
     * @private
     * @type {number}
     */
    box_x;

    /**
     * @private
     * @type {number}
     */
    box_y;

    /**
     * Créer la variable playerPosition pour récupérer les coordonnées du joueur.
     * @returns {Coordinates} les coordonées du player
     */
    get playerPosition() {
        return { x: this.player_x, y: this.player_y };
    }

    /**
     * Créer la variable boxPosition  pour récupérer les coordonnées de la boite.
     * Attention si la boite n'a pas été instanciée, ses coordonnées seront [-1;-1].
     * @returns {Coordinates} les coordonées de la boîte déplacer, , si {x: -1; y: -1} pas de boîte déplacer
     */
    get boxPosition() {
        return { x: this.box_x, y: this.box_y };
    }

    /**
     * Construit un State
     * @param {Coordinates} player 
     * @param {Coordinates} box 
     */
    constructor(player, box = { x: -1, y: -1 }) {
        this.player_x = player.x;
        this.player_y = player.y;
        this.box_x = box.x;
        this.box_y = box.y;
    }
}


/**
 * Structure de données *globale* pour la sauvegarde des mouvements.
 * @type {State[][]}
 */
var states = [];