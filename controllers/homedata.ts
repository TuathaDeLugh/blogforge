export default async function getHomeData() {
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