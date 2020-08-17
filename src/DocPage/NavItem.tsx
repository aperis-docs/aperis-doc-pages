import React from 'react'

import { DocsPageNavItem } from '../types'
import DocPageContext, { LinkProps } from './context'


interface NavItemProps {
  item: DocsPageNavItem
  relative?: LinkProps["relative"]
  unstyled?: boolean
}
const NavItem: React.FC<NavItemProps> =
function ({ item, relative, unstyled }) {
  const showAsLink = item.hasContents || (item.items || []).length > 0

  let label: JSX.Element

  if (showAsLink) {
    label = (
      <DocPageContext.Consumer>
        {({ LinkComponent, pathIsCurrent }) =>
          !pathIsCurrent(item.path, relative)
            ? <LinkComponent
                  style={{ color: '#444' }}
                  to={item.path}
                  unstyled={unstyled}
                  relative={relative}>
                {item.title}
              </LinkComponent>
            : <em aria-current="page">
                {item.title}
              </em>
        }
      </DocPageContext.Consumer>
    )

  } else {
    label = (
      <span>
        {item.title}
      </span>
    )
  }

  return label
}

export default NavItem
