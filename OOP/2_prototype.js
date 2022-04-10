function BankAccount(customerName,balance=0){
    this.customerName=customerName;//variables but properties in OOP
    this.accountNumber=Date.now();
    this.balance=balance;
}
BankAccount.prototype.deposit=function (amount){
    this.balance+=amount;
};
BankAccount.prototype.withdraw=function(amount){
    this.balance-=amount;
}

const rakeshAccount=new BankAccount('Rakesh',4000);
rakeshAccount.deposit(2000);
console.log(rakeshAccount);