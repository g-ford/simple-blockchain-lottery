import ApolloClient, { gql } from "apollo-boost";

const dispatchers: { [id: string]: (fetchType: string, params: any) => any } = {
  drawsDispatcher: async (fetchType, params) => {
    console.log(fetchType, params);
    let query;

    switch (fetchType) {
      case "OPEN":
        query = gql`
          mutation open($id: String!) {
            data: nextStatus(drawNumber: $id) {
              id
              start
              end
              status
            }
          }
        `;
        const openQuery = await client.mutate({
          mutation: query,
          variables: {
            id: params.id
          }
        });
        return openQuery.data;

      case "GET_LIST":
        query = gql`
          query getAllDraws {
            data: allDraws {
              id
              start
              end
              status
            }
          }
        `;

        const queryResults = await client.query({
          query: query
        });
        const data = queryResults.data["data"] as [object];

        return {
          data: data,
          total: data.length
        };

      case "GET_ONE":
        query = gql`
          query getOneDraw($id: String!) {
            data: getDraw(id: $id) {
              id
              start
              end
              status
            }
          }
        `;

        const oneResult = await client.query({
          query: query,
          variables: params
        });
        return oneResult.data;

      case "UPDATE":
      case "CREATE":
        query = gql`
          mutation create($data: DrawInput!) {
            data: updateDraw(draw: $data) {
              id
              start
              end
              status
            }
          }
        `;
        const updateResult = await client.mutate({
          mutation: query,
          variables: {
            data: {
              id: params.data.id,
              start: params.data.start,
              end: params.data.end
            }
          }
        });
        return updateResult.data;
    }
  }
};

const client = new ApolloClient({
  uri: "http://localhost:5000"
});

export const LotteryAPI = async (
  fetchType: string,
  resourceName: string,
  params: any
) => {
  const dispatcher = `${resourceName}Dispatcher`;
  return await dispatchers[dispatcher](fetchType, params);
};
