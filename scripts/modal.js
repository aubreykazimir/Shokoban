"use strict";

/**
 * Ferme la modal d'aide.
 */
function closeModal() {
    $("#modal").hide();
}

/**
 * Assure que la modal est fermée à l'ouverture de la page.
 */
$(window).on("load", function () {
    $("#modal").hide();
});

/**
 * Ouvre la modal et permet de la refermer avec la touche "echap".
 */
function openModal() {
    $("#modal").show();

    /**
     * Permet de fermer la modal grâce à la touche "echap".
     */
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            closeModal();
        }
    })
}

/**
 * Génère le contenu de la modal d'aide générale.
 */

function general_help() {

    $("#modal").children(".modalContent").children(".modalHeader").children("h2").text("Aide");
    $("#modal").children(".modalContent").find(".modalBody").append("<table id='help'></table>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").append("<thead><tr><th></th><th>Explication</th></tr></thead>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").append("<tbody></tbody>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/player-front.png' /></td><td>Le personnage vous représentant.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/wall.png' /></td><td>Les murs ne sont pas traversables ni par votre personnage, ni par une boîte.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/box.png' /></td><td>Les boîtes quand elles ne sont pas sur une cible, elles sont jaune.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/box-on-target.png' /></td><td>Les boîtes, quand elles ne sont sur une cible sont rouge.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/target.png' /></td><td>Les cibles sont représentées par ce point jaune.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/help-level.png' /></td><td>Pour finir un level, il faut pousser chaque boîte sur une cible.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/help-push.png' /></td><td>Pour pousser une boîte, il suffit de se diriger sur elle.</td></tr>");
    $("#modal").children(".modalContent").find(".modalBody").find("#help").find("tbody").append("<tr><td><img src='./images/help-double.png' /></td><td>Les boîtes ne peuvent être poussées par deux.</td></tr>");
    openModal();
}