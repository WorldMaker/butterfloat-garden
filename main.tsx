import { jsx, run } from 'butterfloat'

interface HelloProps {
  to: string
}

function Hello({ to }: HelloProps) {
  return <p className="hello">Hello {to}</p>
}

function Main() {
  return <Hello to="World" />
}

const container = document.getElementById('container')!
run(container, Main)
