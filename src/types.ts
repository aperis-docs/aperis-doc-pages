/** Render-ready page data. */
export interface DocPage {
  id: string

  data?: {
    breadcrumbs?: Breadcrumb[]

    title: string

    excerpt?: string // Super short
    // TODO: Rename “excerpt” to “in-app tooltip”?

    summary?: string // Longer than excerpt, AsciiDoc rendered as HTML
    contents?: string // Source (ProseMirror structure or Asciidoc) rendered as HTML

    /**
     * Sections extracted from the source (ProseMirror structure or Asciidoc);
     * `name` must correspond to HTML anchor ID
     */
    sections?: { title: string, id: string }[]

    media?: MediaItem[]
  }

  items?: DocsPageItem[]
}


export interface Breadcrumb {
  title: string
}


// TODO: Make a union type out of image, video, etc.
export interface MediaItem {
  type: 'image'
  filename: string
  dimensions: {
    width: number
    height: number
  }
}


export interface DocsPageNavItem {
  id: string
  importance?: number
  hasContents: boolean
  path: string
  title?: string
  items?: DocsPageNavItem[]
}


export interface DocsPageItem extends DocsPageNavItem {
  excerpt?: string
  summary?: string
  media?: MediaItem[]
}
