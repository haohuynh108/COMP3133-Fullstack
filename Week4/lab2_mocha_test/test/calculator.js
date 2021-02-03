const chai = require('chai')

const expect = chai.expect

const calculate = require('../app/calculator')

describe ('Calculate', () => {
    describe('Add', () => {
        it(' 5 + 2 = 7 PASS' , () => {
            expect (calculate.add(5,2)).to.equal(7)
        })
        it('5 + 2 =8 FAIL'), () => {
            expect (calculate.add(5,2)).to.equal(8)
        }
    })
    
    describe('Sub', () => {
        it('5 - 2 = 3 PASS', () => {
            expect(calculate.sub(5, 2)).to.equal(3)
        })
        it('5 - 2 = 5 FAIL', () => {
            expect(calculate.sub(5, 2)).to.equal(5)
        })
    })

    describe('Mul', () => {
        it('5 * 2 = 10 PASS', () => {
            expect(calculate.mul(5, 2)).to.equal(10)
        })
        it('5 * 2 = 12 FAIL', () => {
            expect(calculate.mul(5, 2)).to.equal(12)
        })  
    })

    describe('Div', () => {
        it('10 / 2 = 5 PASS', () => {
            expect(calculate.div(10, 2)).to.equal(5)
        })
        it('10 / 2 = 2 FAIL', () => {
            expect(calculate.div(10, 2)).to.equal(2)
        
        })
        it('10 / 0 => Error', () => {
            expect(calculate.div(10, 0)).to.equal(undefined)
        })
    })
})