import { AppDataSource } from "../database";
import { Image, TypeImage } from "../entities/image.entity";
import { Product } from "../entities/product.entity";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";

interface ProductInterface {
  name: string;
  description: string;
}

interface ProductOptionInterface {
  color: string;
  ram: string;
  rom: string;
  price: number;
}


const productRepository = AppDataSource.getRepository(Product);

export const getAll = async () => {
  const result = await productRepository.find();
  return result.length ? result : BadRequestError("product not found!");
};

export const create = async (
  product: ProductInterface,
  options: ProductOptionInterface,
  image_path: string
) => {
  const { name: name, description: description } = product;

  if (name) {
    const productExists = await productRepository.findOneBy({ name });
    if (productExists) return BadRequestError("product name already exists");
    const productObj = productRepository.create({ name, description });
    const newProduct = await productRepository.save(productObj);

    const productOptionRepository = AppDataSource.getRepository(ProductOption);
    const { color, ram, rom, price } = options;
    const opt =
      color && ram && rom && price
        ? productOptionRepository.create({ color, ram, rom, price, product: newProduct })
        : productOptionRepository.create({
            color: "black",
            ram: "8GB",
            rom: "128GB",
            price: 1000000,
            product: newProduct
          });

    const newOtp = await productOptionRepository.save(opt);
    
    const imageRepo = AppDataSource.getRepository(Image);
    const tempImage = imageRepo.create({
        image_url: image_path,
        product: newProduct,
        type: TypeImage.thumbnail
    });
    const newImage = await imageRepo.save(tempImage);    
    return {
        new_product: newProduct,
        new_options: newOtp,
        new_image: newImage
    };
  }

  return BadRequestError("missing information!");
};


export const getOneById = async (id: number) => {
  const product = productRepository.findOne({
    where: {
      id
    },
    relations: {
      category: true,
      specifications: true,
      images: true,
      productOptions: true
    }
  });
  return await product ? product : BadRequestError("product not found!");
}

