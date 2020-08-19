import React from 'react'
import styled from 'styled-components'

import { DocsPageItem, MediaItem } from '../types'
import DoubleDPIImage, { DoubleDPIImageProps } from './DoubleDPIImage'

import { sortItemsByImportance, itemIsNonEmpty } from './util'
import NavItem from './NavItem'
import { ToCItemList, SIDEBAR_BORDER } from './pageElements'
import DocPageContext from './context'


const BLOCK_SIDE_PADDING = '1rem'


interface PageBlockProps {
  item: DocsPageItem
}
const PageBlock: React.FC<PageBlockProps> = function ({ item }) {
  const items = sortItemsByImportance((item.items || []).filter(itemIsNonEmpty))
  const coverMedia: MediaItem | null = (item.media && item.media.length > 0)
    ? item.media[0]
    : null
  const hasToC = items.length > 0

  return (
    <DocPageContext.Consumer>
      {({ AsciidocComponent, LinkComponent }) =>
        <DocsPageBlock>
          {coverMedia && coverMedia.dimensions
            ? <CoverMedia
                src={`./${item.path}/${coverMedia.filename}`}
                dimensions={coverMedia.dimensions} />
            : null}

          <h3 className="title" id={item.id} style={{ flex: hasToC ? undefined : 1 }}>
            {item.hasContents || (item.items || []).length > 0
              ? <LinkComponent to={item.path}>{item.title}</LinkComponent>
              : <>{item.title}</>}
          </h3>

          <Excerpt style={{ flex: hasToC ? 1 : undefined }}>
            {item.summary
              ? <AsciidocComponent inline content={item.summary} />
              : <p>{item.excerpt}</p>}
          </Excerpt>

          {hasToC
            ? <BlockToC>
                {items.map(p =>
                  <li key={p.path}>
                    <NavItem item={p} relative />
                  </li>
                )}
              </BlockToC>
            : null}
        </DocsPageBlock>
      }
    </DocPageContext.Consumer>
  )
}


const CoverMedia: React.FC<DoubleDPIImageProps> =
function ({ src, dimensions, style, className }) {
  return (
    <>
      <CoverMediaOverlay role="presentation" />
      <CoverMediaImage
        aria-role="presentation"
        objectFit="fill"
        className={className}
        style={style}
        src={src}
        dimensions={dimensions} />
    </>
  )
}

const absolutelyPositionedOverlay = `
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const CoverMediaOverlay = styled.div`
  ${absolutelyPositionedOverlay}
  background: whiteSmoke;
  opacity: .8;
  z-index: 2;
`

const CoverMediaImage = styled(DoubleDPIImage)`
  ${absolutelyPositionedOverlay}
  z-index: 1;
  filter: blur(4px);
`


const DocsPageBlock = styled.article`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  padding: 0 ${BLOCK_SIDE_PADDING};
  border: ${SIDEBAR_BORDER};

  > .title {
    font-weight: 300;
    margin-top: 1rem;
    margin-bottom: .25rem;
    z-index: 3;
  }
`


const Excerpt = styled.div`
  font-size: 90%;
  z-index: 3;
`


const BlockToC = styled(ToCItemList)`
  margin: 0 -${BLOCK_SIDE_PADDING};
  padding-left: ${BLOCK_SIDE_PADDING};
`


export default PageBlock
