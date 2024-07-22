// authConfig.js
import { Platform } from 'react-native';

const authConfig = {
  issuer: 'https://login.microsoftonline.com/c2883102-3f8d-4e6f-b65a-df3518b3b0f3',
  clientId: '51079f97-b82a-4ce9-8ace-ecd9d698ca7c',
  redirectUrl: Platform.OS === 'ios' ? 'msauth.your.bundle.id://auth' : 'yourapp://auth',
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'offline_access', 'user.read'],
};

export default authConfig;
//secret5Gz8Q~hyCPujUIqVRtQp9M.H1Llv1ksl1oE-wboE