import {VFC} from 'react';
import './Loader.css';

interface LoaderProps {
  fullScreen?: boolean
  size?: 'small' | 'normal' | 'big'
}
export const Loader: VFC<LoaderProps> = ({fullScreen = false, size = 'normal'}) => {
  const Element = <div className={`lds-ring ${size}`}><div></div><div></div><div></div><div></div></div>
  return fullScreen
    ? (
      <div className="full-screen">
        {Element}
      </div>
    ) : Element
}
