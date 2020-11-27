import React, {useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';

import {PortalsManagerContext} from '../../utilities/portals';
import {useUniqueId} from '../../utilities/unique-id';
import {useIsMountedRef} from '../../utilities/use-is-mounted-ref';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
}: PortalProps) {
  const isMounted = useIsMountedRef();
  const portalsContext = useContext(PortalsManagerContext);

  const portalId = useUniqueId(idPrefix !== '' ? idPrefix : 'Portal');

  useEffect(() => {
    if (isMounted) {
      onPortalCreated();
    }
  }, [onPortalCreated, isMounted]);

  return portalsContext && portalsContext.container
    ? createPortal(
        <div data-portal-id={portalId}>{children}</div>,
        portalsContext.container,
      )
    : null;
}

function noop() {}
