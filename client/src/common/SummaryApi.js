import ForgotPassword from "../pages/ForgotPassword"
import OtpVerificationPage from "../pages/OtpVerificationPage"
import ResetPassword from "../pages/ResetPassword"

export const baseUrl = "http://localhost:8080"

const SummaryApi = {
    register : {
        url : "/api/user/register",
        method : 'post'
    },
    login : {
        url: "/api/user/login",
        method: 'post'
    },
    ForgotPassword : {
        url: "/api/user/forgot-password",
        method: 'put'
    },
    OtpVerification : {
        url : "/api/user/verify-forgot-password-otp",
        method : "put"
    },
    ResetPassword : {
        url : "/api/user/reset-password",
        method : "put"
    },
    RefreshToken : {
        url : "/api/user/refresh-token",
        method : "post"
    },
    UserDetails : {
        url : "/api/user/user-details",
        memthod : "get"
    }
}
export default SummaryApi