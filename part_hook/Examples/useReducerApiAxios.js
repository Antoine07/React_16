import { useReducer, useCallback } from 'react';
import axios from 'axios';

// votre reducer React
import reducer, { initialState } from './reducer';

const useApiRequest = (endpoint, { params = {} } = {}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Optimisation avec useCallback
    const makeRequest = useCallback(async () => {
        dispatch({ type : 'LOAD_DATA' });
        try {
            const response = await axios.get(endpoint, params);
            dispatch({ type : 'SUCCESS'});
        } catch (e) {
            dispatch({ type : 'ERROR_API' });
        }
    }, [endpoint, params]);

    return [state, makeRequest];
};

export default useApiRequest;


// dans votre code vous pouvez alors utiliser ce Hook comme suit :

const [state, makeRequest] = useApiRequest('https://jsonplaceholder.typicode.com/users/');