import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {};

  async insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new this.productModel({title, description, price});
    const result = await newProduct.save();
    return result._id as string;
  }

  async getProducts() {
    return await this.productModel.find({});
  }

  async getSingleProduct(productId: string) {
    return await this.productModel.findById(productId);
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    // const [product, index] = this.findProduct(productId);
    // const updatedProduct = { ...product };
    // title ? (updatedProduct.title = title) : null;
    // desc ? (updatedProduct.desc = desc) : null;
    // price ? (updatedProduct.price = price) : null;

    // this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product with the given id.');
    }
    return [product, productIndex];
  }
}
