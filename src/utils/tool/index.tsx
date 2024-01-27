/* eslint-disable react/display-name */
import { DrawerProps, ModalProps } from 'antd';
import { Modal } from 'antd';
import { Drawer } from 'antd';
import { ReactNode, useRef } from 'react';
import { useImperativeHandle } from 'react';
import { useEffect } from 'react';
import React, { useState } from 'react';
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import { nanoid } from 'nanoid/index';
// import './index.less'

let globalDrawerNodes: HTMLDivElement[] = [];
let globalModalNodes: HTMLDivElement[] = [];

/**
 * Reference object
 */
interface CommonRefObj {
  /** Rendered node */
  node: Element;
  /** Close method */
  close: () => void;
}

// Drawer properties
interface DrawerPr extends DrawerProps {
  ref: any;
  node: Element;
}

/**
 * Component for displaying drawer information
 * @param props
 */
const RenderDrawer: React.FC<DrawerPr> = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Delayed display
    setTimeout(() => {
      setOpen(true);
    }, 50);
  }, []);

  useImperativeHandle(ref, () => ({
    node: props.node,
    close: () => {
      setOpen(false);
    },
  }));
  return (
    <Drawer
      destroyOnClose={true}
      title={props?.title || ''}
      placement={props?.placement || 'right'}
      size={props?.size || 'large'}
      onClose={(e) => {
        setOpen(false);
        if (props?.onClose) {
          props.onClose(e);
        }
      }}
      {...props}
      open={open}
    >
      {props.children}
    </Drawer>
  );
});

/**
 * Global function to display drawers
 * @param dom Rendered content
 * @param drawerProps Drawer properties
 * @returns Returns a ref that can call the close method to close
 */
export function showDrawer(dom: ReactNode, drawerProps: DrawerProps): React.RefObject<CommonRefObj> {
  const ref = useRef<any>();
  const id = new Date().getTime();
  const node = document.createElement('div');
  node.setAttribute('id', '' + id);
  document.body.appendChild(node);
  if (!globalDrawerNodes) {
    globalDrawerNodes = [];
  }
  const _nn: any = {
    node: node,
    ref: ref,
  };
  globalDrawerNodes.push(_nn);

  // Modal properties
  let _dom: any = dom;
  let _drawerProps = {
    footerStyle: { display: 'flex', justifyContent: 'flex-end' },
    ...drawerProps,
  };
  if (React.isValidElement(_dom)) {
    // Get properties
    console.log('Get component properties', _dom?.props);
    // Set bottom button
    if (_dom?.props?.setFooter) {
      const targetId = '_' + nanoid();
      _dom = React.cloneElement(_dom, {
        submitTargetId: targetId,
      });
      if (_drawerProps?.footer) {
        if (Array.isArray(_drawerProps.footer)) {
          _drawerProps.footer.push(<span key={targetId} id={targetId} className="drawerFooterBtn" style={{ marginLeft: '10px' }} />);
        }
        if (React.isValidElement(_drawerProps.footer)) {
          _drawerProps.footer = [_drawerProps.footer, <span key={targetId} id={targetId} className="drawerFooterBtn" style={{ marginLeft: '10px' }} />];
        }
        if (Array.isArray(_drawerProps.footer)) {
          _drawerProps.footer = _drawerProps.footer.map((item: any) => {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {
                key: nanoid(),
              });
            }
            return item;
          });
        }
      } else {
        _drawerProps.footer = <span key={targetId} id={targetId} className="drawerFooterBtn" />;
      }
    }
  }

  console.log('showDrawer _', _dom, _drawerProps);
  const root = createRoot(node);
  root.render(<RenderDrawer ref={ref} node={node} {..._drawerProps}>{_dom}</RenderDrawer>);
  return ref;
}

/**
 * Global function to close drawers
 * @param ref Ref of the component to close | Leave it empty to close all referenced components
 * @param node Node to close | Leave it empty to close all nodes
 */
export function closeDrawer(ref?: React.RefObject<CommonRefObj> | null, node?: Element | null) {
  if (!globalDrawerNodes) {
    globalDrawerNodes = [];
  }
  if (!ref && !node) {
    // Global cleanup
    globalDrawerNodes.map((item: any) => {
      if (item?.ref) {
        item.ref?.current?.close();
      }
    });
  } else {
    if (ref && ref.current) {
      ref?.current?.close();
    }
    if (node) {
      const root = createRoot(node);
      root.unmount();
    }
  }
}

// Modal properties
interface ModalPr extends ModalProps {
  ref: any;
  node: Element;
}

/**
 * Component for displaying modal information
 * @param props
 */
const RenderModal: React.FC<ModalPr> = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const _ref = useRef<any>();
  useEffect(() => {
    // Delayed display
    setTimeout(() => {
      setOpen(true);
    }, 50);
  }, []);

  useImperativeHandle(ref, () => ({
    node: props.node,
    close: () => {
      setOpen(false);
    },
  }));

  return (
    <Modal
      destroyOnClose={true}
      title={props?.title || ''}
      width={props?.width || 480}
      bodyStyle={{
        maxHeight: window.innerHeight / 1.5 + 'px',
        overflowY: 'auto',
        ...props?.bodyStyle,
      }}
      centered={true}
      onCancel={(e) => {
        setOpen(false);
        if (props?.onCancel) {
          props.onCancel(e);
        }
      }}
      onOk={(e) => {
        setOpen(false);
        if (props?.onOk) {
          props.onOk(e);
        }
      }}
      {...props}
      open={open}
    >
      {props.children}
    </Modal>
  );
});

/**
 * Global function to display modals
 * @param dom Rendered content
 * @param modalProps Modal properties
 * @returns Returns a ref that can call the close method to close
 */
export function showModal(dom: ReactNode, modalProps: ModalProps): React.RefObject<CommonRefObj> {
  const ref = useRef<any>();
  const id = new Date().getTime();
  const node = document.createElement('div');
  node.setAttribute('id', '' + id);
  document.body.appendChild(node);
  if (!globalModalNodes) {
    globalModalNodes
  }
  const _nn: any = {
    node: node,
    ref: ref,
  };
  globalModalNodes.push(_nn);

  // Modal properties
  let _dom: any = dom;
  let _modalProps = { ...modalProps };
  if (React.isValidElement(_dom)) {
    // Get properties
    console.log('Get component properties', _dom?.props);
    // Set bottom button
    if (_dom?.props?.setFooter) {
      const targetId = '_' + nanoid();
      _dom = React.cloneElement(_dom, {
        submitTargetId: targetId,
      });
      if (_modalProps?.footer) {
        if (Array.isArray(_modalProps.footer)) {
          _modalProps.footer.push(<span key={targetId} id={targetId} style={{ marginLeft: '10px' }} />);
        }
        if (React.isValidElement(_modalProps.footer)) {
          _modalProps.footer = [_modalProps.footer, <span key={targetId} id={targetId} style={{ marginLeft: '10px' }} />];
        }
        if (Array.isArray(_modalProps.footer)) {
          _modalProps.footer = _modalProps.footer.map((item: any) => {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {
                key: nanoid(),
              });
            }
            return item;
          });
        }
      } else {
        _modalProps.footer = <span key={targetId} id={targetId} />;
      }
    }
  }

  console.log('showModal _', _dom, _modalProps);
  const root = createRoot(node);
  root.render(<RenderModal ref={ref} node={node} {..._modalProps}>{_dom}</RenderModal>);
  return ref;
}

/**
 * Global function to close modals
 * @param ref Ref of the component to close | Leave it empty to close all referenced components
 * @param node Node to close | Leave it empty to close all nodes
 */
export function closeModal(ref?: React.RefObject<CommonRefObj> | null, node?: Element | null) {
  if (!globalModalNodes) {
    globalModalNodes = [];
  }
  if (!ref && !node) {
    // Global cleanup
    globalModalNodes.map((item: any) => {
      if (item?.ref) {
        item.ref?.current?.close();
      }
    });
  } else {
    if (ref && ref.current) {
      ref?.current?.close();
    }
    if (node) {
      const root = createRoot(node);
      root.unmount();
    }
  }
}

export default {
  showDrawer,
  closeDrawer,
  showModal,
  closeModal,
};
