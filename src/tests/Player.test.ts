import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";
import Player from "../components/Player";

describe("Player", () => {
    let gameboard: Gameboard;
    let ship: Ship;
    let player: Player;

    beforeEach(() => {
        player = new Player("bob")
        gameboard = new Gameboard()
        ship = new Ship(3)
    })

    test("Creates and initalizes Player", () => {
        expect(player).toEqual({name: "bob", alreadyHitPosition: []})
    })

    test("Player attacks", () => {
        gameboard.placeShip(ship, 1, 1, true)
        player.attack(1, 1, gameboard)
        player.attack(2, 1, gameboard)
        player.attack(3, 1, gameboard)
        expect(gameboard.isGameOver()).toBe(true)
    })

    test('randomly attacks', () => {
        gameboard.placeShip(ship, 1, 1, true)
        for (let i = 0; i < 100; i++) {
          player.randomAttack(gameboard)
        }
        expect(gameboard.isGameOver()).toBe(true)
      })
})