import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";

describe("Gameboard", () => {
    let gameboard: Gameboard
    let ship: Ship
    let testObjectArray : object[][]
    let testBooleanArray: boolean[][]
    let size: number

    beforeEach(() => {
        gameboard = new Gameboard()
        ship = new Ship(3)
        testObjectArray = []
        testBooleanArray = []
        size = 10
        
        for(let i = 0; i < size; i++) {
            testObjectArray[i] = []
            testBooleanArray[i] = []

            for(let j = 0; j < size; j++) {
                testObjectArray[i][j] = null
                testBooleanArray[i][j] = false
            }
        }
    })

    test("creates and initilizes the gameboard", () => {
        expect(gameboard).toEqual({
            board: testObjectArray,
            missedShots: testBooleanArray
        })
    })

    test("places a ship", () => {
        gameboard.placeShip(ship, 1, 1, true)
        testObjectArray[1][1] = ship
        testObjectArray[2][1] = ship
        testObjectArray[3][1] = ship
        
        expect(gameboard).toEqual({
            board: testObjectArray,
            missedShots: testBooleanArray
        })
    })

    test("randomly places 5 ships", () => {
        gameboard.placeShipsRandomly()
        expect(gameboard.getEmptyFieldsAmount()).toEqual(83)
    })

    test("prevents placing ship outside gamebaord", () => {
        gameboard.placeShip(ship, 2, 2, true)

        expect(gameboard.isPlacementPossible(ship, 10, 10, true)).toBe(false)
        expect(gameboard.isPlacementPossible(ship, 12, 12, true)).toBe(false)
    })

    test("prevents ship placement on taken cells", () => {
        gameboard.placeShip(ship, 1, 1, true)

        expect(gameboard.isPlacementPossible(ship, 1, 1, true)).toBe(false)
        expect(gameboard.isPlacementPossible(ship, 2, 1, true)).toBe(false)
        expect(gameboard.isPlacementPossible(ship, 3, 1, true)).toBe(false)
    })

    test('prevents ship placement direct adjacency  of taken cells', () => {
        gameboard.placeShip(ship, 1, 1, true)
        expect(gameboard.isPlacementPossible(ship, 0, 0, true)).toBe(false)
        expect(gameboard.isPlacementPossible(ship, 4, 2, true)).toBe(false)
        expect(gameboard.isPlacementPossible(ship, 5, 2, true)).toBe(true)
      })

    test('receives attacks', () => {
        gameboard.placeShip(ship, 1, 1, true)
        gameboard.receiveAttack(3, 1)
        expect(gameboard.board[3][1].hits.includes(2)).toBe(true)
      })
    
      test('keeps track of missed shots', () => {
        gameboard.placeShip(ship, 1, 1, true)
        gameboard.receiveAttack(1, 4)
        expect(gameboard.missedShots[1][4]).toBe(true)
      })
    
      test('tells if game has ended', () => {
        expect(gameboard.isGameOver()).toBe(false)
    
        gameboard.placeShip(ship, 1, 1, true)
        expect(gameboard.isGameOver()).toBe(false)
        gameboard.receiveAttack(1, 1)
        gameboard.receiveAttack(2, 1)
        gameboard.receiveAttack(3, 1)
    
        gameboard.placeShip(new Ship(3), 5, 5, false)
        gameboard.receiveAttack(5, 5)
        gameboard.receiveAttack(5, 6)
        gameboard.receiveAttack(5, 7)
        expect(gameboard.isGameOver()).toBe(true)
      })

})