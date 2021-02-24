const fs = require("fs");
const AccountData = require("../account-data.json");

module.exports = {
    registerNewUser: function(details, delay) {
        function pushDetails() {
            if (!details) {
                console.log("Error: No details for login defined.");
                return;
            }
            
            const Accounts = AccountData.Accounts;

            var NewAccount = {};
            NewAccount.Details = details;

            var accountID = AccountData.TotalAccounts;

            if (!accountID) {
                console.log("Error: Couldn't find total accounts module in account-data.json. Set account ID to 1.");
                accountID = 1;
            }

            Accounts[accountID] = NewAccount;

            fs.writeFile("account-data.json", JSON.stringify(AccountData, null, 2), (err) => {
                if (err) {
                    console.log("Error: Couldn't write to account data file.");
                }
            });
        }

        if (!delay) {
            pushDetails();
        } else {
            setTimeout(() => {
                pushDetails();
            }, delay * 1000);
        }
    }
}