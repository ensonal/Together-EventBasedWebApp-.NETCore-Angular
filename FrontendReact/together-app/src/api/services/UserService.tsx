import { get, post } from '../../api/axios';
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

export async function updateUserInfo(userInfo: IUserInfo) {
  const url = '/User/editUserInfo'; 
  
  try {
    const response = await post(url, userInfo);

    if (response.succeeded) {
      return response.userInfo as IUserInfo; 
    } else {
      throw new Error(response.data.Message || 'Failed to update user information');
    }
  } catch (error) {
    throw new Error('Failed to update user information');
  }
}
