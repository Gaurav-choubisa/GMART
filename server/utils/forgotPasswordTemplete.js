
const forgotPasswordTemplete =({name, otp})=>{
     return `
     <div>
     <p>Dear ${name}</p>
     <div style= "font-size: 20px">${otp}</div>
     <p>This OTP is valid for 1 hour only</p>
     </div>
     <br>
     <br>
     <p>thanks</p>
     <p>GMART</p>

     `

}
export default forgotPasswordTemplete;