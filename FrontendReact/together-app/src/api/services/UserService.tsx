import { get } from '../../api/axios';
import IUserInfo from '../models/UserInfo';

export async function getUserInfo() {
  const url = '/User/GetCurrentUserInfo'; 
  
  try {
    const response = await get(url);

    if (response.succeeded) {
      return response.userInfo as IUserInfo; 
    } else {
      throw new Error(response.data.Message || 'Failed to fetch user information');
    }
  } catch (error) {
    throw new Error('Failed to fetch user information');
  }
}
