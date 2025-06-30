import { create } from 'zustand'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken');
const organization = Cookies.get('organization');
const userAccount = Cookies.get('userAccount');

const useStore = create(() => ({
  accessToken: accessToken,
  organization: organization,
  userAccount: userAccount,
}))

export default useStore
