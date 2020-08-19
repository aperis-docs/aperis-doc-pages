import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import { DocPage, DocsPageNavItem } from '../types'

import { sortItemsByImportance, itemIsNonEmpty } from './util'

import { PageTitle } from './typography'

import {
  Main, Lead, PageToC, PageToCItemList, PageBlocks,
  GlobalNav, GlobalNavTopLevelItemList,
  SIDEBAR_BACKGROUND, SIDEBAR_BORDER,
  SIDEBAR_WIDTH_REM, HEADER_HEIGHT_REM, BACKDROP_BLUR,
} from './pageElements'
import PageBlock from './PageBlock'
import GlobalNavMenuItem from './GlobalNavMenuItem'
import DocPageContext, { DocPageContextSpec, initialDocPageContext } from './context'


interface DocPageProps {
  page: DocPage
  nav: DocsPageNavItem[]

  rootURLPath: string

  // Put a logo here
  header: JSX.Element
  // Put credits here
  footer?: JSX.Element

  AsciidocComponent: DocPageContextSpec["AsciidocComponent"]
  LinkComponent?: DocPageContextSpec["LinkComponent"]
  pathIsCurrent?: DocPageContextSpec["pathIsCurrent"]
}
const DocPage: React.FC<DocPageProps> =
function ({
  page, nav,
  rootURLPath,
  header, footer,
  AsciidocComponent, LinkComponent,
  pathIsCurrent,
}) {
  const items = sortItemsByImportance(page.items || []).filter(itemIsNonEmpty)
  const navSorted = sortItemsByImportance(nav || [])

  const [interactive, setInteractive] = useState(false)
  useEffect(() => setInteractive(true), [])

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  useEffect(closeSidebarIfViewportIsNarrow, [])

  function closeSidebarIfViewportIsNarrow() {
    const wideViewport = window.innerWidth > 800
    if (!wideViewport) {
      setSidebarIsOpen(false)
    }
  }

  return (
    <>
      <DocPageContext.Provider
          value={{
            AsciidocComponent: AsciidocComponent,
            LinkComponent: LinkComponent || initialDocPageContext.LinkComponent,
            pathIsCurrent: pathIsCurrent || initialDocPageContext.pathIsCurrent,
          }}>
        <DocsPageHeader sidebarIsOpen={interactive ? sidebarIsOpen : undefined}>
          {interactive
            ? <NavExpandTrigger
                isActive={sidebarIsOpen}
                title="Toggle menu"
                dangerouslySetInnerHTML={{ __html: MENU_ICON_SVG }}
                onClick={() => setSidebarIsOpen(s => !s)}>
              </NavExpandTrigger>
            : null}

          {header}
        </DocsPageHeader>

        <DocsPageMain role="presentation" sidebarIsOpen={sidebarIsOpen}>
          <Main
              sidebarIsOpen={sidebarIsOpen}
              onClick={closeSidebarIfViewportIsNarrow}>
            <PageTitle>{page.data?.title}</PageTitle>

            <Lead>
              {page.data?.summary
                ? <AsciidocComponent
                    inline
                    style={{ marginBottom: '1rem' }}
                    content={page.data?.summary || ''} />
                : <p>{page.data?.excerpt}</p>}
            </Lead>

            {page.data?.sections && page.data.sections.length > 0
              ? <PageToC>
                  <h3 className="header">In this article</h3>
                  <PageToCItemList>
                    {page.data.sections.map(s =>
                      <li>
                        <a href={`#${s.id}`} dangerouslySetInnerHTML={{ __html: s.title }} />
                      </li>
                    )}
                  </PageToCItemList>
                </PageToC>
              : null}

            <AsciidocComponent content={page.data?.contents || ''} />

            {items.length > 0
              ? <PageBlocks>
                  {items.map(p =>
                    <PageBlock key={p.path} item={p} />
                  )}
                </PageBlocks>
              : null}
          </Main>

          {navSorted.length > 0
            ? <GlobalNav isExpanded={interactive ? sidebarIsOpen : undefined}>
                <GlobalNavTopLevelItemList>
                  {navSorted.map(i =>
                    <GlobalNavMenuItem item={i} relative={rootURLPath} />
                  )}
                </GlobalNavTopLevelItemList>
              </GlobalNav>
            : null}
        </DocsPageMain>

        <DocsPageFooter>
          {footer}
        </DocsPageFooter>
      </DocPageContext.Provider>
    </>
  )
}


export default DocPage


const MENU_ICON_SVG = `
  <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(3 5)"><g stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 1.5h8"/><path d="m4.5 5.498h5"/><path d="m4.5 9.5h8"/></g><path d="m1.49884033 2.5c.5 0 1-.5 1-1s-.5-1-1-1-.99884033.5-.99884033 1 .49884033 1 .99884033 1zm0 4c.5 0 1-.5 1-1s-.5-1-1-1-.99884033.5-.99884033 1 .49884033 1 .99884033 1zm0 4c.5 0 1-.5 1-1s-.5-1-1-1-.99884033.5-.99884033 1 .49884033 1 .99884033 1z" fill="#2a2e3b"/></g></svg>
`


const NavExpandTrigger = styled.button`
  margin: 0;
  margin-right: .5rem;
  padding: 0 .5rem;
  line-height: 1;
  display: block;
  border: none;
  background: transparent;

  cursor: pointer;
  white-space: nowrap;

  ${(props: { isActive: boolean }) => props.isActive
    ? css`
      `
    : ''}
`


const DocsPageHeader = styled.header`
  padding: .5rem 0 .5rem 1rem;
  height: ${HEADER_HEIGHT_REM}rem;

  ${BACKDROP_BLUR}

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  transition: right .2s linear;

  @media screen and (min-width: 800px) {
    padding: 1rem 0 1rem 1rem;

    ${(props: { sidebarIsOpen?: boolean }) => props.sidebarIsOpen === undefined
      ? css`
          right: unset;

          background: ${SIDEBAR_BACKGROUND};
          border-right: ${SIDEBAR_BORDER};

          width: ${SIDEBAR_WIDTH_REM}rem;
          overflow: hidden;
        `
      : ''}
  }

  ${(props: { sidebarIsOpen?: boolean }) => props.sidebarIsOpen === true
    ? css`
        // TODO: BEGIN DUPLICATION

        right: unset;

        background: ${SIDEBAR_BACKGROUND};
        border-right: ${SIDEBAR_BORDER};

        width: ${SIDEBAR_WIDTH_REM}rem;
        overflow: hidden;

        // END DUPLICATION
      `
    : ''}
`

const DocsPageMain = styled.div`
  margin: 0 1em;

  @media screen and (min-width: 800px) {
    margin-right: 0;

    padding-left: 2rem;
    padding-top: 1.75rem;
    padding-right: 2rem;

    flex: 1;
    overflow-y: auto;

    ${(props: { sidebarIsOpen?: boolean }) => props.sidebarIsOpen
      ? css`
          margin-left: ${SIDEBAR_WIDTH_REM}rem;
        `
      : css`
        `}
  }
`


const DocsPageFooter = styled.footer`
  padding-left: 1rem;
  padding-bottom: 1rem;

  @media screen and (min-width: 800px) {
    width: ${SIDEBAR_WIDTH_REM}rem;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: flex-start;
    z-index: 11;
  }
`
