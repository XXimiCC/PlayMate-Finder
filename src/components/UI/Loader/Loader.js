import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import css from './Loader.module.scss'

const Loader = (props) => {
  const ref = React.createRef();
  const isLocal = props.type === 'local';
  const loaderCls = isLocal
    ? [css.ldsRing, css.local]
    : [css.ldsRing];

  const overlayCls = isLocal
    ? [css.overlay, css.local]
    : [css.overlay];

  useEffect(() => {
    if (!ref.current) return;

    const $el = $(ref.current);
    const parentCSSPosition = $el.parent().css('position');

    if (isLocal && parentCSSPosition !== 'relative') {
      console.warn('Container of local loader must be with relative position')
    }

  }, [ref, props.localOverlay, isLocal]);

  if (props.show === false) {
    return null;
  }

  const loader = (
    <div className={loaderCls.join(' ')} ref={ref}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  );

  const overlay = (
    <div className={overlayCls.join(' ')} />
  );

  const component = (
    <>
      {loader}
      {overlay}
    </>
  );

  if (!isLocal) {
    return ReactDOM.createPortal(
      component,
      document.getElementById('modal-root')
    );
  }

  return component;
};

export default Loader;
