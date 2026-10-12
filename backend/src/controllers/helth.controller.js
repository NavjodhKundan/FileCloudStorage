
// export function checkHealth(request, response){
//     response.json(getHealthStatus());
// }

export const checkHealth = (request, response) => {
    response.send("comming from backend...");
}