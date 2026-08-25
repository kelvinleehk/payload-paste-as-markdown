import { $convertFromMarkdownString } from '@payloadcms/richtext-lexical/lexical/markdown'
import type { Transformer } from '@payloadcms/richtext-lexical/lexical/markdown'
import type { LexicalEditor, LexicalNode } from '@payloadcms/richtext-lexical/lexical'
import {
  $createRangeSelection,
  $getRoot,
  $getSelection,
  $setSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'

export function insertMarkdownAtSelection({
  editor,
  markdown,
  transformers,
}: {
  editor: LexicalEditor
  markdown: string
  transformers: Transformer[]
}): void {
  if (!markdown.trim()) {
    return
  }

  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) {
      return
    }

    // Remember where the cursor is so we can recreate the selection after
    // temporarily replacing the editor contents for markdown conversion.
    const anchor = selection.anchor
    const focus = selection.focus
    const anchorKey = anchor.getNode().getKey()
    const anchorOffset = anchor.offset
    const anchorType = anchor.type
    const focusKey = focus.getNode().getKey()
    const focusOffset = focus.offset
    const focusType = focus.type

    // Save original root children so we can restore them after converting markdown.
    const originalChildren = $getRoot().getChildren()

    // Convert markdown in-place (replaces the root's children with parsed markdown).
    $convertFromMarkdownString(markdown, transformers)

    // Capture the converted children.
    const convertedChildren: LexicalNode[] = $getRoot().getChildren()

    // Restore the original content.
    $getRoot().clear()
    for (const child of originalChildren) {
      $getRoot().append(child)
    }

    // Recreate the original selection at the saved cursor position.
    const restoredSelection = $createRangeSelection()
    restoredSelection.anchor.set(anchorKey, anchorOffset, anchorType)
    restoredSelection.focus.set(focusKey, focusOffset, focusType)
    $setSelection(restoredSelection)

    // Insert the converted markdown nodes at the exact cursor position.
    // This splits the current paragraph and inserts the new blocks inline.
    restoredSelection.insertNodes(convertedChildren)

    // Move cursor to the end of the inserted content.
    const lastNode = convertedChildren[convertedChildren.length - 1]
    if (lastNode && lastNode.isAttached()) {
      lastNode.selectEnd()
    }
  })
}
