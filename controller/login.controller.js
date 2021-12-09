require('dotenv').config();
const userModel = require('../config/Database');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const loginFacebook = async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            url: "https://graph.facebook.com/v12.0/me?fields=id%2Cemail%2Cfirst_name%2Clast_name%20%2Cpicture&access_token=EAADn1UvWSREBACwoQTZCcJA3ZAa5MBhZAVo0BaXtr5WCDTzzHIyyiGVWYsuqx4k9GljTCpLgTkPMlVzScLp017Ljh18KAQT37Vm8B8vkonDBkWFQR96Glsa88rCk7oRQaqZCr2PUMrRIlDr7nPFhy9d76ImDk8Vc5gPNr78zabZC1qYdBBOHsqMUNUMnbjEFd63yxhgGoM0HdqJfUGIfk"
        })
        // console.log(response.data);
        const result = response.data
        if (result) {
            //create token
            const token = jwt.sign(
                {
                    "user_email": result.email,
                    "user_id": result.id
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "30s"
                }
            )
            result.token = token;
            // console.log(result.token);
            res.send(result);
        }

    } catch (error) {
        // console.log(error);
    }
}
module.exports.loginFacebook = loginFacebook