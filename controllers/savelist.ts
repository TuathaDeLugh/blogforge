export async function addToSavelist(uid:string, rid:string) {
    try {
      const api = process.env.API_URL
  
      const response = await fetch(`/api/user/${uid}`, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ type: 'addToSavelist', id: rid }),
      })
  
      const blogs = await response.json()
  
      return blogs.data
    } catch (error) {
      console.log(error)
    }
  }
  
  export async function removeSavelist(uid:string, rid:string) {
    try {
      const api = process.env.API_URL
  
      const response = await fetch(`/api/user/${uid}`, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ type: 'removeSavelist', id: rid }),
      })
  
      const blogs = await response.json()
  
      return blogs.data
    } catch (error) {
      console.log(error)
    }
  }
  
  export async function getBlogs(uid:string) {
    try {
      const api = process.env.API_URL
  
      const response = await fetch(`${api}/api/user/${uid}/savelist`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-type': 'application/json',
        },
      })
  
      const blogs = await response.json()
  
      return blogs.data
    } catch (error) {
      console.log(error)
    }
  }