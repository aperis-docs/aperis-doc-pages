import React from 'react'
import styled, { css } from 'styled-components'

import { DocsPageNavItem } from '../types'

import { sortItemsByImportance } from './util'
import { GlobalNavItemList } from './pageElements'
import NavItem from './NavItem'
import DocPageContext, { LinkProps } from './context'


interface GlobalNavMenuItemProps {
  item: DocsPageNavItem
  relative?: LinkProps["relative"]
  childLevels?: number
}
export const GlobalNavMenuItem: React.FC<GlobalNavMenuItemProps> =
function ({ item, relative, childLevels }) {
  const items = sortItemsByImportance((item.items || []).filter(i => (i.items || []).length > 0 || i.hasContents))

  return (
    <DocPageContext.Consumer>
      {({ pathIsCurrent }) =>
        <GlobalNavMenuLI active={pathIsCurrent(item.path, relative)}>
          <NavItem
            item={item}
            unstyled
            relative={relative} />

          {(childLevels === undefined || childLevels > 0) && items.length > 0
            ? <GlobalNavItemList>
                {items.map(p =>
                  <GlobalNavMenuItem
                    key={p.path}
                    item={p}
                    relative={relative}
                    childLevels={childLevels !== undefined
                      ? childLevels - 1
                      : undefined} />
                )}
              </GlobalNavItemList>
            : null}
        </GlobalNavMenuLI>
      }
    </DocPageContext.Consumer>
  )
}


const GlobalNavMenuLI = styled.li`
${(props: { active: boolean }) =>
    props.active
    ? css`
        background: rgba(255, 255, 255, 0.7);
        box-shadow: rgba(0, 0, 0, 0.2) -.5rem 0 0 0;
      `
    : null}
`


export default GlobalNavMenuItem
