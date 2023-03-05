import { UserRoutes } from "./user.route";
import { OrderRoutes } from "./order.route";
import { ProductRoutes } from "./product.route";
import { AuthRoutes } from "./auth.route";
import { ProductOptionRoutes } from "./productOption.route";
import { specificationRoutes } from "./specification.route";
import { brandRoutes } from "./brand.route";
import { InventoryRoutes } from "./inventory.route";


export const Routes = [
    UserRoutes,
    OrderRoutes,
    ProductRoutes,
    AuthRoutes,
    ProductOptionRoutes,
    specificationRoutes,
    brandRoutes,
    InventoryRoutes
];