export class Users {
  slug: string;
  activate(params, routeConfig) {
    this.slug = params.slug;
    console.log(this.slug);
  }
}
