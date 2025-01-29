import axios from 'axios';
import qs from 'qs';

export default class Notify {
    constructor(public token: string) {
        this.token = token;
    }

    async checkToken() {
        try {
            const req = await axios.get("https://notify-api.line.me/api/status", {
                headers: { "Authorization": `Bearer ${this.token}` }
            });
            console.log("Token is valid", req.data);
            return req.data;
        } catch (error) {
            console.error("Error checking token:", error.response?.data || error.message);
            throw new Error("Invalid token");
        }
    }

    async SendMessage(msg, silent = false) {
        console.log("Attempting to send message:", msg);

        if (!msg || typeof msg !== "string" || msg.trim() === "") {
            throw new Error("Message must not be empty or invalid.");
        }
    
        const payload = {
            message: msg, // 送信するメッセージ
            notificationDisabled: silent // 通知を無効化するか
        };
    
        console.log("Payload to be sent:", payload);
    
        try {
            const req = await this._post(payload);
            console.log("Message sent successfully:", req.data);
        } catch (error) {
            console.error("Failed to send message:", error.message);
            throw new Error(`Failed to post to LINE Notify API: ${error.response?.data?.message || error.message}`);
        }
    }

    async _post(payload) {
        try {
            const formData = new URLSearchParams();
            for (const [key, value] of Object.entries(payload)) {
                formData.append(key, String(value));
            }

            const req = await axios.post("https://notify-api.line.me/api/notify", formData, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            return req;
        } catch (error) {
            console.error("Error during POST request:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            throw new Error(`Failed to post to LINE Notify API: ${error.response?.data?.message || error.message}`);
        }
    }
}