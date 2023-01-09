import Ship from '../components/Ship'

describe('Ship', () => {
    let ship: Ship;

    beforeEach(() => {
        ship = new Ship(3)
    })

    test("creates and initializes a ship", () => {
        expect(ship).toEqual({length: 3, hits: []})
    })

    test("ship takes a hit", () => {
        ship.hit(2)
        expect(ship.hits).toContain(2)
    })

    test("prevents multiple hits at the same spot", () => {
        ship.hit(2)
        ship.hit(2)
        ship.hit(2)
        expect(ship.hits.length).toEqual(1)
    })

    test('ship sinks', () => {
        ship.hit(0)
        ship.hit(1)
        ship.hit(2)
        expect(ship.isSunk()).toBe(true)
    } )

    test('ship does not sink', () => {
        ship.hit(1)
        ship.hit(2)
        expect(ship.isSunk()).toBe(false)
    })
})