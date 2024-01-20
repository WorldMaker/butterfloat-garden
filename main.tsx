import { jsx, run } from 'butterfloat'
import { Observable, concat, interval, of, map } from 'rxjs'

interface HelloProps {
  to: Observable<string>
}

function Hello({ to }: HelloProps) {
  const innerText = to.pipe(map((to) => `Hello ${to}`))
  return <p className="hello" bind={{ innerText }} />
}

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
