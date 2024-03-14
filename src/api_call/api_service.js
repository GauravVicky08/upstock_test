

export const StocksList = async () => {
    let requestOptions = {
        method: 'GET',
    };
    let resp = await api_call("https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8",
        requestOptions);

    if (resp.success == true) {
        return resp;
    } else {
        return resp;
    }
};

const api_call = async (api_url, requestOptions) => {

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(requestOptions.body);
    const requestParams = {
        method: requestOptions.method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    const res = fetch(api_url, requestParams)
        .then(function (response) {
            return response.text();
        })
        .then((result) => {
            return JSON.parse(result);
        })
        .catch((error) => {
            return { success: false };
        });
    return res;
}