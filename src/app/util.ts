export class Utils {
    static isLoggedIn = false;

    static formatDate() {
        var d = new Date();
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    }

    static _12_hour_format() {
        var d = new Date().getHours();
        var hr = d % 12;
        if (hr == 0) {
            return "12";
        }
        else {
            return hr.toString();
        }
    }

    static tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        if ((Math.floor((new Date).getTime() / 1000)) >= expiry) {
        }
    }
}