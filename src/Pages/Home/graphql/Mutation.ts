import { BASE_API_URL } from "../../../config";

export class Mutations{

    static async createNewTransaction(userId: number, amount: number, direction: string, type: string){
        const newTransactionMutation = `
            mutation{
                createTransaction(userId:${userId}, amount:${amount}, type:${type}, direction: ${direction})
            }
        `;
        const response = await fetch(BASE_API_URL, {
            method: 'POST',
            redirect: 'manual',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: newTransactionMutation
            })
          })
          const data = await response.json();
          await data;
          return data;
    }
}