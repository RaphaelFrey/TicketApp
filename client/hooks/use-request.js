import axios from "axios";
import {useState} from "react";

/**
 *
 * @param url
 * @param method must be equal to get, post etc..
 * @param body
 * @param onSuccess
 * @returns {{doRequest: ((function(): Promise<void>)|*), errors: unknown}}
 */
const useRequest = ({url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
        }
    };
    return { doRequest, errors };
};

export default useRequest;