export const safeReadParams = (props, key) => {
  if (props && props.match && props.match.params) {
    return props.match.params[key]
  }
  return null
}

export const parseErrorMessage = err => {
  if (err.message && err.message.includes('GraphQL error:')) {
    return err.message.replace('GraphQL error:', '').trim()
  }

  // TODO Handle Others

  // Fallback
  return 'Oops, Something went wrong, please try again'
}
