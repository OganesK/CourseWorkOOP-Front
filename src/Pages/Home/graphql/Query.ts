import { BASE_API_URL } from "../../../config";

export class Queries {

    static async getData(userId: number){
        const getDataQuery = `
            query{
                user(where:{
                id:${userId}
                }){
                balance
                transactions{
                    type
                    amount
                    transactionDirection
                }
                }
            }
        `
        const response = await fetch(BASE_API_URL, {
            method: 'POST',
            redirect: 'manual',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: getDataQuery
            })
          })
          const data = await response.json();
          await data;
          return data;
    }
}