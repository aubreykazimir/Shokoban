"use strict";

var compteur = 0;
var level = 0;

/**
 * This function prints the map on the web page.
 * @param {number} level number of the level.
 */
function buildLevel(level) {
    var world = document.getElementById("world");
    // @ts-ignore
    world.innerText = "";
    $.each(levels[level].map, function(index, value) {
        let row = document.createElement("div");
        row.className = "row";
        for (let char of value) {
            let square = document.createElement("div");
            square.className = "square";
            switch (char) {
                default: square.classList.add("wall");
                break;
                case 'x':
                        square.classList.add("target");
                    break;
                case '🧍':
                        square.classList.add("player");
                    break;
                case '#':
                        square.classList.add("box");
                    break;
                case '@':
                        square.classList.add("target");
                    square.classList.add("box");
                    break;
                case ' ':
                        break;
            }
            row.appendChild(square);
        }
        world ? .appendChild(row);
    })

}

/**
 * Get position of player in the world map
 * @returns The position of player
 */
function getPlayerPosition() {
    let pos = { x: -1, y: -1 };
    let end = false;
    $("#world").children().each(function(index, value) {
        $(value).children().each(function(j, v) {
            if ($(v).hasClass("player")) {
                pos.x = index;
                pos.y = j;
                end = true;
            }
            if (end) {
                return;
            }
        });
        if (end) {
            return;
        }
    });
    return pos;
}

/**
 * Permet aux joueurs de se déplacer sur la map.
 * @param {string} direction 
 */
function move(direction) {
    let pos = getPlayerPosition();
    var className = "player";
    let playerState = { x: pos.x, y: pos.y };


    /**
     * Détermine la nouvelle position.
     * @param {Coordinates} myPos la position à transformer
     * @returns {Coordinates} la position futur
     */
    function setnewPos(myPos = { x: -1, y: -1 }) {
        let newPos = { x: myPos.x, y: myPos.y }
        switch (direction) {
            case "haut":
                newPos.y = myPos.y - 1;
                className = "player-top";
                break;
            case "bas":
                newPos.y = myPos.y + 1;
                className = "player-front";
                break;
            case "droite":
                newPos.x = myPos.x + 1;
                className = "player-right";
                break;
            case "gauche":
                newPos.x = myPos.x - 1;
                className = "player-left";
                break;

        }
        return newPos;

        function pullNewPos(myPos = { x: -1, y: -1 }) {
            let newPosPull = { x: myPos.x, y: myPos.y }
            switch (direction) {
                case "tirer":
                    newPosPull.y = myPos.y - 1;
                    className = "player-pull";
                    break;

                    return newPosPull;
            }

            let newPos = setnewPos(pos);
            if ($($($("#world").children()[newPos.x]).children()[newPos.y]).hasClass("wall")) {
                console.error("It's a wall");
                return;
            }
            if ($($($("#world").children()[newPos.x]).children()[newPos.y]).hasClass("box")) {
                var boxPos = { x: newPos.x, y: newPos.y };
                var afterBoxPos = setnewPos(boxPos);
                if ($($($("#world").children()[afterBoxPos.x]).children()[afterBoxPos.y]).hasClass("wall")) {
                    console.error("It's a wall after the box");
                    return;
                } else if ($($($("#world").children()[afterBoxPos.x]).children()[afterBoxPos.y]).hasClass("box")) {
                    console.error("It's too heavy, there are two boxes!");
                    return;
                } else {
                    $($($("#world").children()[boxPos.x]).children()[boxPos.y]).removeClass("box");
                    $($($("#world").children()[afterBoxPos.x]).children()[afterBoxPos.y]).addClass("box");
                }
            }

            $($($("#world").children()[pos.x]).children()[pos.y]).removeClass("player").removeClass("player-left").removeClass("player-front").removeClass("player-top").removeClass("player-right").removeClass("player-pull");
            $($($("#world").children()[newPos.x]).children()[newPos.y]).addClass("player");
            $($($("#world").children()[newPos.x]).children()[newPos.y]).addClass(className);
            // @ts-ignore
            if (boxPos !== undefined) {
                // @ts-ignore
                states.push([new State(playerState, boxPos), new State(newPos, afterBoxPos)]);
            } else {
                states.push([new State(playerState), new State(newPos)]);
            }
            incrMoves();
            if (allOnTaret()) {
                if (level === levels.length - 1) {
                    $("#level").text("jeu");
                    $("#game").text("rejouer");
                }
                $($($("#world").children()[newPos.x]).children()[newPos.y]).removeClass();
                $(".box.target").addClass("box_won");
                $($($("#world").children()[newPos.x]).children()[newPos.y]).addClass("square");
                $($($("#world").children()[newPos.x]).children()[newPos.y]).addClass("player-won");
                $("#finish_level").show();
                states = [];
            }
        }

        /**
         * Initialise un level
         * @param {number} level 
         */
        function initLevel(level) {
            compteur = 0;
            $("#compteur").text(compteur);
            $("#pluriel").text("");
            buildLevel(level);
            $("#finish_level").hide();
        }

        function incrMoves() {
            compteur = compteur + 1;
            $("#compteur").text(compteur);
            if (compteur > 1) {
                $("#pluriel").text("s");
            }
        }

        function decrMoves() {
            compteur = compteur - 1;
            $("#compteur").text(compteur);
            if (compteur <= 1) {
                $("#pluriel").text("");
            }
        }

        function allOnTaret() {
            return !($(".box").not(".target").length > 0);
        }

        function finishLevel() {
            if (level === levels.length - 1) {
                level = 0;
            } else {
                level = level + 1;
            }
            initLevel(level);
        }

        function annulationMoves() {
            if (states.length !== 0) {
                console.log(states[states.length - 1][0].boxPosition.x);
                if (states[states.length - 1][0].boxPosition.x !== -1) {
                    $($($("#world").children()[states[states.length - 1][1].boxPosition.x]).children()[states[states.length - 1][1].boxPosition.y]).removeClass("box");
                    $($($("#world").children()[states[states.length - 1][0].boxPosition.x]).children()[states[states.length - 1][0].boxPosition.y]).addClass("box");
                }
                $($($("#world").children()[states[states.length - 1][1].playerPosition.x]).children()[states[states.length - 1][1].playerPosition.y]).removeClass("player").removeClass("player-left").removeClass("player-front").removeClass("player-top").removeClass("player-right");
                $($($("#world").children()[states[states.length - 1][0].playerPosition.x]).children()[states[states.length - 1][0].playerPosition.y]).addClass("player");
                decrMoves();
                states.pop();
            }
        }

        /**
         * This event launch when window is load
         */

        $(window).on("load", function() {
            initLevel(level);
        });

        $(document).keydown(function(e) {
            if (!allOnTaret()) {
                let keys = {
                    38: "haut",
                    40: "bas",
                    37: "gauche",
                    39: "droite"
                    17: "tirer"

                }
                if (e.keyCode in keys) {
                    // @ts-ignore
                    move(keys[e.keyCode]);
                } else {
                    console.error("It is not a directional key.");
                }
            } else {
                if (e.keyCode === 32) {
                    finishLevel();
                } else {
                    console.error("Not You did not press the space bar.");
                }



            }
        });