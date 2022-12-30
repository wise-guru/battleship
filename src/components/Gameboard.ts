import Ship from "./Ship"

const size = 10

class Gameboard {
    board: Ship[][]
    missedShots: boolean[][]

    constructor() {
        this.board = []
        this.missedShots = []
        this.initialize()
    }

    initialize() {
        for(let i = 0; i < size; i++) {
            this.board[i] = []
            this.missedShots[i] = []
            for(let j = 0; j < size; j++) {
                this.board[i][j] = null
                this.missedShots[i][j] = false
            }
        }
    }

    isEmpty() {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (this.board[i][j] !== null) return false
          }
        }
        return true
      }

      getEmptyFieldsAmount() {
        let result = 0
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (this.board[i][j] === null) result++
          }
        }
        return result
      }

    isPlacementPossible(ship: Ship, row: number, column: number, isVertical: boolean) {
        // case position is out of gameboard
        if(row < 0 || row > size - 1 || column < 0 || column > size - 1) {
            return false
        }

        // case ship doesn't fit in gameboard
        if(isVertical) {
            if(row + ship.length > size) {
                return false
            }
        } else {
            if(column + ship.length > size) {
                return false
            }
        }
        // case any of the fields is already taken
        if(isVertical) {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[row + 1][column]) {
                    return false
                }
            }
        }   else {
            for(let i = 0; i < ship.length; i++) {
                if(this.board[row][column + i]) {
                    return false
                }
            }
        }

        // case any of the adjacent fields are already taken
        if(isVertical) {
            for(let i = 0; i < ship.length; i++) {
                for(let x = -1; x <= 1; x++) {
                    for(let y = -1; y <= 1; y++) {
                        if(row + x + i < 0 || row + x + i >= size || column + y < 0 || column + y >= size) {
                            continue
                        }
                        if(this.board[row + x + i][column + y]) {
                            return false
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                for (let x = -1; x <= 1; x++) {
                  for (let y = -1; y <= 1; y++) {
                    if (
                      row + x < 0 ||
                      row + x >= size ||
                      column + y + i < 0 ||
                      column + y + i >= size
                    )
                      continue
                    if (this.board[row + x][column + y + i]) return false
                  }
                }
              }
              return true
        }
    }

    placeShip(ship: Ship, row: number, column: number, isVertical: boolean) {
        if(!this.isPlacementPossible(ship, row, column, isVertical)) {
            return false
        }

        if(isVertical) {
            for(let i = 0; i < ship.length; i++ ) {
                this.board[row + i][column] = ship
            } 
            } else {
                for(let i = 0; i < ship.length; i++) {
                    this.board[row][column + i] = ship
            }
        }
        return true
    }

    placeShipsRandomly() {
        if(!this.isEmpty()) {
            return
        }

        const ships = []
        const patrolBoat = new Ship(2)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const battleship = new Ship(4)
        const carrier = new Ship(5)
       

        ships.push(patrolBoat, destroyer, submarine, battleship, carrier)

        let successfulPlacements = 0

        while(successfulPlacements < 5) {
            const row = Math.floor(Math.random() * 10)
            const column = Math.floor(Math.random() * 10)
            const isVertical = Math.floor(Math.random() * 2) === 1 ? true: false

            if(this.placeShip(ships[successfulPlacements], row, column, isVertical)) {
                successfulPlacements++
            }
        }
    }


    receiveAttack(row: number, column: number) {
        let hitIndex = 0
        //if vertical
        if(column > 0 && this.board[row][column - 1]) {
            let i = 1
            while(column - i >= 0 && this.board[row][column - i]) {
                hitIndex++
                i++
            }
        } 
        //is horizontal
        else if(row > 0 && this.board[row - 1][column]) {
            let i = 1
            while(row - i >= 0 && this.board[row - i][column]) {
                hitIndex++
                i++
            }
            this.board[row][column].hit(hitIndex)
            return true;
            //??????????
        } else {
            this.missedShots[row][column] = true
            return false
        }
    }

    isGameOver() {
        let isBoardEmpty = true
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (this.board[i][j]) {
              isBoardEmpty = false
              if (!this.board[i][j].isSunk()) {
                return false
              }
            }
          }
        }
        return isBoardEmpty ? false : true
      }
}

export default Gameboard