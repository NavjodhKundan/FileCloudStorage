
// export function checkHealth(request, response){
//     response.json(getHealthStatus());
// }

export const checkHealth = (request, response) => {
    response.status(200).send({
        status: "Connected",
        message: "Frontend and backend are communicating"
    });
}