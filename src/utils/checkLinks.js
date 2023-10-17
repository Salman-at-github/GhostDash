async function getLinksStatus(links) {
    async function checkLinkAsync(link) {
      try {
        const response = await fetch(link, { method: 'HEAD' });
        const status = response.status;
  
        if (status >= 200 && status < 400) {
          return { link, isBroken: false };
        } else {
          return { link, isBroken: true };
        }
      } catch (error) {
        return { link, result: 'Error', error: error.message };
      }
    }
  
    const results = [];
  
    for (const link of links) {
      const result = await checkLinkAsync(link);
      results.push(result);
    }
  
    return results;
  }
  
  export default getLinksStatus;
  