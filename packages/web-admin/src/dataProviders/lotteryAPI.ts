import ApolloClient, { gql } from "apollo-boost";

const dispatchers: { [id: string]: (fetchType: string, params: any) => any } = {
  drawsDispatcher: async (fetchType, params) => {
    console.log(fetchType, params);

    return handleErrors(async () => {
      let query;

      switch (fetchType) {
        case "NEXT":
          query = gql`
            mutation next($id: String!, $currentStatus: String!) {
              data: nextStatus(drawNumber: $id, currentStatus: $currentStatus) {
                id
                start
                end
                status
                results {
                  numbers
                }
              }
            }
          `;
          const openQuery = await client.mutate({
            mutation: query,
            variables: params
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
                results {
                  numbers
                }
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
                results {
                  numbers
                }
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
    });
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

const handleErrors = async (func: Function) => {
  try {
    return await func();
  } catch (error) {
    console.log("GQL error:", error);
    if (error.message.includes("Original stack")) {
      console.log("Extracting original message");
      const originalMessage = error.message.match(/"message":"(.*)"/);
      if (originalMessage && originalMessage.length > 1) {
        throw new Error(originalMessage[1]);
      }
    }
    throw error;
  }
};
