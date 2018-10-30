import axios from 'axios';
import { FETCH_USER } from './types';

// this is an action creator; action function returns function ()
export const fetchUser = () => async dispatch => { 
    // dispatch is a function that holds dispatching an action
    // before axios ajax request returns a value 
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};


