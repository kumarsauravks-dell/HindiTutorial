class BankAccount{
    customerName;
    accountNumber;
    balance;
    constructor(customerName,balance=0){
        this.customerName=customerName;
        this.accountNumber=Date.now();
        this.balance=balance;        
    }
    deposit(amount){
        this.balance+=amount;
    }
    withdraw(amount){
        this.balance-=amount;
    }
}

const rakeshAccount=new BankAccount('Rakesh K',2000);
rakeshAccount.withdraw(500);
console.log(rakeshAccount);

const johnAccount=new BankAccount('John Doe');
johnAccount.deposit(4000);
console.log(johnAccount);