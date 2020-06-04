import Product from './Product.ts';

export default interface Order {
    _id?:string;
    products:Product;
    quantity:number
}