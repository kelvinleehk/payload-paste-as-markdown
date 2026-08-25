import { createServerFeature } from '@payloadcms/richtext-lexical'

export const MarkdownPasteFeature = createServerFeature({
  feature: () => ({
    ClientFeature: 'paste-as-markdown/client#MarkdownPasteFeatureClient',
  }),
  key: 'markdownPaste',
})
