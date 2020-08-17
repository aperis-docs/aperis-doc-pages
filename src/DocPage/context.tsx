import React, { createContext } from 'react'


export interface LinkProps {
  to: string
  relative?: string | boolean
  unstyled?: boolean
  title?: string
  className?: string
  style?: React.CSSProperties
}


export interface AsciidocProps {
  content: string
  inline?: boolean
  className?: string
  style?: React.CSSProperties
}


export interface DocPageContextSpec {
  LinkComponent: React.FC<React.PropsWithChildren<LinkProps>>
  AsciidocComponent: React.FC<AsciidocProps>
  pathIsCurrent: (path: string, relative?: string | boolean) => boolean
}


export const initialDocPageContext: DocPageContextSpec = {
  pathIsCurrent: () => false,
  AsciidocComponent: ({ content }) =>
    <div dangerouslySetInnerHTML={{ __html: content }} />,
  LinkComponent: (props: React.PropsWithChildren<LinkProps>) =>
    <a href={props.to}>{props.children}</a>,
}


const DocPageContext =
createContext<DocPageContextSpec>(initialDocPageContext)


export default DocPageContext
