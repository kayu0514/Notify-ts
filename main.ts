import Notify from './Notify';

async function sendNotification() {
    const TOKEN = "you token";
    const notify = new Notify(TOKEN);

    try {
        await notify.checkToken();

        const message = "Hi, I am kayu0514 :)";
        console.log(`[INFO] 送信メッセージ: ${message}`);

        await notify.SendMessage(message, false);
        console.log('[SUCCESS] メッセージを送信しました');
        
    } catch (error) {
        console.error('[ERROR]', error.message);
        throw error; 
    }
}

sendNotification().catch(error => {
    process.exit(1); 
});