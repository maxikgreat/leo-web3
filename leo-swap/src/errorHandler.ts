export const getNormalizedError = (err: unknown): string => {
  let error = 'Unknown error'
  
  const message = (err as {message: string})?.message ?? ''
  
  if (message) {
    error = message
  }
  
  const nestedMessage = (err as {data: any})?.data?.message ?? ''
  
  if (nestedMessage?.includes('reverted with reason')) {
    const extractedMessage = nestedMessage.split("'")
    
    const [, ...rest] = extractedMessage
    
    if (Array.isArray(rest)) {
      error = rest.filter(string => string !== '').join("'")
    }
  }
  
  return error
}
