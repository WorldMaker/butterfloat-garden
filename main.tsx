import {
  ComponentContext,
  ObservableEvent,
  jsx,
  run,
} from 'butterfloat'
import {
  Observable,
  combineLatest,
  concat,
  interval,
  of,
  map,
  scan,
} from 'rxjs'

interface HelloProps {
  to: Observable<string>
}

interface HelloEvents {
  toggleGreeting: ObservableEvent<MouseEvent>
}

export function Hello(
  { to }: HelloProps,
  { events }: ComponentContext<HelloEvents>,
) {
  const { toggleGreeting } = events

  // starting with "Hello", alternate "Hello" and "Good Night"
  const greeting = concat(
    of('Hello'),
    toggleGreeting.pipe(
      scan((greet) => (greet === 'Hello' ? 'Good Night' : 'Hello'), 'Hello'),
    ),
  )

  const innerText = combineLatest([greeting, to]).pipe(
    map(([greeting, to]) => `${greeting} ${to}`),
  )
  return (
    <div>
      <p className="hello" bind={{ innerText }} />
      <button type="button" events={{ click: toggleGreeting }}>
        Change Mood
      </button>
    </div>
  )
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
