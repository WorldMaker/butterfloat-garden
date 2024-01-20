import { ComponentContext, ObservableEvent, jsx } from "butterfloat"
import { Observable, combineLatest, concat, map, of, scan } from "rxjs"

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
