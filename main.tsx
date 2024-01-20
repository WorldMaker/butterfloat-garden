import {
  jsx,
  run,
} from 'butterfloat'
import {
  concat,
  interval,
  of,
  map,
} from 'rxjs'
import { Hello } from './hello.js'

function Main() {
  const greetable = ['World', 'Butterfloat', 'User']

  // starting with "World" show a random greeting every 15 seconds
  const helloTo = concat(
    of('World'),
    interval(15_000 /* ms */).pipe(
      map(() => greetable[Math.round(Math.random() * greetable.length)]),
    ),
  )

  return <Hello to={helloTo} />
}

const container = document.getElementById('container')!
run(container, Main)
