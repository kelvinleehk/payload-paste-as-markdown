'use client'

import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEditorConfigContext } from '@payloadcms/richtext-lexical/client'
import { COMMAND_PRIORITY_EDITOR } from '@payloadcms/richtext-lexical/lexical'
import { useEffect, useState } from 'react'

import { OPEN_MARKDOWN_PASTE_DRAWER_COMMAND, PASTE_MARKDOWN_COMMAND } from './command.js'
import { MarkdownPasteDrawer } from './drawer.js'
import { insertMarkdownAtSelection } from './insertMarkdown.js'

export const MarkdownPastePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  const { editorConfig } = useEditorConfigContext()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    return editor.registerCommand(
      OPEN_MARKDOWN_PASTE_DRAWER_COMMAND,
      () => {
        setDrawerOpen(true)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  useEffect(() => {
    return editor.registerCommand(
      PASTE_MARKDOWN_COMMAND,
      (markdown) => {
        insertMarkdownAtSelection({
          editor,
          markdown,
          transformers: editorConfig.features.markdownTransformers,
        })
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor, editorConfig])

  return <MarkdownPasteDrawer onClose={() => setDrawerOpen(false)} open={drawerOpen} />
}
