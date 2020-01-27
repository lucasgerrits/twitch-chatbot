
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export abstract class Ajax {

   public static async get(url: string) {
      return Ajax.call("GET", url);
   }

   private static async call(method: string, url: string) {

      var promise = new Promise(function (resolve, reject) {
         let xhr = new XMLHttpRequest();
         xhr.open(method, url);
         xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
               resolve(xhr.responseText);
            } else {
               reject({
                  status: this.status,
                  statusText: xhr.statusText
               });
            }
         };
         xhr.onerror = function () {
            reject({
               status: this.status,
               statusText: xhr.statusText
            });
         };
         xhr.send();
      });

      return promise;
   }
}