import { createCommand } from '@payloadcms/richtext-lexical/lexical'

export const OPEN_MARKDOWN_PASTE_DRAWER_COMMAND = createCommand<undefined>(
  'OPEN_MARKDOWN_PASTE_DRAWER_COMMAND',
)

export const PASTE_MARKDOWN_COMMAND = createCommand<string>('PASTE_MARKDOWN_COMMAND')
