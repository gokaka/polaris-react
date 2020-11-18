import React, {RefObject, useRef, useState, useEffect} from 'react';

import {
  PortalsManagerContext,
  PortalsContainerElement,
} from '../../utilities/portals';

import {PortalsContainer} from './components';

export interface PortalsManagerProps {
  children: React.ReactNode;
  container?: RefObject<PortalsContainerElement>;
}

export function PortalsManager({children, container}: PortalsManagerProps) {
  const portalsContainerRef = useRef<PortalsContainerElement>(null);
  const [currentContainer, setCurrentContainer] = useState<
    PortalsContainerElement
  >(null);

  useEffect(() => {
    const newContainer = container
      ? container.current
      : portalsContainerRef.current;
    setCurrentContainer(newContainer);
  }, [container, portalsContainerRef]);

  return (
    <PortalsManagerContext.Provider
      value={{
        container: currentContainer,
      }}
    >
      {children}
      {container ? null : <PortalsContainer ref={portalsContainerRef} />}
    </PortalsManagerContext.Provider>
  );
}
