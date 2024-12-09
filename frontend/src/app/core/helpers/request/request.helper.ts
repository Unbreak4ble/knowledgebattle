
export async function request(payload:any){
    const url = payload.url;

    delete payload.url;

    const response = await fetch(url, payload);

    try{
        return await response.json();
    }catch{
        return await response.text();
    }
}