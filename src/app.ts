import { PLATFORM } from "aurelia-pal";
import { Customer } from "./customer/customer";

export class App {
  title: string;
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

  deleteCustomer(customer: Customer) {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.removeCustomerFromLocalStorage(index);
      this.customers.splice(index, 1);
    }
  }

  removeCustomerFromLocalStorage(index: number) {
    const customers = JSON.parse(localStorage.getItem("customers"));

    customers.splice(index, 1);

    localStorage.setItem("customers", JSON.stringify(customers));
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

  configureRouter(config, router) {
    this.title = "Router Test";
    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: PLATFORM.moduleName("home/index"),
        title: "Home",
      },
      {
        route: "users/:slug",
        name: "users",
        moduleId: PLATFORM.moduleName("users/index"),
        title: "Users",
      },
    ]);
  }
}
