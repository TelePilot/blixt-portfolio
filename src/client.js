import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'k1q80ymp',
  dataset: 'production',
  token: '', // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})
