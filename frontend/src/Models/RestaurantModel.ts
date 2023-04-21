export class MenuModel {
  public id: string;
  public restaurant: string;
  public item: string;
  public description: string;
  public price: number;
  public image: string;

  public constructor(id: string, restaurant: string, item: string, description: string, price: number, image: string) {
    this.id = id;
    this.restaurant = restaurant;
    this.item = item;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

export class MenuPayloadModel {
  public restaurant: string;
  public item: string;
  public description: string;
  public price: number;
  public image: string;

  public constructor(restaurant: string,item: string, description: string, price: number, image: string) {
    this.restaurant = restaurant;
    this.item = item;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

export class RestaurantModel {
  public id: string;
  public name: string;
  public menus?: MenuModel[];

  public constructor(id: string, name: string, menus?: MenuModel[]) {
    this.id = id || "";
    this.name = name || "";
    this.menus = menus || [];
  }
}

export class RestaurantPayloadModel {
  public name: string;

  public constructor(name: string) {
    this.name = name || "";
  }
}
