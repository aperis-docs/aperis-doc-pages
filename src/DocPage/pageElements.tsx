import React from 'react'
import styled, { css } from 'styled-components'
import { Breadcrumb } from '../types'
import { Lead as BasicLead } from './typography'
import DocPageContext from './context'


export const SIDEBAR_WIDTH_REM = 16
export const SIDEBAR_BACKGROUND = 'whiteSmoke'
export const SIDEBAR_BORDER = `rgb(224,224,224) 1px solid`
export const HEADER_HEIGHT_REM = 4
export const BACKDROP_BLUR = css`
  @supports (backdrop-filter: saturate(180%) blur(20px)) or (-webkit-backdrop-filter: saturate(180%) blur(20px)) {
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
  }
`


export const Lead = styled(BasicLead)`
  margin-bottom: 1em;
`


export const PageToC = styled.nav`
  background: ${SIDEBAR_BACKGROUND};
  margin: 0 -1rem 1em -1rem;
  padding: .25rem 1rem;

  > .header {
    font-size: 90%;
  }

  @media screen and (min-width: 800px) {
    margin-left: 0;
    margin-right: 0;
  }
`


export const PageBlocks = styled.section`
  margin-top: 2rem;

  > * {
    margin-bottom: .5rem;
  }

  @media screen and (min-width: 800px) {
    box-sizing: border-box;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    > * {
      flex: 1 1 20em;
      box-sizing: border-box;
      margin: 0 1rem 1rem 0;
    }
  }
`


export const GlobalNav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 80%;

  @media screen and (min-width: 800px) {
    margin-top: 0;
    display: block;

    width: ${SIDEBAR_WIDTH_REM}rem;
    padding-left: .5rem;

    overflow-y: auto;
    overflow-x: hidden;

    background: ${SIDEBAR_BACKGROUND};
    border-right: ${SIDEBAR_BORDER};

    position: fixed;
    z-index: 10;
    top: ${HEADER_HEIGHT_REM}rem;
    left: 0;

    bottom: 0;
  }

  && {
    ${(props: { isExpanded?: boolean }) => props.isExpanded !== undefined
      ? css`
          // TODO: BEGIN DUPLICATION

          margin-top: 0;
          display: block;

          width: ${SIDEBAR_WIDTH_REM}rem;
          padding-left: .5rem;

          overflow-y: auto;
          overflow-x: hidden;

          background: ${SIDEBAR_BACKGROUND};
          border-right: ${SIDEBAR_BORDER};

          position: fixed;
          z-index: 10;
          top: ${HEADER_HEIGHT_REM}rem;
          left: 0;

          // END DUPLICATION
        `
      : ''}

    ${(props: { isExpanded?: boolean }) => props.isExpanded === true
      ? css`
          bottom: 0;
        `
      : ''}

    ${(props: { isExpanded?: boolean }) => props.isExpanded === false
      ? css`
          bottom: 100%;
        `
      : ''}
  }
`


const Crumbs = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  padding: 0;
  margin: 0;

  // Make height & padding equivalent to header to align nicely
  height: ${HEADER_HEIGHT_REM}rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  list-style: none;
  font-size: 80%;
`

const Crumb = styled.li`
  color: grey;

  &:after {
    content: "/";
    margin: 0 .5rem;
    color: silver;
  }
`

export const Breadcrumbs: React.FC<{ crumbs: Breadcrumb[] }> =
function ({ crumbs }) {
  return (
    <DocPageContext.Consumer>
      {({ LinkComponent }) =>
        <Crumbs>
          {crumbs.map((crumb, idx) =>
            <Crumb>
              <LinkComponent
                  unstyled
                  to={Array(crumbs.length - idx).fill('..').join('/')}>
                {crumb.title}
              </LinkComponent>
            </Crumb>
          )}
        </Crumbs>
      }
    </DocPageContext.Consumer>
  )
}


export const Main = styled.main`
  margin-top: ${HEADER_HEIGHT_REM + 1}rem;
  margin-bottom: 2em;

  > .blocks {
    article + article {
      margin-top: 1rem;
      border-top: 1px solid silver;
    }
  }

  > h2 {
    margin-top: 0;
  }

  @media screen and (min-width: 800px) {
    max-width: 50rem;

    transition: margin-top .2s linear;

    ${(props: { sidebarIsOpen: boolean }) => props.sidebarIsOpen
      ? css`
          margin-top: unset;
        `
      : css`
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4em;
        `}
  }
`


export const GlobalNavItemList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding-left: 1.2rem;
    padding-top: .25rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    > ul {
      border-left: ${SIDEBAR_BORDER};
    }
  }
`


export const GlobalNavTopLevelItemList = styled(GlobalNavItemList)`
  > li {
    border-left-width: 0;

    padding-top: .5rem;
    padding-bottom: .5rem;
    border-bottom: ${SIDEBAR_BORDER};

    &:first-child {
      border-top: ${SIDEBAR_BORDER};
    }

    > span, > a, > strong {
      text-transform: uppercase;
      letter-spacing: .02em;
      font-size: 90%;
      margin-bottom: .5rem;
    }
  }
`


export const ToCItemList = styled.ul`
  margin: 0;

  font-size: 90%;
  line-height: 1.5;

  display: flex;
  padding: 0 0 1rem 0;
  list-style: none;
  overflow-x: auto;

  > * + * {
    margin-left: .5rem;

    &:before {
      content: "•";
      margin-right: .5rem;
    }
  }

  > * {
    white-space: nowrap;
    color: #444;
  }
`


export const PageToCItemList = styled(ToCItemList)`
  margin: 0 -1rem;
  padding-left: 1rem;
`
