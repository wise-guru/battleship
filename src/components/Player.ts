import Gameboard from "./Gameboard";

class Player {
    name: string
    alreadyHitPosition: number[][]

    constructor(name: string) {
        this.name = name
        this.alreadyHitPosition = []
    }

    alreadyTakenHit(positionX: number, positionY: number)  {
        for(let i = 0; i < this.alreadyHitPosition.length; i++) {
            if(this.alreadyHitPosition[i][0] === positionX && this.alreadyHitPosition[i][1]) {
                return true
            }
        }
        return false
    }

    attack(positionX: number, positionY: number, gameboard: Gameboard) {
        if(this.alreadyTakenHit(positionX, positionY)) {
            return
        }
        this.alreadyHitPosition.push([positionX, positionY])
        gameboard.receiveAttack(positionX, positionY)
    }

    randomAttack(gameboard: Gameboard) {
        if(this.alreadyHitPosition.length === 100) {
            return
        }

        let positionX = Math.floor(Math.random() * 10)
        let positionY = Math.floor(Math.random() * 10)

        while (this.alreadyTakenHit(positionX, positionY)) {
            positionX = Math.floor(Math.random() * 10)
            positionY = Math.floor(Math.random() * 10)
          }
      
          this.alreadyHitPosition.push([positionX, positionY])
          gameboard.receiveAttack(positionX, positionY)
        }


    }
