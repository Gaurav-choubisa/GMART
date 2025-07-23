import ForgotPassword from "../pages/ForgotPassword"

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
    }
}
export default SummaryApi