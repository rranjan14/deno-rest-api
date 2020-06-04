export default interface Product {
  _id?: {
    $oid: string;
  };
  name: String;
  price: number;
  productImage?: string;
}
