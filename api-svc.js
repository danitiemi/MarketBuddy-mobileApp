import {post, get} from 'axios';

export async function login(email, password){
  // return axios.post('/login', {userName, password})
  //  .then((response) => return response.data)
  //  .catch(() = ({error: 'You are dumb'}))
  try {
    const response = await post('http://192.168.88.120:7000/users/login', {user: {
      email, password
    }});  
    return response.data;
  } catch(error){
    return {error: 'No donut for you'};
  }
}

export async function getListFromTheInternet(listId){
  let url = 'http://192.168.88.120:7000/lists/' + listId;
  try {
    const response = await get(url);
    return response.data;
  } catch(error){
    throw error;
    return {error: 'No beer for you'};
  }
}