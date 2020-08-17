import React from 'react'
import styled from 'styled-components'

import { DocPage, DocsPageNavItem } from '../types'

import { sortItemsByImportance, itemIsNonEmpty } from './util'

import { PageTitle } from './typography'

import {
  Main, Lead, PageToC, PageToCItemList, PageBlocks,
  GlobalNav, GlobalNavTopLevelItemList,
  SIDEBAR_BACKGROUND, SIDEBAR_BORDER,
  SIDEBAR_WIDTH_REM, HEADER_HEIGHT_REM,
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

  return (
    <>
      <DocPageContext.Provider
          value={{
            AsciidocComponent: AsciidocComponent,
            LinkComponent: LinkComponent || initialDocPageContext.LinkComponent,
            pathIsCurrent: pathIsCurrent || initialDocPageContext.pathIsCurrent,
          }}>
        <DocsPageHeader>
          {header}
        </DocsPageHeader>

        <DocsPageMain role="presentation">
          <Main>
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
                        <a href={`#${s.id}`}>{s.title}</a>
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
            ? <GlobalNav>
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


const DocsPageHeader = styled.header`
  padding: 1rem 0;
  height: ${HEADER_HEIGHT_REM}rem;

  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  @media screen and (min-width: 800px) {
    -webkit-backdrop-filter: unset;
    backdrop-filter: unset;
    right: unset;

    background: ${SIDEBAR_BACKGROUND};
    border-right: ${SIDEBAR_BORDER};

    width: ${SIDEBAR_WIDTH_REM}rem;
    overflow: hidden;
    padding-left: 1rem;
  }
`

const DocsPageMain = styled.div`
  margin: 0 1em;

  @media screen and (min-width: 800px) {
    margin-right: 0;
    margin-left: ${SIDEBAR_WIDTH_REM}rem;
    padding-left: 2rem;
    padding-top: 1.75rem;
    padding-right: 2rem;

    flex: 1;
    overflow-y: auto;
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
  }
`
