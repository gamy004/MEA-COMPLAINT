import BaseModel from './BaseModel';
import {
    actions
} from '../constants';

// export const TOKEN_TYPE = 'token_type';
// export const ACCESS_TOKEN = 'access_token';
// export const EXPIRES_IN = 'expires_in';

export function getAxiosHeader() {
    return axios.defaults.headers;
}

class User extends BaseModel {
    constructor(data) {
        super({
            name: '',
            email: null,
            phone: null,
            avatar: '',
            ...data
        });
    }

    static get defaultAvatar() {
        return '';
    }

    static async [actions.USER.SIGN_IN](username, password) {
        let response;

        try {
            response = await api.post('login', {
                username,
                password
            });
        } catch (error) {
            throw error;
        }

        const {
            user
        } = response.data;

        return new User({
            ...user
        });
    }

    static async [actions.USER.GET_AUTH]() {
        let response;

        try {
            response = await api.get('api:auth');
        } catch (error) {
            throw error;
        }

        const {
            user
        } = response.data;

        return new User({
            ...user
        });
    }

    // async verify() {
    //     let v;
    //     console.log('Verify Auth...');

    //     try {
    //         this.attempt = true;

    //         v = await api.get('verify');
    //     } catch (error) {
    //         this.isVerified = false;

    //         throw error;
    //     } finally {
    //         this.verfiedAt = Date.now();
    //         // this.refreshToken();
    //     }

    //     this.isVerified = true;

    //     return v;
    // }

    // async check(property, value) {
    //     let v;

    //     try {
    //         v = await axios.post(
    //             route(`proxy.check.${property}`), {
    //                 [property]: value
    //             }
    //         );
    //     } catch (error) {
    //         throw error;
    //     }

    //     return this.onCheckSuccess(v);
    // }

    // onCheckSuccess(data) {
    //     const {
    //         message,
    //         data: responseData
    //     } = data;

    //     this.data = {
    //         message,
    //         ...responseData
    //     };
    // }

    // get fullname() {
    //     const fullname = this.has('name') ?
    //         _.startCase(_.toLower(this.get('name'))) :
    //         '';

    //     return this.remember(
    //         '$fullname',
    //         fullname
    //     );
    // }

    // hasRole(roleName) {
    //     const {
    //         roles = []
    //     } = this;

    //     return roles.some(({
    //         name
    //     }) => name === _.lowerCase(roleName));
    // }

    // signOut() {
    //     localStorage.removeItem(ACCESS_TOKEN);
    // }
}

export default User;