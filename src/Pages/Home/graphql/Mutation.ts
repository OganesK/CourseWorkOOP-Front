import { BASE_API_URL } from "../../../config";

export class Mutations{

    static async createNewTransaction(userId: number, amount: number, direction: string, type: string){
        const newTransactionMutation = `
          mutation($userId: Int!, $type: String!, $direction: String!, $amount: Float!){
            createTransaction(
              userId: $userId,
              type: $type,
              direction: $direction,
              amount: $amount
            )
          }
        `;
        const response = await fetch(BASE_API_URL, {
            method: 'POST',
            redirect: 'manual',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: newTransactionMutation,
              variables: {
                  userId: userId,
                  amount: Number(amount),
                  direction: String(direction),
                  type: String(type)
              }
            })
          })
          const data = await response.json();
          await data;
          return data;
    }
}