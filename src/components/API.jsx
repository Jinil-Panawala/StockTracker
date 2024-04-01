import { useQuery } from "@tanstack/react-query";


export default function API(props) {

    const APIKey = "apikey=pj2H8cI8ogAOrzQsmmPgTmrAZWHuSzOe";
    const baseURL = "https://financialmodelingprep.com/api/v3/stock/list";

    


    // Potentially useful endpoints:
    // Symbol List
    // Full Quote
    // Stock Price Change
    // Company Profile
    // Daily Chart EOD (under Mergers and Aquisitions)
    console.log(props.yes)

    const { data, error, isLoading } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
          const response = await fetch( props.yes ? 'https://financialmodelingprep.com/api/v3/stock/list?apikey=pj2H8cI8ogAOrzQsmmPgTmrAZWHuSzOe' : "https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=pj2H8cI8ogAOrzQsmmPgTmrAZWHuSzOe");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }
      });


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data)
  



    return (

        <p>
            {JSON.stringify(data[0])}
        </p>
        



    )


}