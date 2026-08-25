'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'

import { OPEN_MARKDOWN_PASTE_DRAWER_COMMAND } from './command.js'
import { MarkdownIcon } from './icon.js'
import { MarkdownPastePlugin } from './plugin.js'

function openMarkdownPasteDrawer(editor: LexicalEditor): void {
  editor.dispatchCommand(OPEN_MARKDOWN_PASTE_DRAWER_COMMAND, undefined)
}

const toolbarGroup = {
  type: 'buttons' as const,
  key: 'markdownPaste',
  order: 100,
  items: [
    {
      ChildComponent: MarkdownIcon,
      key: 'markdownPaste',
      label: 'Paste Markdown',
      onSelect: ({ editor }: { editor: LexicalEditor }) => {
        openMarkdownPasteDrawer(editor)
      },
      order: 100,
    },
  ],
}

export const MarkdownPasteFeatureClient = createClientFeature(() => ({
  plugins: [
    {
      Component: MarkdownPastePlugin,
      position: 'normal' as const,
    },
  ],
  slashMenu: {
    groups: [
      {
        key: 'markdownPaste',
        label: 'Markdown',
        items: [
          {
            Icon: MarkdownIcon,
            key: 'markdownPaste',
            keywords: ['markdown', 'md', 'paste'],
            label: 'Paste Markdown',
            onSelect: ({ editor }: { editor: LexicalEditor }) => {
              openMarkdownPasteDrawer(editor)
            },
          },
        ],
      },
    ],
  },
  toolbarFixed: {
    groups: [toolbarGroup],
  },
  toolbarInline: {
    groups: [toolbarGroup],
  },
}))
