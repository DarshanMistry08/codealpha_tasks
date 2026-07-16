import { Router } from "express";
import { GetMyMenus, GetAllItems, PlaceOrder, BookTable,AddInOrder,OrderPayment,UpdateOrder,RemoveItems} from "../controller/menu.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const MenuRouter = Router()

// Search
MenuRouter.get("/menu/:identifier", verifyJWT,GetMyMenus);  
MenuRouter.post("/menu/search",verifyJWT, GetMyMenus);    
MenuRouter.get("/allmenu", GetAllItems);      

// Order Items
MenuRouter.post("/book/table", verifyJWT, BookTable);     
MenuRouter.post("/menu/order",verifyJWT, PlaceOrder);
MenuRouter.post("/menu/order/additems",verifyJWT, AddInOrder);

// Update Item

MenuRouter.post("/menu/updateOrder/:orderid",verifyJWT, UpdateOrder);
MenuRouter.post("/menu/remove/:orderid",verifyJWT, RemoveItems);


// Payments
MenuRouter.post("/menu/order/paymentorder",verifyJWT, OrderPayment);

export default MenuRouter