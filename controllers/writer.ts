export default async function getAllWriter(page?: number) {
  try {
    const api = process.env.API_URL;

    const apiEndpoint = `${api}api/writer?page=${page || 1}`;
    console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: 'no-store',
    });
    const writers = await response.json();
    return writers;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleWriter(id: string, pageno: number) {
  try {
    const api = process.env.API_URL;
    const response = await fetch(`${api}/api/writer/${id}?page=${pageno}`, {
      cache: 'no-store',
    });
    const userdata = await response.json();
    return userdata;
  } catch (error) {
    console.log(error);
  }
}
