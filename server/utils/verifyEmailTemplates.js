const verifyEmailTemplate = ({name, url}) => {
    return `
        <h1>Hello ${name},</h1>
        <p>Thank you for registering with GMART. We are excited to have you on board!</p>
        <a href="${url}" style="background-color: blue; color: white;margin-top:10px;">Verify Email</a>
    `;
};

export default verifyEmailTemplate;