import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

export default function Modal({ children }: PropsWithChildren) {
  return ReactDOM.createPortal(children, document.getElementById('modal')!)
}
