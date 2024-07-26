export default async function getAllBlog(page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/blog?page=${page || 1}`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const blogs = await response.json();
      return blogs;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getSingleblog(id:string) {
    try {
      const api = process.env.API_URL;

      const response = await fetch(`${api}api/blog/${id}`,
      {
        cache: "no-store",
      });
      const oneblog = await response.json();
      return oneblog.data;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getFilterBlog(category:string,page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/blog/filter/?category=${category}&page=${page || 1}`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const blogs = await response.json();
      return blogs;
    } catch (error) {
      console.log(error);
    }
  }

export  async function getHomeData() {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/home`;
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

export async function getRecommendedData(uId:string,) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/home/${uId}`;
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }