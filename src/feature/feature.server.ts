import { createServerFeature } from '@payloadcms/richtext-lexical'

export const MarkdownPasteFeature = createServerFeature({
  feature: () => ({
    ClientFeature: 'payload-paste-as-markdown/client#MarkdownPasteFeatureClient',
  }),
  key: 'markdownPaste',
})
