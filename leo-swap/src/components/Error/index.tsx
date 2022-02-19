import {FC} from 'react';
import './Error.css'

interface ErrorProps {
  onClear: () => void
}

export const Error: FC<ErrorProps> = ({onClear, children}) => (
  <div className={'error'} onClick={onClear}>
    <span>
      {children}
    </span>
    <div className={'close'}>&times;</div>
  </div>
)
