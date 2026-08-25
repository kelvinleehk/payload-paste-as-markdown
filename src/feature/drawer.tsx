'use client'

import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { Button } from '@payloadcms/ui/elements/Button'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { PASTE_MARKDOWN_COMMAND } from './command.js'

export const MarkdownPasteDrawer: React.FC<{
  onClose: () => void
  open: boolean
}> = ({ onClose, open }) => {
  const [editor] = useLexicalComposerContext()
  const [markdown, setMarkdown] = React.useState('')

  const handleInsert = () => {
    const trimmed = markdown.trim()
    if (trimmed) {
      editor.dispatchCommand(PASTE_MARKDOWN_COMMAND, trimmed)
    }
    onClose()
    setMarkdown('')
  }

  const handleCancel = () => {
    onClose()
    setMarkdown('')
  }

  if (!open) {
    return null
  }

  return createPortal(
    <div
      onClick={handleCancel}
      style={{
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 10000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--theme-bg)',
          borderRadius: 'var(--style-radius-m)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '90vh',
          maxWidth: '720px',
          padding: '1.5rem',
          width: '90vw',
        }}
      >
        <h2
          style={{
            color: 'var(--theme-text)',
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Paste Markdown
        </h2>
        <textarea
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Paste your Markdown here..."
          rows={12}
          style={{
            background: 'var(--theme-input-bg)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 'var(--style-radius-s)',
            color: 'var(--theme-text)',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            padding: '0.75rem',
            resize: 'vertical',
            width: '100%',
          }}
          value={markdown}
        />
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
          }}
        >
          <Button buttonStyle="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleInsert}>Insert Markdown</Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
