import React, {ReactElement, ReactEventHandler, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import './dialog.scss';
import Icon from '../icon/icon';
import {scopedClassMaker} from '../classes';
import '../index.scss';

interface Props {
  visible: boolean;
  buttons?: ReactElement[];
  onClose: ReactEventHandler;
  closeOnBody?: boolean
}

const scopedClass = scopedClassMaker('whale-dialog');

const Dialog: React.FunctionComponent<Props> = (props) => {
  const {visible, onClose, closeOnBody} = props;
  const onClickClose: React.ReactEventHandler = (e) => {
    onClose(e);
  };
  const onClickMask: React.ReactEventHandler = (e) => {
    if (closeOnBody) {
      onClickClose(e);
    }
  };
  return (
    ReactDOM.createPortal(
      visible ?
        <>
          <div className={scopedClass('mask')} onClick={onClickMask}>
          </div>
          <div className={scopedClass()}>
            <div className={scopedClass('close')} onClick={onClickClose}><Icon name="close"/></div>
            <header className={scopedClass('header')}>提示</header>
            <main className={scopedClass('main')}>{props.children}</main>
            {
              props.buttons && <footer className={scopedClass('footer')}>
                {
                  props.buttons.map(((button, index) =>
                      React.cloneElement(button, {key: index})
                  ))
                }
              </footer>
            }

          </div>
        </>
        : null, document.body
    )

  );
};
Dialog.defaultProps = {
  closeOnBody: true
};

const model = (content:ReactNode,buttons?:ReactElement[])=>{
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, {visible: false}), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };
  const component = <Dialog visible={true} buttons={buttons} onClose={onClose}>{content}</Dialog>;
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
return onClose
}

const message = (content: string) => {
  model(content)
};

const confirm = (content: string, yes: () => void, no: () => void) => {
  const onYes = () => {
    yes && yes();
    onClose();
  };
  const onNo = () => {
    no && no();
    onClose();
  };
  const buttons = [
    <button onClick={onYes}>yes</button>,
    <button onClick={onNo}>no</button>
  ]
  const onClose = model(content,buttons)
};

export {message, confirm, model};

export default Dialog;