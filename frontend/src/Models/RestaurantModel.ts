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
  public description: string;
  public deliveryTime: string;
  public deliveryCost: number;
  public image: string;

  public constructor(id: string, name: string, description: string, deliveryTime: string,deliveryCost: number,  image: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.deliveryTime = deliveryTime;
    this.deliveryCost =deliveryCost;
    this.image = image;
  }
}

export class RestaurantPayloadModel {
  public name: string;
  public description: string;
  public deliveryTime: string;
  public deliveryCost: number;
  public image: string;

  public constructor(name: string, description: string, deliveryTime: string,deliveryCost: number, image: string) {
    this.name = name;
    this.description = description;
    this.deliveryTime = deliveryTime;
    this.deliveryCost = deliveryCost;
    this.image = image;
  }
}

export class RestaurantOrderModel {
  public name: string;
  public description: string;
  public deliveryTime: string;
  public deliveryCost: number;
  public image: string;
  public menus: MenuModel[];

  public constructor(name: string, description: string, deliveryTime: string,deliveryCost: number, image: string, menus: MenuModel[]) {
    this.name = name;
    this.description = description;
    this.deliveryTime = deliveryTime;
    this.deliveryCost = deliveryCost;
    this.image = image;
    this.menus = menus;
  }
}
