import { deepEqual, equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  makeTestEvent,
  makeTestComponentContext,
} from 'butterfloat'
import { JSDOM } from 'jsdom'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { Hello } from './hello.js'

describe('hello component', () => {
  it('toggles greetings', () => {
    const { window } = new JSDOM()
    const { MouseEvent } = window

    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )
    testScheduler.run(({ cold, expectObservable }) => {
      const eventValues = {
        a: new MouseEvent('click'),
        b: new MouseEvent('click'),
      }
      const events = cold('--a--b', eventValues)
      const expected = '   x-y--x'
      const expectedValues = {
        x: 'Hello World',
        y: 'Good Night World',
      }
      const toggleGreeting = makeTestEvent(events)
      const { context } = makeTestComponentContext({ toggleGreeting })

      const div = Hello({ to: of('World') }, context)
      equal(div.type, 'element')
      const p = div.children[0]
      ok(typeof p === 'object')
      equal(p.type, 'element')
      expectObservable(p.bind.innerText).toBe(expected, expectedValues)
    })
  })
})
