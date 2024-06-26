export default async function getHomeData() {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/home`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }