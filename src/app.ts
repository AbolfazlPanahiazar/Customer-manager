import { Customer } from "./customer/customer";

export class App {
  heading: string = "Customer Manager";
  customers: Customer[] = this.getCustomersFromaddCustomer();
  customerName: string = "";
  customerEmail: string = "";
  customerPhone: string = "";

  addCustomer() {
    if (this.customerName && this.customerEmail && this.customerPhone) {
      this.customers.push(
        new Customer(this.customerName, this.customerEmail, this.customerPhone)
      );
      this.storeCustomer(
        this.customerName,
        this.customerEmail,
        this.customerPhone
      );
      this.customerName = "";
      this.customerEmail = "";
      this.customerPhone = "";
    }
  }

  deleteCustomer(customer) {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.customers.splice(index, 1);
    }
  }

  storeCustomer(name: string, email: string, phone: string) {
    let customers;
    if (localStorage.getItem("customers") === null) {
      customers = [];
    } else {
      customers = JSON.parse(localStorage.getItem("customers")) as Customer[];
    }
    customers.push(new Customer(name, email, phone));
    localStorage.setItem("customers", JSON.stringify(customers));
  }

  getCustomersFromaddCustomer() {
    let customers;
    if (localStorage.getItem("customers") === null) {
      customers = [];
    } else {
      customers = JSON.parse(localStorage.getItem("customers")) as Customer[];
    }
    return customers;
  }
}
